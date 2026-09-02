"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import { useCountdown } from "../hooks/use-countdown";
import { WEDDING_CONFIG, WEDDING_DATE } from "../lib/constants";
import { SectionReveal } from "./section-reveal";

interface CountdownUnitProps {
  value: number | string;
  label: string;
}

function CountdownUnit({ value, label }: CountdownUnitProps) {
  const display = String(value).padStart(2, "0");

  return (
    <div className="flex w-16 flex-col items-center">
      <span className="font-heading text-text-alt text-3xl">{display}</span>
      <span className="font-body text-text-alt/80 mt-1 text-[0.65rem] tracking-[0.2em] uppercase">
        {label}
      </span>
    </div>
  );
}

export function CountdownSection() {
  const { days, hours, minutes, seconds, isExpired } =
    useCountdown(WEDDING_DATE);
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );

  return (
    <section
      className="relative overflow-hidden"
      aria-label="Hitung mundur acara"
    >
      <Image
        src="/assets/counting-days-landscape.png"
        alt=""
        fill
        sizes="(max-width: 640px) 100vw, 448px"
        className="object-cover grayscale"
      />
      <div className="bg-bg-overlay/60 absolute inset-0" aria-hidden />
      <div className="relative flex flex-col items-center px-6 py-14 text-center">
        <SectionReveal>
          <p className="font-body text-text-alt text-xs tracking-[0.35em] uppercase">
            Menghitung Hari
          </p>
          {mounted ? (
            isExpired ? (
              <p className="font-heading text-text-alt mt-6 text-2xl">
                Hari Bahagia Telah Tiba
              </p>
            ) : (
              <div className="mt-6 flex items-start justify-center gap-4 sm:gap-8">
                <CountdownUnit value={days} label="Hari" />
                <CountdownUnit value={hours} label="Jam" />
                <CountdownUnit value={minutes} label="Menit" />
                <CountdownUnit value={seconds} label="Detik" />
              </div>
            )
          ) : (
            <div
              className="mt-6 flex items-start justify-center gap-4 sm:gap-8"
              aria-hidden
            >
              <CountdownUnit value="--" label="Hari" />
              <CountdownUnit value="--" label="Jam" />
              <CountdownUnit value="--" label="Menit" />
              <CountdownUnit value="--" label="Detik" />
            </div>
          )}
          <p className="font-body text-text-alt/80 mt-6 text-base">
            {WEDDING_CONFIG.dateDisplay}
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
