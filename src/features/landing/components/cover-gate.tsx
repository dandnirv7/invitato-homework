"use client";

import Image from "next/image";
import { useInvitation } from "../i18n/invitation-provider";
import { CoverArrow } from "./cover-arrow";

export function CoverGate() {
  const { t, open } = useInvitation();

  return (
    <section className="relative h-dvh w-full overflow-hidden">
      <Image
        src="/assets/cover-mobile.jpg"
        alt="Ricky and Fellycia wedding cover"
        fill
        priority
        sizes="(min-width: 1280px) 500px, 100vw"
        className="object-cover"
      />

      <Image
        src="/assets/curve.svg"
        alt=""
        width={500}
        height={332}
        aria-hidden
        className="pointer-events-none absolute -top-8 -right-8 z-[5] w-[500px] max-w-none opacity-90"
      />
      <Image
        src="/assets/curve.svg"
        alt=""
        width={500}
        height={332}
        aria-hidden
        className="pointer-events-none absolute -bottom-12 -left-8 z-[5] w-[500px] max-w-none rotate-180 opacity-80"
      />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <h1 className="font-heading text-h1 text-text-alt flex flex-col items-center leading-none">
          <span>{t.groomShort}</span>
          <span className="font-script text-and leading-none font-light normal-case">
            and
          </span>
          <span>{t.brideShort}</span>
        </h1>

        <p className="font-body text-body text-text-alt mt-4 font-medium">
          {t.hashtag}
        </p>
      </div>

      <CoverArrow onClick={open} label={t.a11y.openInvitation} />
    </section>
  );
}
