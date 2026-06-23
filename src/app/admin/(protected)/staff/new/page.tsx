import Link from "next/link";

import { StaffForm } from "@/app/admin/(protected)/staff/staff-form";

export default function NewStaffPage() {
  return (
    <div className="space-y-6">
      <Link href="/admin/staff" className="inline-flex rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-muted hover:bg-sky">Back to staff</Link>
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal">New Staff</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink">Create staff profile</h1>
      </div>
      <StaffForm staff={null} />
    </div>
  );
}
