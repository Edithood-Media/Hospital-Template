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

      <div className="overflow-hidden rounded-[2rem] border border-line bg-white shadow-xl shadow-medical-blue/5">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="border-b border-line bg-background text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              <tr>
                <th className="px-6 py-4">Post</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Updated</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {posts.map((post) => (
                <tr key={post.id} className="transition hover:bg-sky/30">
                  <td className="max-w-[420px] px-6 py-5">
                    <p className="font-semibold text-ink">{post.title}</p>
                    <p className="mt-1 line-clamp-1 text-sm text-muted">{post.excerpt}</p>
                  </td>
                  <td className="px-6 py-5 text-muted">{post.category}</td>
                  <td className="px-6 py-5">
                    <span className="rounded-full bg-sky px-3 py-1 text-xs font-bold text-medical-blue">{post.status}</span>
                  </td>
                  <td className="px-6 py-5 text-muted">{formatDate(post.updatedAt)}</td>
                  <td className="px-6 py-5">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/blogs/${post.id}`} className="rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink hover:bg-sky">Edit</Link>
                      <form action={deleteBlogPostAction}>
                        <input type="hidden" name="id" value={post.id} />
                        <button className="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50">Delete</button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
