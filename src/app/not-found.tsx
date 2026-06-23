import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Calendar03Icon, Home03Icon, Newspaper } from "@hugeicons/core-free-icons";

export default function NotFound() {
  return (
    <main className="medical-grid flex min-h-screen items-center px-4 py-16 sm:px-6 lg:px-8">
      <section className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-ink p-8 text-white shadow-2xl shadow-medical-blue/20 sm:p-10">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-sky/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-teal/20 blur-3xl" />
          <div className="relative">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky">Page Not Found</p>
            <h1 className="mt-6 text-[8rem] font-semibold leading-none tracking-[-0.08em] sm:text-[11rem]">
              404
            </h1>
            <p className="mt-6 max-w-md text-balance text-lg leading-8 text-white/78">
              The page you are looking for may have moved, been renamed, or is temporarily unavailable.
            </p>
          </div>
        </div>

        <div className="p-2 sm:p-4">
          <span className="inline-flex rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-medical-blue">
            Shree Shivaya Hospital
          </span>
          <h2 className="mt-6 text-balance text-4xl font-semibold tracking-[-0.05em] text-ink sm:text-6xl">
            Let’s get you back to care.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted">
            Use one of the quick links below to continue browsing the hospital website or request an appointment.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <Link
              href="/"
              className="rounded-[1.5rem] bg-transparent p-5 transition hover:-translate-y-0.5"
            >
              <HugeiconsIcon icon={Home03Icon} size={24} strokeWidth={1.8} className="text-medical-blue" />
              <span className="mt-5 block text-sm font-semibold text-ink">Home</span>
            </Link>
            <Link
              href="/#appointment"
              className="rounded-[1.5rem] bg-transparent p-5 transition hover:-translate-y-0.5"
            >
              <HugeiconsIcon icon={Calendar03Icon} size={24} strokeWidth={1.8} className="text-medical-blue" />
              <span className="mt-5 block text-sm font-semibold text-ink">Appointment</span>
            </Link>
            <Link
              href="/blog"
              className="rounded-[1.5rem] bg-transparent p-5 transition hover:-translate-y-0.5"
            >
              <HugeiconsIcon icon={Newspaper} size={24} strokeWidth={1.8} className="text-medical-blue" />
              <span className="mt-5 block text-sm font-semibold text-ink">Health Blog</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
