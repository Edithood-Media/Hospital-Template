"use client";

import { useActionState } from "react";

import { loginAction } from "@/app/admin/actions";

export function LoginForm() {
  const [state, action, isPending] = useActionState(loginAction, {});

  return (
    <form action={action} className="w-full max-w-md rounded-[2rem] border border-line bg-white p-8 shadow-2xl shadow-medical-blue/10">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal">Admin Login</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-ink">Manage hospital content</h1>
      <p className="mt-3 text-sm leading-6 text-muted">Sign in to view appointment requests and publish blog posts.</p>

      <div className="mt-8 space-y-4">
        <label className="grid gap-1 text-sm font-medium text-ink">
          Email
          <input name="email" type="email" required className="rounded-2xl border border-line bg-background px-4 py-3 outline-none focus:border-medical-blue" />
        </label>
        <label className="grid gap-1 text-sm font-medium text-ink">
          Password
          <input name="password" type="password" required className="rounded-2xl border border-line bg-background px-4 py-3 outline-none focus:border-medical-blue" />
        </label>
      </div>

      {state.message && <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{state.message}</p>}

      <button disabled={isPending} className="mt-6 w-full rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white hover:bg-medical-blue disabled:opacity-60">
        {isPending ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
