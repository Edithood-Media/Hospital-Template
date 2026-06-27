"use client";

import { useActionState, useRef, useState } from "react";
import Image from "next/image";

import { saveServiceAction } from "@/app/admin/actions";

type ServiceFormData = {
  id: string;
  title: string;
  description: string;
  image?: string | null;
  iconKey: string;
  sortOrder: number;
  isVisible: boolean;
} | null;

const iconOptions = ["first-aid", "doctor", "clinic", "heart", "test-tube", "calendar"];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const MAX_IMAGE_WIDTH = 1200;
const WEBP_QUALITY = 0.78;

export function ServiceForm({ service }: { service: ServiceFormData }) {
  const [state, action, isPending] = useActionState(saveServiceAction.bind(null, service?.id ?? null), {});
  const [image, setImage] = useState(service?.image ?? "");
  const [imageMessage, setImageMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setImageMessage("");

    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setImageMessage("Please choose a valid image file.");
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      setImageMessage("Image is too large. Upload an image below 5MB.");
      return;
    }

    try {
      const compressed = await compressImage(file);
      setImage(compressed);
    } catch {
      setImageMessage("Could not process this image. Try another file.");
    }
  }

  function removeImage() {
    setImage("");
    setImageMessage("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <form action={action} className="grid gap-5 rounded-[2rem] border border-line bg-white p-6 shadow-xl shadow-medical-blue/5">
      {state.message && <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{state.message}</p>}
      <div className="grid gap-4 lg:grid-cols-2">
        <label className="grid gap-1 text-sm font-medium text-ink">
          Service title
          <input name="title" defaultValue={service?.title ?? ""} required className="rounded-2xl border border-line bg-background px-4 py-3 outline-none focus:border-medical-blue" />
        </label>
        <label className="grid gap-1 text-sm font-medium text-ink">
          Icon
          <select name="iconKey" defaultValue={service?.iconKey ?? "clinic"} className="rounded-2xl border border-line bg-background px-4 py-3 outline-none focus:border-medical-blue">
            {iconOptions.map((icon) => <option key={icon} value={icon}>{icon}</option>)}
          </select>
        </label>
      </div>
      <label className="grid gap-1 text-sm font-medium text-ink">
        Description
        <textarea name="description" defaultValue={service?.description ?? ""} required rows={4} className="resize-none rounded-2xl border border-line bg-background px-4 py-3 outline-none focus:border-medical-blue" />
      </label>
      <div className="grid gap-3 rounded-[1.5rem] border border-line bg-background p-4">
        <div>
          <p className="text-sm font-semibold text-ink">Service card image</p>
          <p className="mt-1 text-xs leading-5 text-muted">Upload a card image for phone and desktop. It will be compressed and shown with a dark transparent overlay.</p>
        </div>
        <input name="image" type="hidden" value={image} />
        {image && (
          <div className="relative h-44 overflow-hidden rounded-2xl bg-ink shadow-xl shadow-black/20">
            <Image src={image} alt="Service card preview" fill className="object-cover opacity-70" />
            <div className="absolute inset-0 bg-black/35" />
          </div>
        )}
        <div className="flex flex-wrap items-center gap-3">
          <label className="w-fit cursor-pointer rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white hover:bg-medical-blue">
            Upload Image
            <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImageChange} className="sr-only" />
          </label>
          {image && (
            <button type="button" onClick={removeImage} className="rounded-full border border-line bg-white px-5 py-3 text-sm font-semibold text-ink hover:bg-sky">
              Remove Image
            </button>
          )}
        </div>
        {imageMessage && <p className="text-sm font-medium text-red-600">{imageMessage}</p>}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1 text-sm font-medium text-ink">
          Sort order
          <input name="sortOrder" type="number" min="0" defaultValue={service?.sortOrder ?? 0} className="rounded-2xl border border-line bg-background px-4 py-3 outline-none focus:border-medical-blue" />
        </label>
        <label className="flex items-center gap-3 rounded-2xl border border-line bg-background px-4 py-3 text-sm font-medium text-ink">
          <input name="isVisible" type="checkbox" defaultChecked={service?.isVisible ?? true} className="h-4 w-4" />
          Show on homepage
        </label>
      </div>
      <button disabled={isPending} className="w-fit rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white hover:bg-medical-blue disabled:opacity-60">
        {isPending ? "Saving..." : "Save Service"}
      </button>
    </form>
  );
}

async function compressImage(file: File) {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_IMAGE_WIDTH / bitmap.width);
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
  if (!blob) throw new Error("Image conversion failed");

  return await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}
