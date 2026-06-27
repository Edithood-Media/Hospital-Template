import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AppointmentForm } from "@/components/appointment-form";
import { RichBlogContent } from "@/components/rich-blog-content";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { formatDate, getLatestPublishedPosts, getPublishedPostBySlug } from "@/lib/data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    return { title: "Blog Post" };
  }

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const related = (await getLatestPublishedPosts(4)).filter((item) => item.id !== post.id).slice(0, 3);

  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="medical-grid px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <Link href="/blog" className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-muted hover:bg-sky">
              Back to Blog
            </Link>
            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-teal">{post.category}</p>
            <h1 className="mt-5 text-balance text-5xl font-semibold tracking-[-0.06em] text-ink sm:text-7xl">{post.title}</h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted">{post.excerpt}</p>
            <p className="mt-5 text-sm font-medium text-muted">{formatDate(post.publishedAt)} · {post.authorDisplayName}</p>
          </div>

          {post.featuredImage && (
            <div className="relative mx-auto mt-12 h-[460px] max-w-6xl overflow-hidden rounded-[2.5rem] bg-sky shadow-2xl shadow-medical-blue/10">
              <Image src={post.featuredImage} alt={post.title} fill priority className="object-cover" />
            </div>
          )}
        </article>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_380px]">
            <div className="max-w-none rounded-[2rem] border border-line bg-background p-8 text-lg leading-8 text-muted sm:p-12">
              <RichBlogContent contentJson={post.contentJson} fallbackContent={post.content} />
              <div className="mt-10 rounded-[2rem] bg-sky p-6 text-sm leading-6 text-medical-blue">
                This article is for general awareness and does not replace a consultation with a qualified doctor.
              </div>
            </div>
            <aside className="space-y-6">
              <AppointmentForm compact />
              <div className="rounded-[2rem] border border-line bg-white p-6">
                <p className="text-lg font-semibold text-ink">Related Reads</p>
                <div className="mt-4 space-y-4">
                  {related.map((item) => (
                    <Link key={item.id} href={`/blog/${item.slug}`} className="block rounded-2xl bg-background p-4 hover:bg-sky">
                      <p className="text-sm font-semibold text-ink">{item.title}</p>
                      <p className="mt-1 text-xs text-muted">{item.category}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
