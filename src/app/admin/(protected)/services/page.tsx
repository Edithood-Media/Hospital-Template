import Link from "next/link";
import Image from "next/image";
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
          <article
            key={service.id}
            className={`relative overflow-hidden rounded-[2rem] border border-white/60 p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.75),inset_0_-1px_0_rgba(0,0,0,0.10),0_16px_34px_rgba(0,0,0,0.08)] ring-1 ring-white/50 ${
              service.image ? "bg-ink text-white" : "bg-white"
            }`}
          >
            {service.image && (
              <>
                <Image src={service.image} alt="" fill className="object-cover opacity-85" />
                <div className="absolute inset-0 bg-black/20" />
              </>
            )}
            <div className="relative flex items-center gap-4">
              <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-sm font-bold shadow-sm ${service.image ? "bg-black/55 text-sky ring-1 ring-white/15" : "bg-white text-medical-blue ring-1 ring-line"}`}>
                <HugeiconsIcon icon={serviceIconMap[service.iconKey as keyof typeof serviceIconMap] ?? ClinicIcon} size={24} strokeWidth={1.7} />
              </span>
              <h2 className={`text-2xl font-semibold tracking-tight ${service.image ? "text-white" : "text-ink"}`}>{service.title}</h2>
            </div>
            <p className={`relative mt-3 min-h-[72px] text-sm leading-6 ${service.image ? "font-medium !text-white drop-shadow-[0_2px_5px_rgba(0,0,0,0.75)]" : "text-muted"}`}>{service.description}</p>
            <div className={`relative mt-6 flex flex-wrap items-center justify-between gap-3 border-t pt-5 ${service.image ? "border-white/20" : "border-line/70"}`}>
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
