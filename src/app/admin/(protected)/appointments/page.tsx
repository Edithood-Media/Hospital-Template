import { deleteAppointmentAction, updateAppointmentAction } from "@/app/admin/actions";
import { formatDate } from "@/lib/data";
import { prisma } from "@/lib/prisma";

const statuses = ["NEW", "CONTACTED", "CONFIRMED", "COMPLETED", "CANCELLED"];

export default async function AdminAppointmentsPage() {
  const appointments = await prisma.appointment.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal">Appointments</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink">Patient appointment requests</h1>
      </div>

      <div className="grid gap-4">
        {appointments.map((appointment) => {
          const action = updateAppointmentAction.bind(null, appointment.id);
          return (
            <article key={appointment.id} className="rounded-[2rem] border border-line bg-white p-6 shadow-xl shadow-medical-blue/5">
              <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-2xl font-semibold text-ink">{appointment.patientName}</h2>
                    <span className="rounded-full bg-sky px-3 py-1 text-xs font-bold text-medical-blue">{appointment.status}</span>
                  </div>
                  <div className="mt-4 grid gap-2 text-sm text-muted sm:grid-cols-2">
                    <p>Phone: {appointment.phone}</p>
                    <p>Email: {appointment.email || "Not provided"}</p>
                    <p>Department: {appointment.department}</p>
                    <p>Date: {formatDate(appointment.preferredDate)} {appointment.preferredTime ? `· ${appointment.preferredTime}` : ""}</p>
                  </div>
                  {appointment.message && <p className="mt-4 rounded-2xl bg-background p-4 text-sm leading-6 text-muted">{appointment.message}</p>}
                </div>
                <form action={action} className="space-y-3">
                  <label className="grid gap-1 text-sm font-medium text-ink">
                    Status
                    <select name="status" defaultValue={appointment.status} className="rounded-2xl border border-line bg-background px-4 py-3 outline-none focus:border-medical-blue">
                      {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
                    </select>
                  </label>
                  <label className="grid gap-1 text-sm font-medium text-ink">
                    Internal notes
                    <textarea name="internalNotes" defaultValue={appointment.internalNotes || ""} rows={3} className="resize-none rounded-2xl border border-line bg-background px-4 py-3 outline-none focus:border-medical-blue" />
                  </label>
                  <div className="flex gap-2">
                    <button className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white hover:bg-medical-blue">Update</button>
                  </div>
                </form>
                <form action={deleteAppointmentAction} className="lg:col-start-2">
                  <input type="hidden" name="id" value={appointment.id} />
                  <button className="text-sm font-semibold text-red-600 hover:text-red-700">Delete spam/invalid request</button>
                </form>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
