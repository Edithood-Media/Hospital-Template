"use client";

import { useActionState } from "react";

import { saveStaffProfileAction } from "@/app/admin/actions";

type StaffFormData = {
  id: string;
  name: string;
  role: string;
  detail: string;
  image: string;
  department: string;
  sortOrder: number;
  isVisible: boolean;
} | null;

export function StaffForm({ staff }: { staff: StaffFormData }) {
  const [state, action, isPending] = useActionState(saveStaffProfileAction.bind(null, staff?.id ?? null), {});

  return (
    <form action={action} className="grid gap-5 rounded-[2rem] border border-line bg-white p-6 shadow-xl shadow-medical-blue/5">
      {state.message && <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{state.message}</p>}
      <div className="grid gap-4 lg:grid-cols-2">
        <label className="grid gap-1 text-sm font-medium text-ink">
          Name
          <input name="name" defaultValue={staff?.name ?? ""} required className="rounded-2xl border border-line bg-background px-4 py-3 outline-none focus:border-medical-blue" />
        </label>
        <label className="grid gap-1 text-sm font-medium text-ink">
          Department
          <input name="department" defaultValue={staff?.department ?? ""} required placeholder="Orthopedics, Diagnostics, Maternity" className="rounded-2xl border border-line bg-background px-4 py-3 outline-none focus:border-medical-blue" />
        </label>
      </div>
      <label className="grid gap-1 text-sm font-medium text-ink">
        Role
        <input name="role" defaultValue={staff?.role ?? ""} required className="rounded-2xl border border-line bg-background px-4 py-3 outline-none focus:border-medical-blue" />
      </label>
      <label className="grid gap-1 text-sm font-medium text-ink">
        Description
        <textarea name="detail" defaultValue={staff?.detail ?? ""} required rows={4} className="resize-none rounded-2xl border border-line bg-background px-4 py-3 outline-none focus:border-medical-blue" />
      </label>
      <label className="grid gap-1 text-sm font-medium text-ink">
        Image URL
        <input name="image" defaultValue={staff?.image ?? ""} required className="rounded-2xl border border-line bg-background px-4 py-3 outline-none focus:border-medical-blue" />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1 text-sm font-medium text-ink">
          Sort order
          <input name="sortOrder" type="number" min="0" defaultValue={staff?.sortOrder ?? 0} className="rounded-2xl border border-line bg-background px-4 py-3 outline-none focus:border-medical-blue" />
        </label>
        <label className="flex items-center gap-3 rounded-2xl border border-line bg-background px-4 py-3 text-sm font-medium text-ink">
          <input name="isVisible" type="checkbox" defaultChecked={staff?.isVisible ?? true} className="h-4 w-4" />
          Show on homepage
        </label>
      </div>
      <button disabled={isPending} className="w-fit rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white hover:bg-medical-blue disabled:opacity-60">
        {isPending ? "Saving..." : "Save Staff Profile"}
      </button>
    </form>
  );
}
