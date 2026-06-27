"use client";

import { useMemo, useRef, useState } from "react";
import type { JSONContent } from "@tiptap/core";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { Table } from "@tiptap/extension-table";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableRow } from "@tiptap/extension-table-row";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Youtube from "@tiptap/extension-youtube";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import {
  extractPlainTextFromRichContent,
  isRichContentDocument,
  isSafeYouTubeUrl,
  MAX_RICH_IMAGE_LENGTH,
  textToRichContentDocument,
  type RichContentDocument,
} from "@/lib/rich-content";

const MAX_UPLOAD_SIZE = 5 * 1024 * 1024;
const IMAGE_MAX_WIDTH = 1200;
const WEBP_QUALITY = 0.8;

type RichBlogEditorProps = {
  initialContent: string;
  initialContentJson: unknown;
};

export function RichBlogEditor({ initialContent, initialContentJson }: RichBlogEditorProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const initialDocument = useMemo(() => {
    return isRichContentDocument(initialContentJson)
      ? initialContentJson
      : textToRichContentDocument(initialContent);
  }, [initialContent, initialContentJson]);
  const [plainText, setPlainText] = useState(() => extractPlainTextFromRichContent(initialDocument));
  const [contentJson, setContentJson] = useState(() => JSON.stringify(initialDocument));
  const [message, setMessage] = useState<string | null>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Underline,
      Link.configure({
        autolink: true,
        openOnClick: false,
        protocols: ["http", "https", "mailto", "tel"],
      }),
      Image.configure({ inline: false, allowBase64: true }),
      Youtube.configure({ controls: true, nocookie: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Table.configure({ resizable: false }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: initialDocument as JSONContent,
    editorProps: {
      attributes: {
        class: "rich-editor-content min-h-[360px] rounded-b-2xl bg-white px-5 py-4 outline-none",
      },
    },
    onUpdate({ editor: currentEditor }) {
      const json = currentEditor.getJSON() as RichContentDocument;
      setContentJson(JSON.stringify(json));
      setPlainText(extractPlainTextFromRichContent(json));
    },
  });

  async function handleImageUpload(file: File | undefined) {
    if (!file || !editor) return;
    setMessage(null);

    if (!file.type.startsWith("image/")) {
      setMessage("Please choose a valid image file.");
      return;
    }

    if (file.size > MAX_UPLOAD_SIZE) {
      setMessage("Image is too large. Upload an image below 5MB.");
      return;
    }

    try {
      const src = await convertImageToWebpDataUrl(file);
      if (src.length > MAX_RICH_IMAGE_LENGTH) {
        setMessage("Compressed image is still too large. Try a smaller image.");
        return;
      }

      const alt = window.prompt("Image alt text", file.name.replace(/\.[^.]+$/, "")) ?? "";
      editor.chain().focus().setImage({ src, alt }).run();
    } catch {
      setMessage("Could not process this image. Try another file.");
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function setLink() {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL", previousUrl ?? "https://");

    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

  function insertYoutube() {
    if (!editor) return;
    const url = window.prompt("YouTube URL", "https://www.youtube.com/watch?v=");
    if (!url) return;

    if (!isSafeYouTubeUrl(url)) {
      setMessage("Please enter a valid YouTube URL.");
      return;
    }

    editor.commands.setYoutubeVideo({ src: url, width: 960, height: 540 });
  }

  return (
    <div className="grid gap-2">
      <input type="hidden" name="content" value={plainText} />
      <input type="hidden" name="contentJson" value={contentJson} />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(event) => void handleImageUpload(event.target.files?.[0])}
      />

      <div className="overflow-hidden rounded-2xl border border-line bg-background">
        <div className="flex flex-wrap gap-2 border-b border-line bg-background p-3">
          <ToolbarButton label="P" onClick={() => editor?.chain().focus().setParagraph().run()} active={editor?.isActive("paragraph")} />
          <ToolbarButton label="H2" onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} active={editor?.isActive("heading", { level: 2 })} />
          <ToolbarButton label="H3" onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} active={editor?.isActive("heading", { level: 3 })} />
          <ToolbarButton label="Bold" onClick={() => editor?.chain().focus().toggleBold().run()} active={editor?.isActive("bold")} />
          <ToolbarButton label="Italic" onClick={() => editor?.chain().focus().toggleItalic().run()} active={editor?.isActive("italic")} />
          <ToolbarButton label="Underline" onClick={() => editor?.chain().focus().toggleUnderline().run()} active={editor?.isActive("underline")} />
          <ToolbarButton label="Bullets" onClick={() => editor?.chain().focus().toggleBulletList().run()} active={editor?.isActive("bulletList")} />
          <ToolbarButton label="Numbers" onClick={() => editor?.chain().focus().toggleOrderedList().run()} active={editor?.isActive("orderedList")} />
          <ToolbarButton label="Left" onClick={() => editor?.chain().focus().setTextAlign("left").run()} active={editor?.isActive({ textAlign: "left" })} />
          <ToolbarButton label="Center" onClick={() => editor?.chain().focus().setTextAlign("center").run()} active={editor?.isActive({ textAlign: "center" })} />
          <ToolbarButton label="Right" onClick={() => editor?.chain().focus().setTextAlign("right").run()} active={editor?.isActive({ textAlign: "right" })} />
          <ToolbarButton label="Quote" onClick={() => editor?.chain().focus().toggleBlockquote().run()} active={editor?.isActive("blockquote")} />
          <ToolbarButton label="Divider" onClick={() => editor?.chain().focus().setHorizontalRule().run()} />
          <ToolbarButton label="Link" onClick={setLink} active={editor?.isActive("link")} />
          <ToolbarButton label="Image" onClick={() => fileInputRef.current?.click()} />
          <ToolbarButton label="YouTube" onClick={insertYoutube} />
          <ToolbarButton label="Table" onClick={() => editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} />
          <ToolbarButton label="+ Row" onClick={() => editor?.chain().focus().addRowAfter().run()} disabled={!editor?.isActive("table")} />
          <ToolbarButton label="+ Col" onClick={() => editor?.chain().focus().addColumnAfter().run()} disabled={!editor?.isActive("table")} />
          <ToolbarButton label="Del Row" onClick={() => editor?.chain().focus().deleteRow().run()} disabled={!editor?.isActive("table")} />
          <ToolbarButton label="Del Col" onClick={() => editor?.chain().focus().deleteColumn().run()} disabled={!editor?.isActive("table")} />
        </div>
        <EditorContent editor={editor} />
      </div>

      <p className="text-xs leading-5 text-muted">
        Uploaded images are resized, converted to WebP, and saved inside the blog post. Use concise images to keep pages fast.
      </p>
      {message && <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{message}</p>}
    </div>
  );
}

function ToolbarButton({
  label,
  onClick,
  active,
  disabled,
}: {
  label: string;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`rounded-full px-3 py-2 text-xs font-bold transition disabled:cursor-not-allowed disabled:opacity-40 ${active ? "bg-ink text-white" : "bg-white text-ink hover:bg-sky"}`}
    >
      {label}
    </button>
  );
}

async function convertImageToWebpDataUrl(file: File) {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, IMAGE_MAX_WIDTH / bitmap.width);
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas is unavailable");
  context.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", WEBP_QUALITY));
  if (!blob) throw new Error("Image compression failed");

  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}
