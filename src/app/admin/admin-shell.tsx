import Link from "next/link";

import { logoutAction } from "@/app/admin/actions";

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/admin" className="font-semibold text-ink">Shree Shivaya Admin</Link>
          <nav className="hidden gap-2 md:flex">
            <Link className="rounded-full px-4 py-2 text-sm font-semibold text-muted hover:bg-sky" href="/admin">Dashboard</Link>
            <Link className="rounded-full px-4 py-2 text-sm font-semibold text-muted hover:bg-sky" href="/admin/appointments">Appointments</Link>
            <Link className="rounded-full px-4 py-2 text-sm font-semibold text-muted hover:bg-sky" href="/admin/blogs">Blogs</Link>
          </nav>
          <form action={logoutAction}>
            <button className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white hover:bg-medical-blue">Logout</button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
