import "server-only";

import { prisma } from "@/lib/prisma";
import { doctors, facilities, services } from "@/lib/site-data";

export async function getPublishedPosts() {
  return prisma.blogPost.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
  });
}

export async function getPublishedPostBySlug(slug: string) {
  return prisma.blogPost.findFirst({
    where: { slug, status: "PUBLISHED" },
  });
}

export async function getLatestPublishedPosts(limit = 3) {
  return prisma.blogPost.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    take: limit,
  });
}

export function formatDate(value: Date | string | null | undefined) {
  if (!value) return "Not set";
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export async function getHomepageServices() {
  const rows = await prisma.service.findMany({
    where: { isVisible: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    select: { id: true, title: true, description: true, image: true, iconKey: true, sortOrder: true, isVisible: true },
  });

  return rows.length > 0 ? rows : services.map((service, index) => ({ id: service.title, ...service, image: null, iconKey: "clinic", sortOrder: index, isVisible: true }));
}

export async function getHomepageFacilities() {
  const rows = await prisma.facility.findMany({
    where: { isVisible: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    select: { id: true, title: true, label: true, image: true, iconKey: true, sortOrder: true, isVisible: true },
  });

  return rows.length > 0 ? rows : facilities.map((facility, index) => ({ id: facility.title, ...facility, iconKey: "hospital", sortOrder: index, isVisible: true }));
}

export async function getHomepageStaffProfiles() {
  const rows = await prisma.staffProfile.findMany({
    where: { isVisible: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    select: { id: true, name: true, role: true, detail: true, image: true, department: true, sortOrder: true, isVisible: true },
  });

  return rows.length > 0
    ? rows
    : doctors.map((doctor, index) => ({
        id: doctor.name,
        name: doctor.name,
        role: doctor.role,
        detail: doctor.detail,
        image: doctor.image,
        department: doctor.status,
        sortOrder: index,
        isVisible: true,
      }));
}
