import Image from "next/image";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  AmbulanceIcon,
  Calendar03Icon,
  ClinicIcon,
  Doctor01Icon,
  FirstAidKitIcon,
  HeartCheckIcon,
  HospitalBed01Icon,
  Shield01Icon,
  TelephoneIcon,
  TestTube01Icon,
} from "@hugeicons/core-free-icons";

import { AppointmentForm } from "@/components/appointment-form";
import { FacilitiesCarousel } from "@/components/facilities-carousel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StaffCarousel } from "@/components/staff-carousel";
import { getHomepageFacilities, getHomepageServices, getHomepageStaffProfiles, getLatestPublishedPosts } from "@/lib/data";

const serviceIcons = [FirstAidKitIcon, Doctor01Icon, ClinicIcon, HeartCheckIcon, TestTube01Icon, Calendar03Icon];
const serviceIconMap = {
  "first-aid": FirstAidKitIcon,
  doctor: Doctor01Icon,
  clinic: ClinicIcon,
  heart: HeartCheckIcon,
  "test-tube": TestTube01Icon,
  calendar: Calendar03Icon,
};

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded-full border border-line bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-medical-blue">
      {children}
    </span>
  );
}

export default async function Home() {
  const [posts, services, facilities, staff] = await Promise.all([
    getLatestPublishedPosts(3),
    getHomepageServices(),
    getHomepageFacilities(),
    getHomepageStaffProfiles(),
  ]);

  return (
    <>
      <SiteHeader />
      <main>
        <section className="medical-grid px-4 pb-4 pt-6 sm:px-6 sm:pb-16 sm:pt-8 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-[1.75rem] bg-ink p-3 shadow-2xl shadow-medical-blue/20 sm:rounded-[3rem] sm:p-4">
              <Image
                src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1800&q=85"
                alt="Modern hospital care team corridor"
                width={1800}
                height={1000}
                priority
                className="absolute inset-0 h-full w-full object-cover opacity-65"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-medical-blue/55 via-ink/35 to-ink/75" />
              <div className="relative flex min-h-[560px] items-center px-4 py-10 text-white sm:block sm:min-h-[620px] sm:px-10 sm:py-8 lg:px-14">
                <div className="hidden flex-wrap items-center justify-between gap-4 sm:flex">
                  <div className="flex flex-wrap gap-2">
                    {['24/7 Emergency', 'Diagnostics', 'Patient Rooms'].map((item) => (
                      <span key={item} className="rounded-full border border-white/35 bg-white/10 px-4 py-2 text-xs font-medium backdrop-blur">
                        {item}
                      </span>
                    ))}
                  </div>
                  <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink">Trusted Local Care</span>
                </div>

                <div className="mx-auto max-w-4xl text-center sm:mt-24">
                  <p className="absolute left-1/2 top-10 w-full -translate-x-1/2 px-4 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-sky sm:static sm:w-auto sm:translate-x-0 sm:px-0 sm:py-0 sm:text-sm sm:tracking-[0.25em]">Shree Shivaya Hospital</p>
                  <h1 className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 px-5 text-balance text-4xl font-semibold leading-[1.06] tracking-[-0.06em] sm:static sm:mt-5 sm:w-auto sm:translate-x-0 sm:translate-y-0 sm:px-0 sm:text-7xl sm:leading-none lg:text-8xl">
                    Modern Healthcare with Compassion at Its Core
                  </h1>
                  <p className="absolute left-1/2 top-[calc(50%+6.75rem)] mx-auto w-full max-w-2xl -translate-x-1/2 px-8 py-4 text-balance text-sm leading-6 text-white/85 sm:static sm:mt-6 sm:w-auto sm:translate-x-0 sm:px-0 sm:py-0 sm:text-lg sm:leading-7">
                    Dependable care, attentive staff, and facilities designed for patient comfort, clarity, and safety.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:hidden">
              <a
                href="tel:+919123456780"
                className="group inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-ink px-3 py-3 text-center text-xs font-semibold text-white shadow-xl shadow-medical-blue/15 transition active:scale-[0.98]"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-red-50 text-red-600 transition group-active:scale-95">
                  <HugeiconsIcon icon={AmbulanceIcon} size={18} strokeWidth={1.9} />
                </span>
                <span className="leading-tight">Call for Ambulance</span>
              </a>
              <a
                href="tel:+919876543210"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl border border-line bg-white px-3 py-3 text-center text-xs font-semibold text-ink shadow-xl shadow-medical-blue/10 transition active:scale-[0.98]"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sky text-medical-blue">
                  <HugeiconsIcon icon={TelephoneIcon} size={18} strokeWidth={1.9} />
                </span>
                <span className="leading-tight">Contact Reception</span>
              </a>
            </div>
          </div>
        </section>

        <section id="about" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <SectionEyebrow>About Us</SectionEyebrow>
              <h2 className="mt-6 text-balance text-3xl font-semibold leading-[1.08] tracking-[-0.05em] text-ink sm:text-6xl sm:leading-none">
                Care that feels clear, close, and dependable.
              </h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-[2rem] bg-white p-7 shadow-xl shadow-medical-blue/5">
                <p className="text-3xl font-semibold text-medical-blue">24/7</p>
                <p className="mt-3 text-sm leading-6 text-muted">Emergency support and timely guidance for urgent situations.</p>
              </div>
              <div className="rounded-[2rem] bg-sky p-7">
                <p className="text-3xl font-semibold text-medical-blue">Easy</p>
                <p className="mt-3 text-sm leading-6 text-muted">Simple appointment requests with a team follow-up workflow.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="bg-white px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <SectionEyebrow>Services</SectionEyebrow>
                <h2 className="mt-6 max-w-3xl text-balance text-4xl font-semibold tracking-[-0.05em] text-ink sm:text-6xl">
                  Essential hospital care, explained simply.
                </h2>
              </div>
              <Link href="#appointment" className="w-fit rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white hover:bg-medical-blue">
                Book a Visit
              </Link>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <article
                  key={service.title}
                  className={`relative overflow-hidden rounded-[2rem] border border-white/60 p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.75),inset_0_-1px_0_rgba(0,0,0,0.10),0_16px_34px_rgba(0,0,0,0.08)] ring-1 ring-white/50 ${
                    service.image
                      ? "bg-ink text-white"
                      : "bg-background"
                  }`}
                >
                  {service.image && (
                    <>
                      <Image src={service.image} alt="" fill className="object-cover opacity-85" />
                      <div className="absolute inset-0 bg-black/20" />
                    </>
                  )}
                  <div className="relative flex items-center gap-4">
                    <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-sm font-bold shadow-sm ${service.image ? "bg-black/55 text-sky ring-1 ring-white/15" : "bg-white text-medical-blue"}`}>
                      <HugeiconsIcon icon={serviceIconMap[service.iconKey as keyof typeof serviceIconMap] ?? serviceIcons[index] ?? ClinicIcon} size={24} strokeWidth={1.7} />
                    </span>
                    <h3 className={`text-2xl font-semibold tracking-tight ${service.image ? "text-white" : "text-ink"}`}>{service.title}</h3>
                  </div>
                  <p className={`relative mt-3 text-sm leading-6 ${service.image ? "text-white/80" : "text-muted"}`}>{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="facilities" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-white p-5 shadow-2xl shadow-medical-blue/10 sm:p-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <SectionEyebrow>Facilities</SectionEyebrow>
                <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] text-ink sm:text-5xl">Explore Our Facilities</h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-muted">A calm environment supported by practical amenities for patients and families.</p>
            </div>
            <FacilitiesCarousel facilities={facilities} />
          </div>
        </section>

        <section id="doctors" className="bg-white px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-4xl text-center">
              <SectionEyebrow>Staff</SectionEyebrow>
              <h2 className="mt-6 text-balance text-4xl font-semibold tracking-[-0.05em] text-ink sm:text-6xl">
                People who make care feel human.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted">
                A calm, capable care team represented in horizontal profile cards that keep the section alive without making the page feel busy.
              </p>
            </div>
            <StaffCarousel staff={staff} />
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
            {[
              { label: 'Experienced medical professionals', icon: Doctor01Icon },
              { label: 'Transparent communication', icon: Shield01Icon },
              { label: 'Clean and comfortable care', icon: HospitalBed01Icon },
            ].map((item) => (
              <div key={item.label} className="rounded-[2rem] bg-ink p-7 text-white">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-sky">
                    <HugeiconsIcon icon={item.icon} size={24} strokeWidth={1.7} />
                  </span>
                  <p className="text-xl font-semibold tracking-tight">{item.label}</p>
                </div>
                <p className="mt-4 text-sm leading-6 text-white/70">A hospital experience shaped around patient confidence, family clarity, and timely support.</p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden bg-white px-4 py-20 sm:px-6 lg:px-8">
          <div className="absolute -right-20 top-0 h-80 w-80 rounded-bl-[10rem] bg-sky/45" />
          <div className="absolute right-10 top-40 h-14 w-14 rounded-full bg-teal/10" />
          <div className="absolute right-8 top-20 text-4xl font-semibold text-teal/10">+</div>
          <div className="absolute right-16 top-44 text-teal/20">
            <HugeiconsIcon icon={HeartCheckIcon} size={76} strokeWidth={1.4} />
          </div>
          <div className="absolute bottom-36 right-12 text-5xl font-semibold text-teal/10">+</div>
          <div className="mx-auto max-w-7xl">
            <div className="relative max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-teal/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-teal">
                  <HugeiconsIcon icon={ClinicIcon} size={16} strokeWidth={1.8} />
                  Health Blog
                </span>
                <h2 className="mt-6 text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.05em] text-ink sm:text-6xl">
                  Helpful reads for <span className="text-teal">better</span> decisions.
                </h2>
                <p className="mt-5 max-w-md text-sm leading-6 text-muted sm:text-base">
                  Expert tips, practical guides and health insights for a better tomorrow.
                </p>
                <Link href="/blog" className="mt-7 inline-flex w-fit items-center gap-3 rounded-full border border-teal/40 bg-white px-5 py-3 text-sm font-semibold text-teal shadow-sm transition hover:border-teal hover:bg-sky">
                  View All Blogs
                  <span aria-hidden="true">-&gt;</span>
                </Link>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group overflow-hidden rounded-[2rem] border border-line bg-background transition hover:-translate-y-1">
                  <div className="relative h-52 bg-sky">
                    {post.featuredImage && <Image src={post.featuredImage} alt={post.title} fill className="object-cover" />}
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">{post.category}</p>
                    <h3 className="mt-3 text-xl font-semibold tracking-tight text-ink">{post.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted">{post.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="appointment" className="medical-grid px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <SectionEyebrow>Appointment</SectionEyebrow>
              <h2 className="mt-6 text-balance text-4xl font-semibold tracking-[-0.05em] text-ink sm:text-6xl">
                Request a consultation in under a minute.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-muted">
                Share your details and preferred department. The hospital team can review the request from the admin panel and follow up.
              </p>
            </div>
            <AppointmentForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
