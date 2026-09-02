"use client";

import Image from "next/image";
import { WEDDING_CONFIG } from "../lib/constants";
import { SectionReveal } from "./section-reveal";

interface QuoteSectionProps {
  guestName?: string;
}

export function QuoteSection({ guestName = "Invitato" }: QuoteSectionProps) {
  return (
    <section id="story" className="bg-bg-primary relative overflow-hidden px-6 py-16 text-center">
      <Image
        src="/assets/welcoming-background.jpg"
        alt=""
        fill
        sizes="(max-width: 640px) 100vw, 448px"
        className="object-cover opacity-15"
      />

      <div className="relative z-10 flex flex-col items-center">
        <SectionReveal>
          <p className="font-body text-text-muted text-base">Dear Mr/Mrs/Ms,</p>
          <p className="font-heading text-text-main mt-1 text-xl font-medium tracking-wide">
            {guestName}
          </p>

          <h2 className="font-heading text-text-main mt-10 flex items-center justify-center text-3xl sm:text-4xl">
            {WEDDING_CONFIG.groomName}
            <span className="font-script mx-2 text-[44px] font-light">
              and
            </span>
            {WEDDING_CONFIG.brideName}
          </h2>

          <p className="font-body text-text-main/90 mx-auto mt-8 max-w-sm text-base leading-relaxed italic">
            &ldquo;{WEDDING_CONFIG.bibleVerseId.quote}&rdquo;
          </p>

          <p className="font-heading text-text-muted mt-3 text-xs tracking-[0.25em] uppercase">
            — {WEDDING_CONFIG.bibleVerseId.source}
          </p>

          {/* Photo Card with border frame */}
          <div className="bg-white/80 relative mx-auto mt-10 max-w-[260px] p-2.5 shadow-md">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/assets/cover-portrait.png"
                alt="Ricky & Fellycia"
                fill
                sizes="(max-width: 640px) 70vw, 260px"
                className="object-cover"
              />
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
