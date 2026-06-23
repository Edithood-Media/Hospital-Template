import Link from "next/link";

import { FacilityForm } from "@/app/admin/(protected)/facilities/facility-form";

export default function NewFacilityPage() {
  return (
    <div className="space-y-6">
      <Link href="/admin/facilities" className="inline-flex rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-muted hover:bg-sky">Back to facilities</Link>
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal">New Facility</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink">Create facility</h1>
      </div>
      <FacilityForm facility={null} />
    </div>
  );
}
