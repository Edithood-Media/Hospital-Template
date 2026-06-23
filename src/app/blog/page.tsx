import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { BlogStatus } from "@/generated/prisma/enums";
import { formatDate } from "@/lib/data";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Health Blog",
  description: "Health tips, hospital updates, preventive care, and emergency guidance from Shree Shivaya Hospital.",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const params = await searchParams;
  const category = params.category;
  const query = params.q?.trim();

  const posts = await prisma.blogPost.findMany({
    where: {
      status: BlogStatus.PUBLISHED,
      ...(category ? { category } : {}),
      ...(query
        ? {
            OR: [
              { title: { contains: query } },
              { excerpt: { contains: query } },
              { content: { contains: query } },
            ],
          }
        : {}),
    },
    orderBy: { publishedAt: "desc" },
  });

  const categories = await prisma.blogPost.findMany({
    where: { status: BlogStatus.PUBLISHED },
    select: { category: true },
    distinct: ["category"],
    orderBy: { category: "asc" },
  });

  return (
    <>
      <SiteHeader />
      <main className="medical-grid px-4 py-16 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-7xl">
          <div className="rounded-[2.5rem] bg-white p-8 shadow-2xl shadow-medical-blue/10 sm:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal">Health Blog</p>
            <div className="mt-5 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <h1 className="max-w-3xl text-balance text-5xl font-semibold tracking-[-0.06em] text-ink sm:text-7xl">
                  Clear health guidance for families.
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-muted">
                  Hospital updates, preventive care notes, emergency guidance, and practical tips for better conversations with doctors.
                </p>
              </div>
              <form className="flex w-full gap-2 lg:w-auto">
                {category && <input type="hidden" name="category" value={category} />}
                <input
                  name="q"
                  defaultValue={query}
                  placeholder="Search articles"
                  className="min-w-0 flex-1 rounded-full border border-line bg-background px-5 py-3 text-sm outline-none focus:border-medical-blue lg:w-72"
                />
                <button className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white hover:bg-medical-blue">Search</button>
              </form>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              <Link href="/blog" className={`rounded-full px-4 py-2 text-sm font-semibold ${!category ? "bg-ink text-white" : "border border-line text-muted hover:bg-sky"}`}>
                All
              </Link>
              {categories.map((item) => (
                <Link
                  key={item.category}
                  href={`/blog?category=${encodeURIComponent(item.category)}`}
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${category === item.category ? "bg-ink text-white" : "border border-line text-muted hover:bg-sky"}`}
                >
                  {item.category}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group overflow-hidden rounded-[2rem] border border-line bg-white shadow-xl shadow-medical-blue/5 transition hover:-translate-y-1">
                <div className="relative h-60 bg-sky">
                  {post.featuredImage && <Image src={post.featuredImage} alt={post.title} fill className="object-cover transition duration-500 group-hover:scale-105" />}
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.16em] text-teal">
                    <span>{post.category}</span>
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                  <h2 className="mt-4 text-2xl font-semibold tracking-tight text-ink">{post.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="mt-10 rounded-[2rem] border border-line bg-white p-10 text-center">
              <p className="text-lg font-semibold text-ink">No posts found.</p>
              <p className="mt-2 text-sm text-muted">Try a different search or category.</p>
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
