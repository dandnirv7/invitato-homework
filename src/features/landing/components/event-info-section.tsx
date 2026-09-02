"use client";

import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { WEDDING_CONFIG } from "../lib/constants";
import { SectionReveal } from "./section-reveal";

export function EventInfoSection() {
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    "The Wedding of Ricky & Fellycia"
  )}&dates=20241226T040000Z/20241226T140000Z&details=${encodeURIComponent(
    "Pemberkatan (11.00 WIB) & Resepsi (18.00 WIB) Ricky & Fellycia"
  )}&location=${encodeURIComponent(WEDDING_CONFIG.reception.venueAddress)}`;

  return (
    <section id="events" className="bg-bg-primary px-6 py-16 text-center">
      <SectionReveal className="flex flex-col items-center">
        <p className="font-body text-text-main mx-auto max-w-xs text-base leading-relaxed">
          memohon kehadiran Bapak/Ibu/Saudara/i pada acara pernikahan kami:
        </p>

        {/* Vertical Timeline Track */}
        <div className="my-8 h-12 w-px bg-text-main/40" aria-hidden />

        {/* Event Date */}
        <p className="font-body text-text-muted text-sm">Tanggal:</p>
        <h3 className="font-heading text-text-main mt-1 text-2xl font-normal tracking-wide sm:text-3xl">
          {WEDDING_CONFIG.dateDisplay}
        </h3>

        <div className="my-8 h-12 w-px bg-text-main/40" aria-hidden />

        {/* Pemberkatan / Holy Matrimony */}
        <div className="flex flex-col items-center">
          <div className="relative size-12 opacity-80">
            <Image
              src="/assets/ring.svg"
              alt="Cincin Pernikahan"
              fill
              className="object-contain"
            />
          </div>

          <p className="font-body text-text-muted mt-3 text-sm">
            {WEDDING_CONFIG.ceremony.title}:
          </p>
          <p className="font-heading text-text-main text-3xl font-light">
            {WEDDING_CONFIG.ceremony.timeDisplay}
          </p>

          <p className="font-heading text-text-main mt-4 text-base font-semibold">
            {WEDDING_CONFIG.ceremony.venueName}
          </p>
          <p className="font-body text-text-main/80 mx-auto mt-1 max-w-xs text-sm">
            {WEDDING_CONFIG.ceremony.venueAddress}
          </p>
        </div>

        <div className="my-8 h-12 w-px bg-text-main/40" aria-hidden />

        {/* Resepsi / Reception */}
        <div className="flex flex-col items-center">
          <div className="relative size-12 opacity-80">
            <Image
              src="/assets/wine.svg"
              alt="Gelas Resepsi"
              fill
              className="object-contain"
            />
          </div>

          <p className="font-body text-text-muted mt-3 text-sm">
            {WEDDING_CONFIG.reception.title}:
          </p>
          <p className="font-heading text-text-main text-3xl font-light">
            {WEDDING_CONFIG.reception.timeDisplay}
          </p>

          <p className="font-heading text-text-main mt-4 text-base font-semibold">
            {WEDDING_CONFIG.reception.venueName}
          </p>
          <p className="font-body text-text-main/80 mx-auto mt-1 max-w-xs text-sm">
            {WEDDING_CONFIG.reception.venueAddress}
          </p>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={WEDDING_CONFIG.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "default", size: "sm" }),
                "bg-[#6c7278] text-text-alt font-body hover:bg-[#5a6066] inline-flex h-9 items-center gap-2 rounded-[4px] px-5 text-sm shadow-xs transition-colors"
              )}
            >
              <MapPin className="size-3.5" />
              Lihat Lokasi
            </a>

            <a
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "default", size: "sm" }),
                "bg-[#6c7278] text-text-alt font-body hover:bg-[#5a6066] inline-flex h-9 items-center gap-2 rounded-[4px] px-5 text-sm shadow-xs transition-colors"
              )}
            >
              <Calendar className="size-3.5" />
              Simpan ke Kalender
            </a>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
