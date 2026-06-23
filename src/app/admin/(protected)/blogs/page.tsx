import Link from "next/link";

import { deleteBlogPostAction } from "@/app/admin/actions";
import { formatDate } from "@/lib/data";
import { prisma } from "@/lib/prisma";

export default async function AdminBlogsPage() {
  const posts = await prisma.blogPost.findMany({ orderBy: { updatedAt: "desc" } });

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal">Blogs</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink">Manage health articles</h1>
        </div>
        <Link href="/admin/blogs/new" className="w-fit rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white hover:bg-medical-blue">New Post</Link>
      </div>

      <div className="grid gap-4">
        {posts.map((post) => (
          <article key={post.id} className="rounded-[2rem] border border-line bg-white p-6 shadow-xl shadow-medical-blue/5">
            <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-2xl font-semibold text-ink">{post.title}</h2>
                  <span className="rounded-full bg-sky px-3 py-1 text-xs font-bold text-medical-blue">{post.status}</span>
                </div>
                <p className="mt-2 text-sm text-muted">{post.category} · Updated {formatDate(post.updatedAt)}</p>
                <p className="mt-4 max-w-3xl text-sm leading-6 text-muted">{post.excerpt}</p>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/blogs/${post.id}`} className="rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink hover:bg-sky">Edit</Link>
                <form action={deleteBlogPostAction}>
                  <input type="hidden" name="id" value={post.id} />
                  <button className="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50">Delete</button>
                </form>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
