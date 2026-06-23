import Image from "next/image";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Calendar03Icon,
  ClinicIcon,
  Doctor01Icon,
  FirstAidKitIcon,
  HeartCheckIcon,
  HospitalBed01Icon,
  Shield01Icon,
  TestTube01Icon,
} from "@hugeicons/core-free-icons";

import { AppointmentForm } from "@/components/appointment-form";
import { FacilitiesCarousel } from "@/components/facilities-carousel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StaffCarousel } from "@/components/staff-carousel";
import { getLatestPublishedPosts } from "@/lib/data";
import { services } from "@/lib/site-data";

const serviceIcons = [FirstAidKitIcon, Doctor01Icon, ClinicIcon, HeartCheckIcon, TestTube01Icon, Calendar03Icon];

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded-full border border-line bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-medical-blue">
      {children}
    </span>
  );
}

export default async function Home() {
  const posts = await getLatestPublishedPosts(3);

  return (
    <>
      <SiteHeader />
      <main>
        <section className="medical-grid px-4 pb-16 pt-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-[2rem] bg-ink p-4 shadow-2xl shadow-medical-blue/20 sm:rounded-[3rem]">
              <Image
                src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1800&q=85"
                alt="Modern hospital care team corridor"
                width={1800}
                height={1000}
                priority
                className="absolute inset-0 h-full w-full object-cover opacity-65"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-medical-blue/55 via-ink/35 to-ink/75" />
              <div className="relative min-h-[620px] px-5 py-8 text-white sm:px-10 lg:px-14">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {['24/7 Emergency', 'Diagnostics', 'Patient Rooms'].map((item) => (
                      <span key={item} className="rounded-full border border-white/35 bg-white/10 px-4 py-2 text-xs font-medium backdrop-blur">
                        {item}
                      </span>
                    ))}
                  </div>
                  <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink">Trusted Local Care</span>
                </div>

                <div className="mx-auto mt-20 max-w-4xl text-center sm:mt-24">
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky">Shree Shivaya Hospital</p>
                  <h1 className="mt-5 text-balance text-5xl font-semibold tracking-[-0.06em] sm:text-7xl lg:text-8xl">
                    Modern Healthcare with Compassion at Its Core
                  </h1>
                  <p className="mx-auto mt-6 max-w-2xl text-balance text-base leading-7 text-white/85 sm:text-lg">
                    Dependable care, attentive staff, and facilities designed for patient comfort, clarity, and safety.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <SectionEyebrow>About Us</SectionEyebrow>
              <h2 className="mt-6 text-balance text-4xl font-semibold tracking-[-0.05em] text-ink sm:text-6xl">
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
                <article key={service.title} className="group rounded-[2rem] border border-line bg-background p-7 transition hover:-translate-y-1 hover:border-sky hover:bg-sky/60">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-sm font-bold text-medical-blue shadow-sm">
                    <HugeiconsIcon icon={serviceIcons[index] ?? ClinicIcon} size={24} strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-8 text-2xl font-semibold tracking-tight text-ink">{service.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{service.description}</p>
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
            <FacilitiesCarousel />
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
            <StaffCarousel />
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
                <span className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-sky">
                  <HugeiconsIcon icon={item.icon} size={24} strokeWidth={1.7} />
                </span>
                <p className="text-2xl font-semibold tracking-tight">{item.label}</p>
                <p className="mt-4 text-sm leading-6 text-white/70">A hospital experience shaped around patient confidence, family clarity, and timely support.</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <SectionEyebrow>Health Blog</SectionEyebrow>
                <h2 className="mt-6 text-4xl font-semibold tracking-[-0.05em] text-ink sm:text-6xl">Helpful reads for better decisions.</h2>
              </div>
              <Link href="/blog" className="w-fit rounded-full border border-line bg-background px-5 py-3 text-sm font-semibold text-ink hover:bg-sky">View Blog</Link>
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
