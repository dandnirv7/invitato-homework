"use client";

import { useEffect } from "react";
import { useInvitation } from "../i18n/invitation-provider";
import { wedding } from "../lib/wedding-data";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

/**
 * Anchor navigation drawer. The reference renders it as a dark #2C3F4E panel with
 * the couple lockup on top, right-aligned letter-spaced Marcellus links separated
 * by hairline rules, and the Invitato credit block at the bottom; closing happens
 * through the floating circular control, the backdrop, or Escape.
 */
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
    { id: "access-card", label: t.nav.accessCard },
    { id: "groom-bride", label: t.nav.groomBride },
    { id: "wedding-details", label: t.nav.weddingDetails },
    { id: "rsvp", label: t.nav.rsvp },
    { id: "live-streaming", label: t.nav.liveStreaming },
    { id: "wedding-gift", label: t.nav.weddingGift },
  ];

  return (
    <div className="fixed inset-0 z-[var(--z-portal)]">
      <div
        className="absolute inset-0 bg-bg-overlay/50"
        onClick={() => onOpenChange(false)}
        aria-hidden
      />

      <nav
        role="dialog"
        aria-modal="true"
        aria-label={t.a11y.openMenu}
        className="absolute inset-y-0 left-0 flex w-[354px] max-w-[85vw] flex-col bg-brand px-12 pt-[120px] pb-10 text-text-alt shadow-2xl"
      >
        <p className="text-center font-heading text-[30px] leading-[36px] tracking-[1px] uppercase">
          {wedding.groom.short}
          <span className="mx-2 font-script text-[36px] leading-[42px] normal-case">
            and
          </span>
          {wedding.bride.short}
        </p>

        <ul className="mt-14 flex flex-1 flex-col">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={() => onOpenChange(false)}
                className="block cursor-pointer border-b border-text-alt/40 py-7 text-right font-heading text-[20px] leading-[24px] tracking-[3px] transition-opacity duration-200 hover:opacity-75"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-8 text-center font-body text-[13px] leading-[21px] font-medium">
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
