"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  AmbulanceIcon,
  ArrowLeft02Icon,
  ArrowRight02Icon,
  BedIcon,
  Building03Icon,
  CarParking01Icon,
  CleanIcon,
  Hospital01Icon,
  MedicineBottle01Icon,
  TestTube01Icon,
  XRayIcon,
} from "@hugeicons/core-free-icons";

type FacilityItem = {
  id: string;
  title: string;
  label: string;
  image: string;
  iconKey: string;
};

const facilityIcons = {
  ambulance: AmbulanceIcon,
  bed: BedIcon,
  hospital: Hospital01Icon,
  medicine: MedicineBottle01Icon,
  lab: TestTube01Icon,
  xray: XRayIcon,
  clean: CleanIcon,
  parking: CarParking01Icon,
  building: Building03Icon,
};

export function FacilitiesCarousel({ facilities }: { facilities: FacilityItem[] }) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const dragState = useRef({ isDown: false, startX: 0, scrollLeft: 0 });
  const [isDragging, setIsDragging] = useState(false);

  function scrollByCards(direction: "prev" | "next") {
    const element = scrollRef.current;
    if (!element) return;

    const cardWidth = element.querySelector<HTMLElement>("[data-facility-card]")?.offsetWidth ?? element.clientWidth / 4;
    element.scrollBy({ left: direction === "next" ? cardWidth + 16 : -(cardWidth + 16), behavior: "smooth" });
  }

  return (
    <div className="mt-10">
      <div className="mb-5 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => scrollByCards("prev")}
          className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-line bg-background text-ink transition hover:bg-ink hover:text-white"
          aria-label="Previous facilities"
        >
          <HugeiconsIcon icon={ArrowLeft02Icon} size={20} strokeWidth={1.8} />
        </button>
        <button
          type="button"
          onClick={() => scrollByCards("next")}
          className="grid h-11 w-11 cursor-pointer place-items-center rounded-full bg-ink text-white transition hover:bg-medical-blue"
          aria-label="Next facilities"
        >
          <HugeiconsIcon icon={ArrowRight02Icon} size={20} strokeWidth={1.8} />
        </button>
      </div>

      <div
        ref={scrollRef}
        className={`scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 ${
          isDragging ? "cursor-grabbing select-none" : "cursor-grab"
        }`}
        onPointerDown={(event) => {
          const element = scrollRef.current;
          if (!element) return;
          dragState.current = { isDown: true, startX: event.clientX, scrollLeft: element.scrollLeft };
          setIsDragging(true);
          element.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          const element = scrollRef.current;
          if (!element || !dragState.current.isDown) return;
          const walk = event.clientX - dragState.current.startX;
          element.scrollLeft = dragState.current.scrollLeft - walk;
        }}
        onPointerUp={(event) => {
          const element = scrollRef.current;
          dragState.current.isDown = false;
          setIsDragging(false);
          element?.releasePointerCapture(event.pointerId);
        }}
        onPointerLeave={() => {
          dragState.current.isDown = false;
          setIsDragging(false);
        }}
      >
        {facilities.map((facility) => (
          <article
            data-facility-card
            key={facility.title}
            className="group relative min-h-80 shrink-0 basis-[88%] snap-start overflow-hidden rounded-[2rem] bg-ink sm:basis-[48%] lg:basis-[calc((100%_-_3rem)/4)]"
          >
            <Image
              src={facility.image}
              alt={facility.title}
              width={900}
              height={1100}
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
            <div className="relative flex h-full min-h-80 flex-col justify-between p-5 text-white">
              <span className="w-fit rounded-full border border-white/40 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
                {facility.label}
              </span>
              <div>
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-medical-blue">
                  <HugeiconsIcon icon={facilityIcons[facility.iconKey as keyof typeof facilityIcons] ?? Building03Icon} size={24} strokeWidth={1.7} />
                </span>
                <h3 className="text-2xl font-semibold tracking-tight">{facility.title}</h3>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
