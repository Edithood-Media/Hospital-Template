import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Calendar03Icon, TelephoneIcon } from "@hugeicons/core-free-icons";

const navItems = [
  { href: "/#about", label: "About" },
  { href: "/#services", label: "Services" },
  { href: "/#facilities", label: "Facilities" },
  { href: "/#doctors", label: "Doctors" },
  { href: "/blog", label: "Blog" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-background/80 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3" aria-label="Shree Shivaya Hospital home">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink text-lg font-bold text-white shadow-lg shadow-black/10">
            SS
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold tracking-tight text-ink">Shree Shivaya</span>
            <span className="block text-xs font-medium text-muted">Hospital</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-line bg-white/80 p-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted transition hover:bg-sky hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="tel:+919876543210"
            className="hidden items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:border-medical-blue hover:text-medical-blue sm:inline-flex"
          >
            <HugeiconsIcon icon={TelephoneIcon} size={17} strokeWidth={1.8} />
            Call Now
          </a>
          <Link
            href="/#appointment"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-medical-blue"
          >
            <HugeiconsIcon icon={Calendar03Icon} size={17} strokeWidth={1.8} />
            Book Appointment
          </Link>
        </div>
      </div>
    </header>
  );
}
