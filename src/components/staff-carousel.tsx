"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Calendar03Icon } from "@hugeicons/core-free-icons";

import ProfileCard from "@/components/profile-card/ProfileCard";
import { doctors } from "@/lib/site-data";

export function StaffCarousel() {
  const items = [...doctors, ...doctors];

  return (
    <div className="relative mt-12 overflow-hidden py-8">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white to-transparent sm:w-16" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent sm:w-16" />
      <div className="staff-marquee flex w-max gap-6">
        {items.map((doctor, index) => (
          <div key={`${doctor.name}-${index}`} className="w-[300px] shrink-0">
            <ProfileCard
              avatarUrl={doctor.image}
              miniAvatarUrl={doctor.image}
              name={doctor.name}
              title={doctor.role}
              handle={doctor.handle}
              status={doctor.status}
              contactText="Book Visit"
              enableTilt
              enableMobileTilt={false}
              innerGradient="linear-gradient(145deg, rgba(11,79,138,0.96) 0%, rgba(58,183,165,0.56) 100%)"
              behindGlowColor="rgba(58, 183, 165, 0.38)"
              onContactClick={() => {
                window.location.hash = "appointment";
              }}
            />
            <div className="mt-4 rounded-[1.5rem] border border-line bg-background p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-medical-blue">
                <HugeiconsIcon icon={Calendar03Icon} size={18} strokeWidth={1.8} />
                {doctor.status}
              </div>
              <p className="mt-3 text-sm leading-6 text-muted">{doctor.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
