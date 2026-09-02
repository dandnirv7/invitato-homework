"use client";

import { Music, X } from "lucide-react";
import { useInvitation } from "../i18n/invitation-provider";
import { NavDrawer } from "./nav-drawer";

type Props = {
  menuOpen: boolean;
  onMenuOpenChange: (open: boolean) => void;
};
export function FloatingControls({ menuOpen, onMenuOpenChange }: Props) {
  const { t, playing, toggleMusic } = useInvitation();

  return (
    <>
      <div className="fixed bottom-3 left-3 z-[var(--z-floating)] flex gap-1">
        <button
          type="button"
          onClick={() => onMenuOpenChange(!menuOpen)}
          aria-label={menuOpen ? t.a11y.closeMenu : t.a11y.openMenu}
          aria-haspopup="dialog"
          aria-expanded={menuOpen}
          className="bg-bg-secondary text-text-alt flex size-8 cursor-pointer items-center justify-center rounded-full transition-opacity duration-200 hover:opacity-80"
        >
          {menuOpen ? (
            <X className="size-4" strokeWidth={1.75} aria-hidden />
          ) : (
            <MenuIcon />
          )}
        </button>

        <button
          type="button"
          onClick={toggleMusic}
          aria-label={t.a11y.toggleMusic}
          aria-pressed={playing}
          className={`bg-bg-secondary text-text-alt flex size-8 cursor-pointer items-center justify-center rounded-full transition-opacity duration-200 hover:opacity-80 ${
            !playing ? "opacity-60" : ""
          }`}
        >
          <Music className="size-4" strokeWidth={1.75} aria-hidden />
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
