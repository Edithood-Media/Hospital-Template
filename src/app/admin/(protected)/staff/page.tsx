import Image from "next/image";
import Link from "next/link";

import { deleteStaffProfileAction } from "@/app/admin/actions";
import { prisma } from "@/lib/prisma";

export default async function AdminStaffPage() {
  const staff = await prisma.staffProfile.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] });

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal">Staff</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink">Manage doctors and staff</h1>
        </div>
        <Link href="/admin/staff/new" className="w-fit rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white hover:bg-medical-blue">New Staff</Link>
      </div>
      <div className="grid gap-4">
        {staff.map((person) => (
          <article key={person.id} className="rounded-[2rem] border border-line bg-white p-5 shadow-xl shadow-medical-blue/5">
            <div className="grid gap-5 lg:grid-cols-[100px_1fr_auto] lg:items-center">
              <div className="relative h-24 w-24 overflow-hidden rounded-3xl bg-sky">
                <Image src={person.image} alt={person.name} fill className="object-cover object-top" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-2xl font-semibold text-ink">{person.name}</h2>
                  <span className="rounded-full bg-sky px-3 py-1 text-xs font-bold text-medical-blue">{person.isVisible ? "Visible" : "Hidden"}</span>
                </div>
                <p className="mt-2 text-sm font-semibold text-medical-blue">{person.department}</p>
                <p className="mt-2 text-sm text-muted">{person.role} · Sort: {person.sortOrder}</p>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">{person.detail}</p>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/staff/${person.id}`} className="rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink hover:bg-sky">Edit</Link>
                <form action={deleteStaffProfileAction}>
                  <input type="hidden" name="id" value={person.id} />
                  <button className="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50">Delete</button>
                </form>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
