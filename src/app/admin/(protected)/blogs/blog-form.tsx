"use client";

import { useActionState } from "react";

import { saveBlogPostAction } from "@/app/admin/actions";
import { RichBlogEditor } from "@/app/admin/(protected)/blogs/rich-blog-editor";
import { slugify } from "@/lib/validation";

type BlogFormPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  contentJson: unknown;
  category: string;
  featuredImage: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  authorDisplayName: string;
  status: "DRAFT" | "PUBLISHED";
} | null;

export function BlogForm({ post }: { post: BlogFormPost }) {
  const boundAction = saveBlogPostAction.bind(null, post?.id ?? null);
  const [state, action, isPending] = useActionState(boundAction, {});

  return (
    <form action={action} className="grid gap-6 rounded-[2rem] border border-line bg-white p-6 shadow-xl shadow-medical-blue/5">
      {state.message && <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{state.message}</p>}

      <div className="grid gap-4 lg:grid-cols-2">
        <label className="grid gap-1 text-sm font-medium text-ink">
          Title
          <input
            name="title"
            defaultValue={post?.title ?? ""}
            required
            onBlur={(event) => {
              const form = event.currentTarget.form;
              const slugInput = form?.elements.namedItem("slug") as HTMLInputElement | null;
              if (slugInput && !slugInput.value) slugInput.value = slugify(event.currentTarget.value);
            }}
            className="rounded-2xl border border-line bg-background px-4 py-3 outline-none focus:border-medical-blue"
          />
        </label>
        <label className="grid gap-1 text-sm font-medium text-ink">
          Slug
          <input name="slug" defaultValue={post?.slug ?? ""} required className="rounded-2xl border border-line bg-background px-4 py-3 outline-none focus:border-medical-blue" />
        </label>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <label className="grid gap-1 text-sm font-medium text-ink">
          Category
          <input name="category" defaultValue={post?.category ?? "Health Tips"} required className="rounded-2xl border border-line bg-background px-4 py-3 outline-none focus:border-medical-blue" />
        </label>
        <label className="grid gap-1 text-sm font-medium text-ink">
          Status
          <select name="status" defaultValue={post?.status ?? "DRAFT"} className="rounded-2xl border border-line bg-background px-4 py-3 outline-none focus:border-medical-blue">
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </label>
      </div>

      <label className="grid gap-1 text-sm font-medium text-ink">
        Excerpt
        <textarea name="excerpt" defaultValue={post?.excerpt ?? ""} required rows={3} className="resize-none rounded-2xl border border-line bg-background px-4 py-3 outline-none focus:border-medical-blue" />
      </label>

      <div className="grid gap-1 text-sm font-medium text-ink">
        Content
        <RichBlogEditor initialContent={post?.content ?? ""} initialContentJson={post?.contentJson ?? null} />
      </div>

      <label className="grid gap-1 text-sm font-medium text-ink">
        Featured image URL
        <input name="featuredImage" defaultValue={post?.featuredImage ?? ""} className="rounded-2xl border border-line bg-background px-4 py-3 outline-none focus:border-medical-blue" />
      </label>

      <div className="grid gap-4 lg:grid-cols-2">
        <label className="grid gap-1 text-sm font-medium text-ink">
          SEO title optional
          <input name="seoTitle" defaultValue={post?.seoTitle ?? ""} className="rounded-2xl border border-line bg-background px-4 py-3 outline-none focus:border-medical-blue" />
        </label>
        <label className="grid gap-1 text-sm font-medium text-ink">
          Author display name
          <input name="authorDisplayName" defaultValue={post?.authorDisplayName ?? "Shree Shivaya Hospital"} className="rounded-2xl border border-line bg-background px-4 py-3 outline-none focus:border-medical-blue" />
        </label>
      </div>

      <label className="grid gap-1 text-sm font-medium text-ink">
        SEO description optional
        <textarea name="seoDescription" defaultValue={post?.seoDescription ?? ""} rows={3} className="resize-none rounded-2xl border border-line bg-background px-4 py-3 outline-none focus:border-medical-blue" />
      </label>

      <button disabled={isPending} className="w-fit rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white hover:bg-medical-blue disabled:opacity-60">
        {isPending ? "Saving..." : "Save Post"}
      </button>
    </form>
  );
}
