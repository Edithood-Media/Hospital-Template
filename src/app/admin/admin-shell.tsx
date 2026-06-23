import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Appointment01Icon,
  DashboardSquare01Icon,
  Hospital01Icon,
  Logout03Icon,
  Newspaper,
  ServiceIcon,
  UserGroupIcon,
  Wardrobe01Icon,
} from "@hugeicons/core-free-icons";

import { logoutAction } from "@/app/admin/actions";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: DashboardSquare01Icon },
  { href: "/admin/appointments", label: "Appointments", icon: Appointment01Icon },
  { href: "/admin/blogs", label: "Blogs", icon: Newspaper },
  { href: "/admin/services", label: "Services", icon: ServiceIcon },
  { href: "/admin/facilities", label: "Facilities", icon: Hospital01Icon },
  { href: "/admin/staff", label: "Staff", icon: UserGroupIcon },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[280px_1fr]">
      <aside className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur-xl lg:h-screen lg:border-b-0 lg:border-r lg:bg-white">
        <div className="flex items-center justify-between px-4 py-4 lg:block lg:px-5 lg:py-6">
          <Link href="/admin" className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-ink text-white">
              <HugeiconsIcon icon={Wardrobe01Icon} size={22} strokeWidth={1.8} />
            </span>
            <span>
              <span className="block text-sm font-semibold text-ink">Shree Shivaya</span>
              <span className="block text-xs font-medium text-muted">Admin Panel</span>
            </span>
          </Link>
          <form action={logoutAction} className="lg:hidden">
            <button className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white hover:bg-medical-blue">Logout</button>
          </form>
        </div>

        <nav className="flex gap-2 overflow-x-auto px-4 pb-4 lg:grid lg:gap-2 lg:overflow-visible lg:px-5 lg:pb-0">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex shrink-0 items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-muted transition hover:bg-sky hover:text-ink lg:w-full"
            >
              <HugeiconsIcon icon={item.icon} size={20} strokeWidth={1.8} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto hidden px-5 pb-6 lg:absolute lg:bottom-0 lg:left-0 lg:right-0 lg:block">
          <Link href="/" className="mb-3 flex items-center justify-center rounded-full border border-line px-4 py-3 text-sm font-semibold text-ink hover:bg-sky">
            View Website
          </Link>
          <form action={logoutAction}>
            <button className="flex w-full items-center justify-center gap-2 rounded-full bg-ink px-4 py-3 text-sm font-semibold text-white hover:bg-medical-blue">
              <HugeiconsIcon icon={Logout03Icon} size={18} strokeWidth={1.8} />
              Logout
            </button>
          </form>
        </div>
      </aside>

      <main className="min-w-0 px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
