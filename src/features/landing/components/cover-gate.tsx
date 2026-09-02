"use client";

import Image from "next/image";
import { useInvitation } from "../i18n/invitation-provider";
import { CoverArrow } from "./cover-arrow";

/**
 * Pre-open state. The reference keeps `body { overflow: visible }` and simply does
 * not mount the invitation yet, so the document is exactly one viewport tall and
 * cannot scroll. Mounting the rest on open reproduces that without a scroll lock.
 */
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

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <p className="font-body text-small font-medium tracking-[0.2em] text-text-alt uppercase">
          {t.theWeddingOf}
        </p>

        <h1 className="mt-4 flex flex-col items-center font-heading text-h1 leading-none text-text-alt">
          <span>{t.groomShort}</span>
          <span className="font-script text-and font-light leading-none normal-case">
            and
          </span>
          <span>{t.brideShort}</span>
        </h1>

        <p className="mt-6 font-body text-body font-medium text-text-alt">
          {t.hashtag}
        </p>
      </div>

      <CoverArrow onClick={open} label={t.a11y.openInvitation} />
    </section>
  );
}
