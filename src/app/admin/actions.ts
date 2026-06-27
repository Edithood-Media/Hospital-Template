"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createSession, destroySession, getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { parseRichContent } from "@/lib/rich-content";
import {
  appointmentStatusSchema,
  blogSchema,
  facilitySchema,
  loginSchema,
  serviceSchema,
  slugify,
  staffProfileSchema,
} from "@/lib/validation";

type ActionState = {
  ok?: boolean;
  message?: string;
};

function formValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

async function requireAdmin() {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }
  return session;
}

export async function loginAction(_state: ActionState, formData: FormData): Promise<ActionState> {
  const result = loginSchema.safeParse({
    email: formValue(formData, "email"),
    password: formValue(formData, "password"),
  });

  if (!result.success) {
    return { ok: false, message: "Enter a valid email and password." };
  }

  const user = await prisma.adminUser.findUnique({
    where: { email: result.data.email },
  });

  if (!user) {
    return { ok: false, message: "Invalid email or password." };
  }

  const isValid = await bcrypt.compare(result.data.password, user.passwordHash);
  if (!isValid) {
    return { ok: false, message: "Invalid email or password." };
  }

  await createSession({ userId: user.id, email: user.email, name: user.name });
  redirect("/admin");
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}

export async function saveBlogPostAction(
  id: string | null,
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();

  const title = formValue(formData, "title");
  const result = blogSchema.safeParse({
    title,
    slug: formValue(formData, "slug") || slugify(title),
    excerpt: formValue(formData, "excerpt"),
    content: formValue(formData, "content"),
    contentJson: formValue(formData, "contentJson"),
    category: formValue(formData, "category"),
    featuredImage: formValue(formData, "featuredImage"),
    seoTitle: formValue(formData, "seoTitle"),
    seoDescription: formValue(formData, "seoDescription"),
    authorDisplayName: formValue(formData, "authorDisplayName"),
    status: formValue(formData, "status"),
  });

  if (!result.success) {
    return { ok: false, message: "Please complete all required blog fields." };
  }

  const { contentJson: contentJsonValue, ...data } = result.data;
  const contentJson = contentJsonValue ? parseRichContent(contentJsonValue) : null;
  if (contentJsonValue && !contentJson) {
    return { ok: false, message: "Blog content includes unsupported or oversized rich elements." };
  }
  const contentJsonInput = contentJson ? JSON.parse(JSON.stringify(contentJson)) : null;
  const publishedAt = data.status === "PUBLISHED" ? new Date() : null;

  try {
    if (id) {
      await prisma.blogPost.update({
        where: { id },
        data: {
          ...data,
          contentJson: contentJsonInput,
          featuredImage: data.featuredImage || null,
          seoTitle: data.seoTitle || null,
          seoDescription: data.seoDescription || null,
          authorDisplayName: data.authorDisplayName || "Shree Shivaya Hospital",
          publishedAt,
        },
      });
    } else {
      await prisma.blogPost.create({
        data: {
          ...data,
          contentJson: contentJsonInput,
          featuredImage: data.featuredImage || null,
          seoTitle: data.seoTitle || null,
          seoDescription: data.seoDescription || null,
          authorDisplayName: data.authorDisplayName || "Shree Shivaya Hospital",
          publishedAt,
        },
      });
    }
  } catch (error) {
    console.error("Blog save failed", error);
    return { ok: false, message: "Could not save the post. Check if the slug is unique." };
  }

  revalidatePath("/blog");
  revalidatePath("/admin/blogs");
  redirect("/admin/blogs");
}

export async function deleteBlogPostAction(formData: FormData) {
  await requireAdmin();
  const id = formValue(formData, "id");
  if (id) {
    await prisma.blogPost.delete({ where: { id } });
  }
  revalidatePath("/blog");
  revalidatePath("/admin/blogs");
}

export async function updateAppointmentAction(id: string, formData: FormData) {
  await requireAdmin();

  const result = appointmentStatusSchema.safeParse({
    status: formValue(formData, "status"),
    internalNotes: formValue(formData, "internalNotes"),
  });

  if (!result.success) {
    return;
  }

  await prisma.appointment.update({
    where: { id },
    data: {
      status: result.data.status,
      internalNotes: result.data.internalNotes || null,
    },
  });

  revalidatePath("/admin/appointments");
}

export async function deleteAppointmentAction(formData: FormData) {
  await requireAdmin();
  const id = formValue(formData, "id");
  if (id) {
    await prisma.appointment.delete({ where: { id } });
  }
  revalidatePath("/admin/appointments");
}

export async function saveServiceAction(id: string | null, _state: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();

  const result = serviceSchema.safeParse({
    title: formValue(formData, "title"),
    description: formValue(formData, "description"),
    image: formValue(formData, "image"),
    iconKey: formValue(formData, "iconKey"),
    sortOrder: formValue(formData, "sortOrder"),
    isVisible: formValue(formData, "isVisible"),
  });

  if (!result.success) {
    return { ok: false, message: "Please complete all required service fields." };
  }

  const data = { ...result.data, image: result.data.image || null, isVisible: result.data.isVisible === "on" };

  if (id) {
    await prisma.service.update({ where: { id }, data });
  } else {
    await prisma.service.create({ data });
  }

  revalidatePath("/");
  revalidatePath("/admin/services");
  redirect("/admin/services");
}

export async function deleteServiceAction(formData: FormData) {
  await requireAdmin();
  const id = formValue(formData, "id");
  if (id) await prisma.service.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/services");
}

export async function saveFacilityAction(id: string | null, _state: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();

  const result = facilitySchema.safeParse({
    title: formValue(formData, "title"),
    label: formValue(formData, "label"),
    image: formValue(formData, "image"),
    iconKey: formValue(formData, "iconKey"),
    sortOrder: formValue(formData, "sortOrder"),
    isVisible: formValue(formData, "isVisible"),
  });

  if (!result.success) {
    return { ok: false, message: "Please complete all required facility fields." };
  }

  const data = { ...result.data, isVisible: result.data.isVisible === "on" };

  if (id) {
    await prisma.facility.update({ where: { id }, data });
  } else {
    await prisma.facility.create({ data });
  }

  revalidatePath("/");
  revalidatePath("/admin/facilities");
  redirect("/admin/facilities");
}

export async function deleteFacilityAction(formData: FormData) {
  await requireAdmin();
  const id = formValue(formData, "id");
  if (id) await prisma.facility.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/facilities");
}

export async function saveStaffProfileAction(id: string | null, _state: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();

  const result = staffProfileSchema.safeParse({
    name: formValue(formData, "name"),
    role: formValue(formData, "role"),
    detail: formValue(formData, "detail"),
    image: formValue(formData, "image"),
    department: formValue(formData, "department"),
    sortOrder: formValue(formData, "sortOrder"),
    isVisible: formValue(formData, "isVisible"),
  });

  if (!result.success) {
    return { ok: false, message: "Please complete all required staff fields." };
  }

  const data = { ...result.data, isVisible: result.data.isVisible === "on" };

  if (id) {
    await prisma.staffProfile.update({ where: { id }, data });
  } else {
    await prisma.staffProfile.create({ data });
  }

  revalidatePath("/");
  revalidatePath("/admin/staff");
  redirect("/admin/staff");
}

export async function deleteStaffProfileAction(formData: FormData) {
  await requireAdmin();
  const id = formValue(formData, "id");
  if (id) await prisma.staffProfile.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/staff");
}
