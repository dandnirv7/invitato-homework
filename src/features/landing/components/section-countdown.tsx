"use client";

import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { useInvitation } from "../i18n/invitation-provider";
import { wedding } from "../lib/wedding-data";
import { Reveal } from "./reveal";
import { templateButtonClass } from "./template-button";

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

/** Google Calendar expects UTC in `YYYYMMDDTHHMMSSZ`. */
function calendarStamp(epochSeconds: number): string {
  return new Date(epochSeconds * 1000)
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
}

/**
 * Section 3. Dark band: #323030 with MRBL-RF-PW-36.jpg covering it and the curve
 * artwork overflowing above (measured 675x447.9 at x=-50, y=-53.3 on desktop).
 *   height   333.3 desktop / 260 mobile
 *   title    y=31.4 / 18.8   Marcellus 20px/400 lh20 #FEFEFE, not uppercase
 *   numerals y=81.4 / 50.8   Cormorant 54px/700 lh81 #FEFEFE; ":" separators 26px/700 lh39
 *   labels   y=162.4 / 131.8 Cormorant 17px/500 lh25.5 #FEFEFE
 *   button   y=269.9 / 209.3 h32, 18px/500 #FEFEFE on #2C3F4E, radius 5px
 * Each unit column STRETCHES, so a label measures exactly as wide as its numeral
 * ("Days" and "113" are both 57.1px). No tabular-nums: it widens the digits past the
 * reference's 57.1px. Row is centered; unit gap 12px desktop / 9px mobile.
 *
 * NOTE: the reference's "Remind Me" handler could not be observed (UNVERIFIED in
 * docs/CLONE-AUDIT.md §4). It is wired to a Google Calendar link as the conventional
 * behaviour; confirm against the reference before treating it as matched.
 */
export function SectionCountdown() {
  const { t } = useInvitation();
  // Null on the server so the first client paint cannot disagree with SSR markup.
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const tick = () => setTimeLeft(diff());
    // Scheduled rather than called synchronously: the React Compiler flags a
    // setState during the effect body as a cascading render.
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

  const calendarHref =
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    `&text=${encodeURIComponent(`The Wedding of ${wedding.groom.short} & ${wedding.bride.short}`)}` +
    `&dates=${calendarStamp(wedding.akadEpoch)}/${calendarStamp(wedding.receptionEpoch)}` +
    `&details=${encodeURIComponent(`${wedding.events.akad.venue} — ${wedding.events.resepsi.venue}`)}` +
    `&location=${encodeURIComponent(wedding.events.resepsi.address)}`;

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

        <a
          href={calendarHref}
          target="_blank"
          rel="noreferrer noopener"
          className={`${templateButtonClass} mt-[52px] md:mt-[82px]`}
        >
          {t.countdown.remind}
        </a>
      </Reveal>
    </section>
  );
}
