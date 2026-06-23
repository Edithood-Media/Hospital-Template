import Link from "next/link";
import { notFound } from "next/navigation";

import { ServiceForm } from "@/app/admin/(protected)/services/service-form";
import { prisma } from "@/lib/prisma";

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = await prisma.service.findUnique({ where: { id } });
  if (!service) notFound();

  return (
    <div className="space-y-6">
      <Link href="/admin/services" className="inline-flex rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-muted hover:bg-sky">Back to services</Link>
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal">Edit Service</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink">Update service</h1>
      </div>
      <ServiceForm service={service} />
    </div>
  );
}
