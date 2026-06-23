import Link from "next/link";

import { ServiceForm } from "@/app/admin/(protected)/services/service-form";

export default function NewServicePage() {
  return (
    <div className="space-y-6">
      <Link href="/admin/services" className="inline-flex rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-muted hover:bg-sky">Back to services</Link>
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal">New Service</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink">Create service</h1>
      </div>
      <ServiceForm service={null} />
    </div>
  );
}
