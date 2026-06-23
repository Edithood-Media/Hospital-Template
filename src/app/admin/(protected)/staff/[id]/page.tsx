import Link from "next/link";
import { notFound } from "next/navigation";

import { StaffForm } from "@/app/admin/(protected)/staff/staff-form";
import { prisma } from "@/lib/prisma";

export default async function EditStaffPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const staff = await prisma.staffProfile.findUnique({ where: { id } });
  if (!staff) notFound();

  return (
    <div className="space-y-6">
      <Link href="/admin/staff" className="inline-flex rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-muted hover:bg-sky">Back to staff</Link>
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal">Edit Staff</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink">Update staff profile</h1>
      </div>
      <StaffForm staff={staff} />
    </div>
  );
}
