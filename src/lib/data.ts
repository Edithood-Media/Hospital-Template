import "server-only";

import { BlogStatus } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";

export async function getPublishedPosts() {
  return prisma.blogPost.findMany({
    where: { status: BlogStatus.PUBLISHED },
    orderBy: { publishedAt: "desc" },
  });
}

export async function getPublishedPostBySlug(slug: string) {
  return prisma.blogPost.findFirst({
    where: { slug, status: BlogStatus.PUBLISHED },
  });
}

export async function getLatestPublishedPosts(limit = 3) {
  return prisma.blogPost.findMany({
    where: { status: BlogStatus.PUBLISHED },
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
