"use client";

import { useEffect } from "react";
import { useInvitation } from "../i18n/invitation-provider";
import { wedding } from "../lib/wedding-data";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function NavDrawer({ open, onOpenChange }: Props) {
  const { t } = useInvitation();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  if (!open) return null;

  const links = [
    { id: "groom-bride", label: t.nav.groomBride },
    { id: "wedding-details", label: t.nav.weddingDetails },
    { id: "live-streaming", label: t.nav.liveStreaming },
    { id: "wedding-gift", label: t.nav.weddingGift },
  ];

  return (
    <div className="fixed inset-0 z-[var(--z-portal)]">
      <div
        className="bg-bg-overlay/50 absolute inset-0"
        onClick={() => onOpenChange(false)}
        aria-hidden
      />

      <nav
        role="dialog"
        aria-modal="true"
        aria-label={t.a11y.openMenu}
        className="bg-brand text-text-alt absolute inset-y-0 right-0 flex w-[500px] max-w-full flex-col px-12 pt-[100px] pb-10 shadow-2xl"
      >
        <p className="font-heading text-right text-[30px] leading-[36px] tracking-[1px] uppercase">
          {wedding.groom.short}
          <span className="font-script mx-2 text-[36px] leading-[42px] normal-case">
            and
          </span>
          {wedding.bride.short}
        </p>

        <ul className="mt-12 flex flex-1 flex-col">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={() => onOpenChange(false)}
                className="border-text-alt/40 font-heading block cursor-pointer border-b py-6 text-right text-[20px] leading-[24px] tracking-[3px] transition-opacity duration-200 hover:opacity-75"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="font-body mt-8 text-right text-[13px] leading-[21px] font-medium opacity-80">
          <p>Created with Love by Invitato</p>
          <p>
            2026 {wedding.groom.short} &amp; {wedding.bride.short}
          </p>
          <p>All Rights Reserved</p>
        </div>
      </nav>
    </div>
  );
}
