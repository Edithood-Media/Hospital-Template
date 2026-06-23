"use client";

import { useActionState } from "react";

import { saveServiceAction } from "@/app/admin/actions";

type ServiceFormData = {
  id: string;
  title: string;
  description: string;
  iconKey: string;
  sortOrder: number;
  isVisible: boolean;
} | null;

const iconOptions = ["first-aid", "doctor", "clinic", "heart", "test-tube", "calendar"];

export function ServiceForm({ service }: { service: ServiceFormData }) {
  const [state, action, isPending] = useActionState(saveServiceAction.bind(null, service?.id ?? null), {});

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
