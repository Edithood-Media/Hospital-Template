import { AppointmentsTable } from "./appointments-table";
import { prisma } from "@/lib/prisma";

export default async function AdminAppointmentsPage() {
  const appointments = await prisma.appointment.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal">Appointments</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink">Patient appointment requests</h1>
      </div>

      <AppointmentsTable appointments={appointments} />
    </div>
  );
}
