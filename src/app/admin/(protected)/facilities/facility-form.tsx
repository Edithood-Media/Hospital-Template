"use client";

import { useActionState } from "react";

import { saveFacilityAction } from "@/app/admin/actions";

type FacilityFormData = {
  id: string;
  title: string;
  label: string;
  image: string;
  iconKey: string;
  sortOrder: number;
  isVisible: boolean;
} | null;

const iconOptions = ["ambulance", "bed", "hospital", "medicine", "lab", "xray", "clean", "parking", "building"];

export function FacilityForm({ facility }: { facility: FacilityFormData }) {
  const [state, action, isPending] = useActionState(saveFacilityAction.bind(null, facility?.id ?? null), {});

  return (
    <form action={action} className="grid gap-5 rounded-[2rem] border border-line bg-white p-6 shadow-xl shadow-medical-blue/5">
      {state.message && <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{state.message}</p>}
      <div className="grid gap-4 lg:grid-cols-2">
        <label className="grid gap-1 text-sm font-medium text-ink">
          Facility title
          <input name="title" defaultValue={facility?.title ?? ""} required className="rounded-2xl border border-line bg-background px-4 py-3 outline-none focus:border-medical-blue" />
        </label>
        <label className="grid gap-1 text-sm font-medium text-ink">
          Label
          <input name="label" defaultValue={facility?.label ?? ""} required className="rounded-2xl border border-line bg-background px-4 py-3 outline-none focus:border-medical-blue" />
        </label>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <label className="grid gap-1 text-sm font-medium text-ink">
          Icon
          <select name="iconKey" defaultValue={facility?.iconKey ?? "hospital"} className="rounded-2xl border border-line bg-background px-4 py-3 outline-none focus:border-medical-blue">
            {iconOptions.map((icon) => <option key={icon} value={icon}>{icon}</option>)}
          </select>
        </label>
        <label className="grid gap-1 text-sm font-medium text-ink">
          Sort order
          <input name="sortOrder" type="number" min="0" defaultValue={facility?.sortOrder ?? 0} className="rounded-2xl border border-line bg-background px-4 py-3 outline-none focus:border-medical-blue" />
        </label>
      </div>
      <label className="grid gap-1 text-sm font-medium text-ink">
        Image URL
        <input name="image" defaultValue={facility?.image ?? ""} required className="rounded-2xl border border-line bg-background px-4 py-3 outline-none focus:border-medical-blue" />
      </label>
      <label className="flex items-center gap-3 rounded-2xl border border-line bg-background px-4 py-3 text-sm font-medium text-ink">
        <input name="isVisible" type="checkbox" defaultChecked={facility?.isVisible ?? true} className="h-4 w-4" />
        Show on homepage
      </label>
      <button disabled={isPending} className="w-fit rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white hover:bg-medical-blue disabled:opacity-60">
        {isPending ? "Saving..." : "Save Facility"}
      </button>
    </form>
  );
}
