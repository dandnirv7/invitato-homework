"use client";

import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { useInvitation } from "../i18n/invitation-provider";
import { wedding } from "../lib/wedding-data";
import { Reveal } from "./reveal";

const TARGET_MS = wedding.akadEpoch * 1000;

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function diff(): TimeLeft {
  const totalSeconds = Math.max(0, Math.floor((TARGET_MS - Date.now()) / 1000));
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

export function SectionCountdown() {
  const { t } = useInvitation();
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const tick = () => setTimeLeft(diff());
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 1000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, []);

  const units = [
    { key: "days", label: t.countdown.days, value: timeLeft?.days },
    { key: "hours", label: t.countdown.hours, value: timeLeft?.hours },
    { key: "minutes", label: t.countdown.minutes, value: timeLeft?.minutes },
    { key: "seconds", label: t.countdown.seconds, value: timeLeft?.seconds },
  ];

  return (
    <section
      id="countdown"
      className="bg-bg-overlay relative h-[260px] overflow-hidden md:h-[333.3px]"
    >
      <Image
        src="/assets/gallery-main.jpg"
        alt=""
        fill
        sizes="(min-width: 768px) 500px, 100vw"
        className="object-cover grayscale-85"
      />
      <Image
        src="/assets/curve.png"
        alt=""
        width={675}
        height={448}
        aria-hidden
        className="pointer-events-none absolute -top-[53.3px] left-0 w-full max-w-none opacity-80 md:-left-[50px] md:w-[675px]"
      />

      <Reveal className="relative flex h-full flex-col items-center text-center">
        <p className="font-heading text-h5 text-text-alt mt-[18.8px] leading-[20px] tracking-[1px] md:mt-[31.4px]">
          {t.countdown.title}
        </p>

        <div className="mt-3 flex items-start justify-center gap-[9px] md:mt-[30px] md:gap-3">
          {units.map((unit, i) => (
            <Fragment key={unit.key}>
              {i > 0 ? (
                <span
                  aria-hidden
                  className="font-body text-text-alt mt-[26.8px] text-[26px] leading-[39px] font-bold"
                >
                  :
                </span>
              ) : null}
              <div className="flex flex-col text-center">
                <span className="font-body text-count text-text-alt leading-[81px] font-bold">
                  {unit.value ?? "\u00A0"}
                </span>
                <span className="font-body text-body-2 text-text-alt leading-[25.5px] font-medium">
                  {unit.label}
                </span>
              </div>
            </Fragment>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
