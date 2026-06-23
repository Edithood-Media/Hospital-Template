import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Calendar03Icon, ClinicIcon, Doctor01Icon, FirstAidKitIcon, HeartCheckIcon, TestTube01Icon } from "@hugeicons/core-free-icons";

import { deleteServiceAction } from "@/app/admin/actions";
import { prisma } from "@/lib/prisma";

const serviceIconMap = {
  "first-aid": FirstAidKitIcon,
  doctor: Doctor01Icon,
  clinic: ClinicIcon,
  heart: HeartCheckIcon,
  "test-tube": TestTube01Icon,
  calendar: Calendar03Icon,
};

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] });

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal">Services</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink">Manage homepage services</h1>
        </div>
        <Link href="/admin/services/new" className="w-fit rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white hover:bg-medical-blue">New Service</Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <article key={service.id} className="group rounded-[2rem] border border-line bg-white p-7 transition hover:-translate-y-1 hover:border-sky hover:bg-sky/60">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-sm font-bold text-medical-blue shadow-sm ring-1 ring-line">
              <HugeiconsIcon icon={serviceIconMap[service.iconKey as keyof typeof serviceIconMap] ?? ClinicIcon} size={24} strokeWidth={1.7} />
            </span>
            <h2 className="mt-8 text-2xl font-semibold tracking-tight text-ink">{service.title}</h2>
            <p className="mt-3 min-h-[72px] text-sm leading-6 text-muted">{service.description}</p>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line/70 pt-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${service.isVisible ? "bg-sky text-medical-blue" : "bg-zinc-100 text-muted"}`}>
                  {service.isVisible ? "Visible" : "Hidden"}
                </span>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-muted ring-1 ring-line">
                  Sort {service.sortOrder}
                </span>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/services/${service.id}`} className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink hover:bg-sky">Edit</Link>
                <form action={deleteServiceAction}>
                  <input type="hidden" name="id" value={service.id} />
                  <button className="rounded-full border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50">Delete</button>
                </form>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
