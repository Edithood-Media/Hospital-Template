import Link from "next/link";

import { formatDate } from "@/lib/data";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [
    appointments,
    newAppointments,
    publishedPosts,
    draftPosts,
    services,
    facilities,
    staffProfiles,
    recentAppointments,
    recentPosts,
  ] = await Promise.all([
    prisma.appointment.count(),
    prisma.appointment.count({ where: { status: "NEW" } }),
    prisma.blogPost.count({ where: { status: "PUBLISHED" } }),
    prisma.blogPost.count({ where: { status: "DRAFT" } }),
    prisma.service.count(),
    prisma.facility.count(),
    prisma.staffProfile.count(),
    prisma.appointment.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.blogPost.findMany({ orderBy: { updatedAt: "desc" }, take: 5 }),
  ]);

  const stats = [
    { label: "Total Appointments", value: appointments, href: "/admin/appointments" },
    { label: "New Requests", value: newAppointments, href: "/admin/appointments" },
    { label: "Published Blogs", value: publishedPosts, href: "/admin/blogs" },
    { label: "Draft Blogs", value: draftPosts, href: "/admin/blogs" },
    { label: "Services", value: services, href: "/admin/services" },
    { label: "Facilities", value: facilities, href: "/admin/facilities" },
    { label: "Staff Profiles", value: staffProfiles, href: "/admin/staff" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal">Dashboard</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink">Hospital operations at a glance</h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <Link key={item.label} href={item.href} className="rounded-[2rem] border border-line bg-white p-6 shadow-xl shadow-medical-blue/5 transition hover:-translate-y-1 hover:bg-sky/60">
            <p className="text-sm font-semibold text-muted">{item.label}</p>
            <p className="mt-4 text-4xl font-semibold text-ink">{item.value}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-[2rem] border border-line bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-ink">Recent Appointments</h2>
            <Link href="/admin/appointments" className="text-sm font-semibold text-medical-blue">View all</Link>
          </div>
          <div className="mt-5 space-y-3">
            {recentAppointments.map((item) => (
              <div key={item.id} className="rounded-2xl bg-background p-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-semibold text-ink">{item.patientName}</p>
                  <span className="rounded-full bg-sky px-3 py-1 text-xs font-bold text-medical-blue">{item.status}</span>
                </div>
                <p className="mt-1 text-sm text-muted">{item.department} · {formatDate(item.preferredDate)}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-line bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-ink">Recent Blog Posts</h2>
            <Link href="/admin/blogs" className="text-sm font-semibold text-medical-blue">Manage</Link>
          </div>
          <div className="mt-5 space-y-3">
            {recentPosts.map((post) => (
              <div key={post.id} className="rounded-2xl bg-background p-4">
                <p className="font-semibold text-ink">{post.title}</p>
                <p className="mt-1 text-sm text-muted">{post.category} · {post.status}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
