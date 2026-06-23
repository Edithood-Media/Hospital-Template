"use client";

import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { CheckmarkBadge02Icon, UserIdVerificationIcon } from "@hugeicons/core-free-icons";

type StaffCardProps = {
  name: string;
  role: string;
  detail: string;
  image: string;
  status: string;
};

export function StaffCard({ name, role, detail, image, status }: StaffCardProps) {
  return (
    <article className="group w-[250px] shrink-0 rounded-[1.75rem] border border-white/80 bg-white p-2.5 shadow-[0_18px_54px_rgba(15,23,42,0.1)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(11,79,138,0.18)] sm:w-[280px] sm:rounded-[2rem] md:w-[320px] md:rounded-[2.3rem] md:p-3">
      <div className="relative h-[235px] overflow-hidden rounded-[1.35rem] bg-sky sm:h-[270px] sm:rounded-[1.6rem] md:h-[320px] md:rounded-[1.85rem]">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 250px, (max-width: 768px) 280px, 320px"
          className="object-cover object-top transition duration-500 group-hover:scale-[1.035]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/55 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
      </div>

      <div className="px-4 pb-4 pt-5 sm:px-5 sm:pb-5 sm:pt-6 md:pt-7">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <h3 className="text-xl font-semibold tracking-[-0.045em] text-ink sm:text-[1.35rem] md:text-2xl">{name}</h3>
          <span className="grid h-7 w-7 place-items-center rounded-full bg-[#32d74b] text-white shadow-[inset_0_-2px_6px_rgba(0,0,0,0.18)] md:h-8 md:w-8">
            <HugeiconsIcon icon={CheckmarkBadge02Icon} size={19} strokeWidth={2.2} />
          </span>
        </div>
        <p className="mt-2.5 line-clamp-3 min-h-[66px] text-sm leading-[1.55rem] text-muted sm:min-h-[74px] sm:text-[0.95rem] md:mt-3 md:min-h-[84px] md:text-base md:leading-7">{role}. {detail}</p>

        <div className="mt-5 flex items-center justify-between gap-3 md:mt-7 md:gap-4">
          <div className="flex min-w-0 items-center gap-4 text-xs font-semibold text-ink sm:text-sm">
            <span className="inline-flex min-w-0 items-center gap-1.5">
              <HugeiconsIcon icon={UserIdVerificationIcon} size={16} strokeWidth={1.7} className="shrink-0 text-muted sm:size-[18px]" />
              <span className="truncate">{status}</span>
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              window.location.hash = "appointment";
            }}
            className="inline-flex cursor-pointer items-center rounded-full bg-white px-4 py-2.5 text-xs font-semibold text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_10px_28px_rgba(15,23,42,0.14)] ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:bg-ink hover:text-white sm:px-5 sm:py-3 sm:text-sm"
          >
            Book
          </button>
        </div>
      </div>
    </article>
  );
}
