import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink text-lg font-bold text-white">
              SS
            </span>
            <div>
              <p className="font-semibold text-ink">Shree Shivaya Hospital</p>
              <p className="text-sm text-muted">Modern care with compassion.</p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-6 text-muted">
            Dependable healthcare, attentive staff, and facilities designed for patient comfort and safety.
          </p>
        </div>
        <div>
          <p className="font-semibold text-ink">Quick Links</p>
          <div className="mt-4 grid gap-2 text-sm text-muted">
            <Link href="/#services" className="hover:text-medical-blue">Services</Link>
            <Link href="/#facilities" className="hover:text-medical-blue">Facilities</Link>
            <Link href="/blog" className="hover:text-medical-blue">Health Blog</Link>
            <Link href="/admin" className="hover:text-medical-blue">Admin</Link>
          </div>
        </div>
        <div>
          <p className="font-semibold text-ink">Contact</p>
          <div className="mt-4 space-y-2 text-sm text-muted">
            <p>Phone: +91 98765 43210</p>
            <p>Emergency: +91 91234 56780</p>
            <p>Address to be confirmed</p>
          </div>
        </div>
      </div>
      <div className="border-t border-line px-4 py-5 text-center text-xs text-muted">
        © {new Date().getFullYear()} Shree Shivaya Hospital. All rights reserved.
      </div>
    </footer>
  );
}
