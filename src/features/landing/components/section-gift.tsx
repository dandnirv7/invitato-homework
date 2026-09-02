"use client";

import Image from "next/image";
import { Copy, Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useInvitation } from "../i18n/invitation-provider";
import { wedding } from "../lib/wedding-data";
import { Reveal } from "./reveal";

function CopyButton({
  value,
  label,
  doneLabel,
}: {
  value: string;
  label: string;
  doneLabel: string;
}) {
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
      className="border-brand font-body text-brand inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-[5px] border px-2 py-1 text-[14px] leading-[16.8px] font-medium transition-opacity duration-200 hover:opacity-75"
      onClick={async () => {
        await navigator.clipboard.writeText(value);
        setCopied(true);
      }}
    >
      {copied ? (
        <Check className="size-3.5" aria-hidden />
      ) : (
        <Copy className="size-3.5" aria-hidden />
      )}
      {copied ? doneLabel : label}
    </button>
  );
}

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
      className="relative flex flex-col items-center overflow-hidden bg-bg-primary pt-8 pb-[118px] text-center"
    >
      <div
        className="pointer-events-none absolute top-6 -left-4 h-16 w-8 rounded-r-full bg-brand"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-6 -right-4 h-16 w-8 rounded-l-full bg-brand"
        aria-hidden
      />

      <Reveal className="flex w-[80%] max-w-[400px] flex-col items-center text-center">
        <Image
          src="/assets/love-story-ornament.svg"
          alt=""
          width={24}
          height={24}
          aria-hidden
          className="mx-auto mt-4 h-6 w-6"
        />

        <h2 className="mt-[50px] w-full font-heading text-h1 leading-[32px] text-text-muted uppercase">
          {t.gift.title}
        </h2>

        <p className="mt-4 w-full px-3 font-body text-body leading-[28.5px] font-medium text-text-main">
          {t.gift.body}
        </p>

        <button
          type="button"
          aria-haspopup="dialog"
          aria-expanded={open}
          className="mt-[54px] inline-flex h-8 cursor-pointer items-center justify-center rounded-[6px] bg-[#6D7275] px-6 py-2 font-body text-[18px] leading-[21.6px] font-medium text-white transition-opacity duration-200 hover:opacity-85"
          onClick={() => setOpen(true)}
        >
          {t.gift.cta}
        </button>
      </Reveal>

      {open ? (
        <div className="fixed inset-0 z-[var(--z-portal)] flex items-end justify-center">
          <div
            className="bg-bg-overlay/50 absolute inset-0"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label={t.gift.title}
            className="bg-bg-alt no-scrollbar relative max-h-[85dvh] w-full max-w-[500px] overflow-y-auto rounded-t-[16px] px-6 py-6 text-left shadow-2xl"
          >
            <button
              type="button"
              aria-label={t.a11y.closeMenu}
              className="text-text-muted absolute top-4 right-4 cursor-pointer transition-opacity duration-200 hover:opacity-60"
              onClick={() => setOpen(false)}
            >
              <X className="size-5" aria-hidden />
            </button>

            <h3 className="font-heading text-h3 text-text-muted leading-[28px] uppercase">
              {t.gift.title}
            </h3>

            <p className="font-body text-text-main mt-4 text-[17px] leading-[25.5px] font-bold">
              {t.gift.bankAccounts}
            </p>

            <ul className="mt-2 flex flex-col gap-3">
              {wedding.gift.banks.map((bank) => (
                <li
                  key={bank.account}
                  className="border-line bg-bg-primary/40 rounded-[8px] border px-4 py-3"
                >
                  <p className="font-body text-text-main text-[17px] leading-[25.5px] font-bold">
                    {bank.name}
                  </p>
                  <p className="font-body text-body text-text-main leading-[28.5px] font-medium">
                    {bank.account}
                  </p>
                  <div className="mt-2 flex items-center justify-between gap-3">
                    <span className="font-body text-text-muted text-[17px] leading-[25.5px] font-medium">
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

            <p className="font-body text-text-main mt-5 text-[17px] leading-[25.5px] font-bold">
              {t.gift.shipTo}
            </p>
            <div className="mt-1 flex items-start justify-between gap-3">
              <p className="font-body text-body text-text-main leading-[28.5px] font-medium">
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
