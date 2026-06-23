import Link from "next/link";
import { notFound } from "next/navigation";

import { BlogForm } from "@/app/admin/(protected)/blogs/blog-form";
import { prisma } from "@/lib/prisma";

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });

  if (!post) notFound();

  return (
    <div className="space-y-6">
      <Link href="/admin/blogs" className="inline-flex rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-muted hover:bg-sky">Back to blogs</Link>
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal">Edit Blog</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink">Update article</h1>
      </div>
      <BlogForm post={post} />
    </div>
  );
}
