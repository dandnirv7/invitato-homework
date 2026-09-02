"use client";

import { useEffect, useRef, useState } from "react";
import { useInvitation } from "../i18n/invitation-provider";
import type { Lang } from "../i18n/dictionary";

/**
 * Reference: fixed pill, right:32px, bottom:16px at ≥768px and bottom:60px below,
 * z-index 99, background #737373, showing the active code plus a translate icon.
 */
export function LanguageSwitcher() {
  const { lang, setLang, t } = useInvitation();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const select = (next: Lang) => {
    setLang(next);
    setOpen(false);
  };

  return (
    <div
      ref={rootRef}
      className="fixed right-8 bottom-15 z-[var(--z-lang)] md:bottom-4"
    >
      {open ? (
        <div
          role="menu"
          className="absolute right-0 bottom-full mb-2 min-w-45 overflow-hidden rounded-[var(--radius-invitato-md)] bg-bg-alt shadow-xl"
        >
          <LanguageItem
            label={t.language.indonesian}
            active={lang === "id"}
            onSelect={() => select("id")}
          />
          <LanguageItem
            label={t.language.english}
            active={lang === "en"}
            onSelect={() => select("en")}
          />
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={t.language.label}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex cursor-pointer items-center gap-2 rounded-full bg-bg-secondary px-3 py-2 text-small font-medium text-text-alt transition-opacity duration-200 hover:opacity-80"
      >
        <TranslateIcon />
        <span className="font-micro tracking-wide uppercase">
          {lang === "id" ? "ID" : "EN"}
        </span>
      </button>
    </div>
  );
}

function LanguageItem({
  label,
  active,
  onSelect,
}: {
  label: string;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onSelect}
      className={`flex w-full cursor-pointer items-center justify-between px-4 py-2.5 text-left font-body text-body-2 transition-colors duration-200 hover:bg-bg-primary ${
        active ? "font-bold text-brand" : "text-text-main"
      }`}
    >
      {label}
    </button>
  );
}

function TranslateIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M2 4h7M5.5 4c0 3-1.7 5.4-3.5 6.6M4 6.5c.9 1.9 2.6 3.3 4.5 3.9M9 15l3.5-8L16 15M10.3 12.4h4.4" />
    </svg>
  );
}
