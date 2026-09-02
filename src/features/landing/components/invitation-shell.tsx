"use client";

import Image from "next/image";
import { useInvitation } from "../i18n/invitation-provider";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

/**
 * Reference layout (measured, see scrape/live/audit/section0-probe.json):
 * - <768px      full-width single column
 * - 768–1279px  centered 500px column, no left backdrop
 * - >=1280px    split view: a fixed left panel (940px at a 1440 viewport) showing
 *               `desktop tb.jpeg` with a persistent cover title block, and the 500px
 *               invitation column pinned to the right edge.
 *
 * `right-[500px]` on a fixed element resolves against the viewport client box, so the
 * panel's right edge lands exactly on the column's left edge.
 */
export function InvitationShell({ children }: Props) {
  const { t } = useInvitation();

  return (
    <>
      <div
        aria-hidden
        className="fixed inset-y-0 left-0 right-[500px] z-[var(--z-backdrop)] hidden xl:block"
      >
        <Image
          src="/assets/cover-desktop.jpeg"
          alt=""
          fill
          priority
          sizes="(min-width: 1280px) calc(100vw - 500px), 0vw"
          className="object-cover"
        />

        <div className="relative h-full p-[42px]">
          <p className="font-heading text-h5 leading-none text-text-main uppercase">
            {t.theWeddingOf}
          </p>

          <div className="mt-[28px] flex items-center">
            <span className="font-heading text-[42px] leading-[42px] text-text-muted uppercase">
              {t.groomShort}
            </span>
            <span className="mt-[-20px] ml-[14px] mr-[20px] font-script text-[72px] leading-[86.4px] font-light text-text-muted">
              and
            </span>
            <span className="font-heading text-[42px] leading-[42px] text-text-muted uppercase">
              {t.brideShort}
            </span>
          </div>

          <p className="mt-[8px] max-w-[254px] font-body text-body leading-[28.5px] font-medium text-text-main">
            {t.verse}
          </p>
        </div>
      </div>

      <div className="relative w-full bg-bg-primary shadow-2xl md:mx-auto md:w-[var(--column-width)] xl:mr-0 overflow-x-clip">
        {children}
      </div>
    </>
  );
}
