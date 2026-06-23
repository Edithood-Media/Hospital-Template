"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { BlogStatus } from "@/generated/prisma/enums";
import { createSession, destroySession, getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { appointmentStatusSchema, blogSchema, loginSchema, slugify } from "@/lib/validation";

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

  const data = result.data;
  const publishedAt = data.status === BlogStatus.PUBLISHED ? new Date() : null;

  try {
    if (id) {
      await prisma.blogPost.update({
        where: { id },
        data: {
          ...data,
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
