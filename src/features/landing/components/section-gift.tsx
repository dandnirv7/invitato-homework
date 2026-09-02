"use client";

import { Copy, Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useInvitation } from "../i18n/invitation-provider";
import { wedding } from "../lib/wedding-data";
import { Reveal } from "./reveal";
import { templateButtonClass } from "./template-button";

function CopyButton({ value, label, doneLabel }: { value: string; label: string; doneLabel: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(id);
  }, [copied]);

  return (
    <button
      type="button"
      aria-label={`${label}: ${value}`}
      className="inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-[5px] border border-brand px-2 py-1 font-body text-[14px] leading-[16.8px] font-medium text-brand transition-opacity duration-200 hover:opacity-75"
      onClick={async () => {
        await navigator.clipboard.writeText(value);
        setCopied(true);
      }}
    >
      {copied ? <Check className="size-3.5" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
      {copied ? doneLabel : label}
    </button>
  );
}

/**
 * Section 8. Measured on the live reference: h 451.5 at BOTH widths, bg #D5DADE,
 * padding 32px 0, content 400px wide. Title y=114, body y=162 (h 85.5),
 * "Send Gift" y=301.5 — which leaves 118px of trailing space inside the section.
 */
export function SectionGift() {
  const { t } = useInvitation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <section
      id="wedding-gift"
      className="flex flex-col items-center bg-bg-primary pt-8 pb-[118px] text-center"
    >
      <Reveal className="flex w-[80%] max-w-[400px] flex-col items-center text-center">
        <h2 className="mt-[82px] w-full font-heading text-h1 leading-[32px] text-text-muted uppercase">
          {t.gift.title}
        </h2>

        <p className="mt-4 w-full px-3 font-body text-body leading-[28.5px] font-medium text-text-main">
          {t.gift.body}
        </p>

        <button
          type="button"
          aria-haspopup="dialog"
          aria-expanded={open}
          className={`${templateButtonClass} mt-[54px]`}
          onClick={() => setOpen(true)}
        >
          {t.gift.cta}
        </button>
      </Reveal>

      {open ? (
        <div className="fixed inset-0 z-[var(--z-portal)] flex items-end justify-center">
          <div
            className="absolute inset-0 bg-bg-overlay/50"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label={t.gift.title}
            className="relative max-h-[85dvh] w-full max-w-[500px] overflow-y-auto rounded-t-[16px] bg-bg-alt px-6 py-6 text-left shadow-2xl no-scrollbar"
          >
            <button
              type="button"
              aria-label={t.a11y.closeMenu}
              className="absolute top-4 right-4 cursor-pointer text-text-muted transition-opacity duration-200 hover:opacity-60"
              onClick={() => setOpen(false)}
            >
              <X className="size-5" aria-hidden />
            </button>

            <h3 className="font-heading text-h3 leading-[28px] text-text-muted uppercase">
              {t.gift.title}
            </h3>

            <p className="mt-4 font-body text-[17px] leading-[25.5px] font-bold text-text-main">
              {t.gift.bankAccounts}
            </p>

            <ul className="mt-2 flex flex-col gap-3">
              {wedding.gift.banks.map((bank) => (
                <li
                  key={bank.account}
                  className="rounded-[8px] border border-line bg-bg-primary/40 px-4 py-3"
                >
                  <p className="font-body text-[17px] leading-[25.5px] font-bold text-text-main">
                    {bank.name}
                  </p>
                  <p className="font-body text-body leading-[28.5px] font-medium text-text-main">
                    {bank.account}
                  </p>
                  <div className="mt-2 flex items-center justify-between gap-3">
                    <span className="font-body text-[17px] leading-[25.5px] font-medium text-text-muted">
                      {bank.holder}
                    </span>
                    <CopyButton
                      value={bank.account}
                      label={t.gift.copy}
                      doneLabel={t.gift.copied}
                    />
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-5 font-body text-[17px] leading-[25.5px] font-bold text-text-main">
              {t.gift.shipTo}
            </p>
            <div className="mt-1 flex items-start justify-between gap-3">
              <p className="font-body text-body leading-[28.5px] font-medium text-text-main">
                {wedding.gift.address}
              </p>
              <CopyButton
                value={wedding.gift.address}
                label={t.gift.copyAddress}
                doneLabel={t.gift.copied}
              />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
