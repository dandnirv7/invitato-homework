"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useInvitation } from "../i18n/invitation-provider";
import { NavDrawer } from "./nav-drawer";

type Props = {
  menuOpen: boolean;
  onMenuOpenChange: (open: boolean) => void;
};

/**
 * Two 32x32 circular controls pinned bottom-left at z-index 999, background #737373:
 * nav-drawer toggle at left:12px, music toggle at left:48px, both bottom:12px.
 */
export function FloatingControls({ menuOpen, onMenuOpenChange }: Props) {
  const { t, playing, toggleMusic } = useInvitation();

  return (
    <>
      {/* 4px gap: 12px + 32px button + 4px = the reference's left:48px for the music toggle. */}
      <div className="fixed bottom-3 left-3 z-[var(--z-floating)] flex gap-1">
        <button
          type="button"
          onClick={() => onMenuOpenChange(true)}
          aria-label={t.a11y.openMenu}
          aria-haspopup="dialog"
          className="flex size-8 cursor-pointer items-center justify-center rounded-full bg-bg-secondary text-text-alt transition-opacity duration-200 hover:opacity-80"
        >
          <MenuIcon />
        </button>

        <button
          type="button"
          onClick={toggleMusic}
          aria-label={t.a11y.toggleMusic}
          aria-pressed={playing}
          className="flex size-8 cursor-pointer items-center justify-center rounded-full bg-bg-secondary text-text-alt transition-opacity duration-200 hover:opacity-80"
        >
          {playing ? (
            <Volume2 className="size-4" strokeWidth={1.75} aria-hidden />
          ) : (
            <VolumeX className="size-4" strokeWidth={1.75} aria-hidden />
          )}
        </button>
      </div>

      <NavDrawer open={menuOpen} onOpenChange={onMenuOpenChange} />
    </>
  );
}

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M2 4h12M2 8h12M2 12h12" />
    </svg>
  );
}
