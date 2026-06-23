import Link from "next/link";

import { BlogForm } from "@/app/admin/(protected)/blogs/blog-form";

export default function NewBlogPage() {
  return (
    <div className="space-y-6">
      <Link href="/admin/blogs" className="inline-flex rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-muted hover:bg-sky">Back to blogs</Link>
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal">New Blog</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink">Create a health article</h1>
      </div>
      <BlogForm post={null} />
    </div>
  );
}
