import Link from "next/link";
import { redirect } from "next/navigation";

import { LoginForm } from "@/app/admin/login/login-form";
import { getSession } from "@/lib/auth";

export default async function AdminLoginPage() {
  const session = await getSession();
  if (session) redirect("/admin");

  return (
    <main className="medical-grid flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-5xl">
        <Link href="/" className="mb-8 inline-flex rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-muted hover:bg-sky">
          Back to website
        </Link>
        <LoginForm />
      </div>
    </main>
  );
}
