"use client";

import { useEffect, useState } from "react";

import { deleteAppointmentAction, updateAppointmentAction } from "@/app/admin/actions";

const statuses = ["NEW", "CONTACTED", "CONFIRMED", "COMPLETED", "CANCELLED"];

type Appointment = {
  id: string;
  patientName: string;
  phone: string;
  email: string | null;
  department: string;
  preferredDate: Date | string;
  preferredTime: string | null;
  message: string | null;
  status: string;
  internalNotes: string | null;
  createdAt: Date | string;
};

type AppointmentsTableProps = {
  appointments: Appointment[];
};

function formatDate(value: Date | string | null | undefined) {
  if (!value) return "Not set";
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(new Date(value));
}

export function AppointmentsTable({ appointments }: AppointmentsTableProps) {
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | null>(null);
  const selectedAppointment = appointments.find((appointment) => appointment.id === selectedAppointmentId) ?? null;

  return (
    <>
      <div className="overflow-hidden rounded-[2rem] border border-line bg-white shadow-xl shadow-medical-blue/5">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] text-left text-sm">
            <thead className="border-b border-line bg-background text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              <tr>
                <th scope="col" className="px-6 py-4">Patient</th>
                <th scope="col" className="px-6 py-4">Department</th>
                <th scope="col" className="px-6 py-4">Preferred Slot</th>
                <th scope="col" className="px-6 py-4">Status</th>
                <th scope="col" className="px-6 py-4">Requested</th>
                <th scope="col" className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="transition hover:bg-sky/30">
                  <td className="px-6 py-5">
                    <button
                      type="button"
                      onClick={() => setSelectedAppointmentId(appointment.id)}
                      className="text-left"
                    >
                      <span className="block font-semibold text-ink">{appointment.patientName}</span>
                      <span className="mt-1 block text-sm text-muted">{appointment.phone}</span>
                    </button>
                  </td>
                  <td className="px-6 py-5 text-muted">{appointment.department}</td>
                  <td className="px-6 py-5 text-muted">
                    {formatDate(appointment.preferredDate)}
                    {appointment.preferredTime ? `, ${appointment.preferredTime}` : ""}
                  </td>
                  <td className="px-6 py-5">
                    <span className="rounded-full bg-sky px-3 py-1 text-xs font-bold text-medical-blue">{appointment.status}</span>
                  </td>
                  <td className="px-6 py-5 text-muted">{formatDate(appointment.createdAt)}</td>
                  <td className="px-6 py-5 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedAppointmentId(appointment.id)}
                      className="rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink hover:bg-sky"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {appointments.length === 0 && (
          <div className="px-6 py-12 text-center text-sm text-muted">No appointment requests yet.</div>
        )}
      </div>

      {selectedAppointment && (
        <AppointmentModal
          appointment={selectedAppointment}
          onClose={() => setSelectedAppointmentId(null)}
        />
      )}
    </>
  );
}

function AppointmentModal({
  appointment,
  onClose,
}: {
  appointment: Appointment;
  onClose: () => void;
}) {
  const updateAction = updateAppointmentAction.bind(null, appointment.id);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-ink/40 px-4 py-4 backdrop-blur-sm sm:items-center sm:justify-center" role="dialog" aria-modal="true" aria-labelledby="appointment-dialog-title">
      <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] bg-white p-6 shadow-2xl shadow-ink/20 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal">Appointment details</p>
            <h2 id="appointment-dialog-title" className="mt-2 text-3xl font-semibold tracking-tight text-ink">{appointment.patientName}</h2>
          </div>
          <button type="button" onClick={onClose} className="rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink hover:bg-sky">
            Close
          </button>
        </div>

        <div className="mt-6 grid gap-3 text-sm text-muted sm:grid-cols-2">
          <Detail label="Phone" value={appointment.phone} />
          <Detail label="Email" value={appointment.email || "Not provided"} />
          <Detail label="Department" value={appointment.department} />
          <Detail label="Preferred date" value={`${formatDate(appointment.preferredDate)}${appointment.preferredTime ? `, ${appointment.preferredTime}` : ""}`} />
          <Detail label="Requested" value={formatDate(appointment.createdAt)} />
          <Detail label="Current status" value={appointment.status} />
        </div>

        {appointment.message && (
          <div className="mt-5 rounded-2xl bg-background p-4">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">Patient message</p>
            <p className="mt-2 text-sm leading-6 text-ink">{appointment.message}</p>
          </div>
        )}

        <form action={updateAction} className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm font-medium text-ink">
            Status
            <select name="status" defaultValue={appointment.status} className="rounded-2xl border border-line bg-background px-4 py-3 outline-none focus:border-medical-blue">
              {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-medium text-ink">
            Internal notes
            <textarea name="internalNotes" defaultValue={appointment.internalNotes || ""} rows={4} className="resize-none rounded-2xl border border-line bg-background px-4 py-3 outline-none focus:border-medical-blue" />
          </label>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white hover:bg-medical-blue">Update request</button>
          </div>
        </form>

        <form action={deleteAppointmentAction} className="mt-3">
          <input type="hidden" name="id" value={appointment.id} />
          <button className="rounded-full border border-red-200 px-5 py-3 text-sm font-semibold text-red-600 hover:bg-red-50">Delete spam/invalid request</button>
        </form>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-line bg-white px-4 py-3">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">{label}</p>
      <p className="mt-1 font-medium text-ink">{value}</p>
    </div>
  );
}
