"use client";

import { useState, useTransition } from "react";

import { departments } from "@/lib/site-data";

export function AppointmentForm({ compact = false }: { compact?: boolean }) {
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function submit(formData: FormData) {
    setMessage(null);
    startTransition(async () => {
      const payload = Object.fromEntries(formData.entries());
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setMessage("Appointment request sent. Our team will contact you shortly.");
        const form = document.getElementById("appointment-form") as HTMLFormElement | null;
        form?.reset();
        return;
      }

      setMessage("Please check the details and try again.");
    });
  }

  return (
    <form
      id="appointment-form"
      action={submit}
      className={`rounded-[2rem] border border-line bg-white p-5 shadow-2xl shadow-medical-blue/10 ${
        compact ? "space-y-3" : "space-y-4"
      }`}
    >
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal">Book Appointment</p>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-ink">Tell us how we can help</h3>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm font-medium text-ink">
          Patient name
          <input name="patientName" required className="rounded-2xl border border-line bg-background px-4 py-3 outline-none transition focus:border-medical-blue" />
        </label>
        <label className="grid gap-1 text-sm font-medium text-ink">
          Phone number
          <input name="phone" required className="rounded-2xl border border-line bg-background px-4 py-3 outline-none transition focus:border-medical-blue" />
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm font-medium text-ink">
          Department
          <select name="department" required className="rounded-2xl border border-line bg-background px-4 py-3 outline-none transition focus:border-medical-blue">
            <option value="">Select department</option>
            {departments.map((department) => (
              <option key={department} value={department}>{department}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-1 text-sm font-medium text-ink">
          Preferred date
          <input type="date" name="preferredDate" required className="rounded-2xl border border-line bg-background px-4 py-3 outline-none transition focus:border-medical-blue" />
        </label>
      </div>

      {!compact && (
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="grid gap-1 text-sm font-medium text-ink">
            Email optional
            <input type="email" name="email" className="rounded-2xl border border-line bg-background px-4 py-3 outline-none transition focus:border-medical-blue" />
          </label>
          <label className="grid gap-1 text-sm font-medium text-ink">
            Preferred time optional
            <input name="preferredTime" placeholder="10:30 AM" className="rounded-2xl border border-line bg-background px-4 py-3 outline-none transition focus:border-medical-blue" />
          </label>
        </div>
      )}

      <label className="grid gap-1 text-sm font-medium text-ink">
        Message optional
        <textarea name="message" rows={compact ? 2 : 4} className="resize-none rounded-2xl border border-line bg-background px-4 py-3 outline-none transition focus:border-medical-blue" />
      </label>

      <label className="flex gap-3 text-sm leading-6 text-muted">
        <input name="consent" type="checkbox" required className="mt-1 h-4 w-4 rounded border-line" />
        I allow Shree Shivaya Hospital to contact me about this appointment request.
      </label>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-medical-blue disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Sending..." : "Submit Request"}
      </button>

      {message && <p className="rounded-2xl bg-sky px-4 py-3 text-sm font-medium text-medical-blue">{message}</p>}
    </form>
  );
}
