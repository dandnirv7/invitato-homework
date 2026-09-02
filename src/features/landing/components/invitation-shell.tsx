"use client";

import Image from "next/image";
import { useInvitation } from "../i18n/invitation-provider";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function InvitationShell({ children }: Props) {
  const { t } = useInvitation();

  return (
    <>
      <div
        aria-hidden
        className="fixed inset-y-0 right-[500px] left-0 z-[var(--z-backdrop)] hidden xl:block"
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
          <p className="font-heading text-h5 text-text-main leading-none uppercase">
            {t.theWeddingOf}
          </p>

          <div className="mt-[28px] flex items-center">
            <span className="font-heading text-text-muted text-[42px] leading-[42px] uppercase">
              {t.groomShort}
            </span>
            <span className="font-script text-text-muted mt-[-20px] mr-[20px] ml-[14px] text-[72px] leading-[86.4px] font-light">
              and
            </span>
            <span className="font-heading text-text-muted text-[42px] leading-[42px] uppercase">
              {t.brideShort}
            </span>
          </div>

          <p className="font-body text-body text-text-main mt-[8px] max-w-[254px] leading-[28.5px] font-medium">
            {t.verse}
          </p>
          <p className="font-body text-body text-text-main mt-3 leading-[28.5px] font-medium">
            &mdash; {t.verseSource}
          </p>
        </div>
      </div>

      <div className="bg-bg-primary relative w-full overflow-x-clip shadow-2xl md:mx-auto md:w-[var(--column-width)] xl:mr-0">
        {children}
      </div>
    </>
  );
}
