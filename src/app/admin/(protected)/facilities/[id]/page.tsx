import Link from "next/link";
import { notFound } from "next/navigation";

import { FacilityForm } from "@/app/admin/(protected)/facilities/facility-form";
import { prisma } from "@/lib/prisma";

export default async function EditFacilityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const facility = await prisma.facility.findUnique({ where: { id } });
  if (!facility) notFound();

  return (
    <div className="space-y-6">
      <Link href="/admin/facilities" className="inline-flex rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-muted hover:bg-sky">Back to facilities</Link>
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal">Edit Facility</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink">Update facility</h1>
      </div>
      <FacilityForm facility={facility} />
    </div>
  );
}
