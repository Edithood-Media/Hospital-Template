import { StaffCard } from "@/components/staff-card";
import { doctors } from "@/lib/site-data";

export function StaffCarousel() {
  const items = [...doctors, ...doctors];

  return (
    <div className="relative mt-12 overflow-hidden py-8">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white to-transparent sm:w-16" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent sm:w-16" />
      <div className="staff-marquee flex w-max gap-8">
        {items.map((doctor, index) => (
          <StaffCard key={`${doctor.name}-${index}`} {...doctor} />
        ))}
      </div>
    </div>
  );
}
