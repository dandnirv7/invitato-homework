"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getWishes } from "../api/get-wishes";
import { submitWish } from "../api/submit-wish";
import { useInvitation } from "../i18n/invitation-provider";
import { wishSchema, type WishInput } from "../lib/schemas";
import type { Wish } from "../types";
import { Reveal } from "./reveal";
import { templateButtonClass } from "./template-button";

const fieldClass =
  "rounded-[5px] border border-line bg-bg-alt px-4 font-body text-[17px] leading-[25.5px] font-medium text-text-main outline-none placeholder:text-text-main/50 focus:border-brand";
const labelClass =
  "w-full text-left font-body text-body leading-[22.8px] font-medium text-text-main";

function stamp(iso: string) {
  const date = new Date(iso);
  const day = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const time = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return `${day} | ${time}`;
}

/**
 * Section 9. Measured on the live reference: h 908.6 at both widths, bg #D5DADE,
 * content 400px wide, `curve.svg` 880 x 584 as a decorative overlay at y=403.7,
 * wish entries repeating on a 167.2px pitch (name 17px/700, message 16px/500,
 * timestamp 13.5px/400 #737373 as `13 Apr 2025 | 02:41 AM`).
 *
 * The reference's list is seeded vendor data. Per AGENTS.md this clone renders an
 * honest empty state backed by Supabase instead, so the section is shorter than
 * 908.6 until real wishes exist — a documented deliberate deviation.
 */
export function SectionWishes() {
  const { t } = useInvitation();
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");

  const form = useForm<WishInput>({
    resolver: zodResolver(wishSchema),
    defaultValues: { name: "", message: "" },
  });

  useEffect(() => {
    let active = true;
    getWishes()
      .then((rows) => {
        if (active) setWishes(rows);
      })
      .catch(() => {
        if (active) setWishes([]);
      });
    return () => {
      active = false;
    };
  }, []);

  async function onSubmit(values: WishInput) {
    try {
      const created = await submitWish(values);
      setWishes((rows) => [created, ...rows]);
      form.reset({ name: "", message: "" });
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="relative flex flex-col items-center bg-bg-primary py-8">
      <Image
        src="/assets/curve.svg"
        alt=""
        width={880}
        height={584}
        aria-hidden
        className="pointer-events-none absolute top-[403.7px] left-1/2 h-auto w-[880px] max-w-full -translate-x-1/2 opacity-40"
      />

      <Reveal className="relative flex w-[80%] max-w-[400px] flex-col items-center">
        <h2 className="w-full pb-2 text-center font-heading text-h1 leading-[32px] text-text-muted uppercase">
          {t.wishes.title}
        </h2>

        <p className="w-full pt-5 text-center font-body text-body leading-[28.5px] font-medium text-text-main">
          {t.wishes.body}
        </p>

        <form className="mt-[34px] w-full" onSubmit={form.handleSubmit(onSubmit)}>
          <label className={labelClass} htmlFor="wish-name">
            {`${t.wishes.nameLabel} :`}
          </label>
          <input
            id="wish-name"
            type="text"
            required
            placeholder={t.wishes.placeholder}
            className={`${fieldClass} mt-2 h-10 w-full`}
            {...form.register("name")}
          />

          <label className={`${labelClass} mt-[14px] block`} htmlFor="wish-message">
            {t.wishes.messageLabel}
          </label>
          <textarea
            id="wish-message"
            required
            rows={3}
            placeholder={t.wishes.placeholder}
            className={`${fieldClass} mt-2 h-20 w-full resize-none py-2`}
            {...form.register("message")}
          />

          <div className="mt-8 flex w-full justify-center">
            <button type="submit" className={templateButtonClass}>
              {t.wishes.submit}
            </button>
          </div>

          {status === "ok" ? (
            <p
              role="status"
              className="mt-4 w-full text-center font-body text-[17px] leading-[25.5px] font-medium text-text-main"
            >
              {t.wishes.success}
            </p>
          ) : null}
          {status === "error" ? (
            <p
              role="alert"
              className="mt-4 w-full text-center font-body text-[17px] leading-[25.5px] font-medium text-[#A1425C]"
            >
              {t.wishes.failure}
            </p>
          ) : null}
        </form>

        <ul className="mt-9 w-full">
          {wishes.length === 0 ? (
            <li className="w-full py-6 text-center font-body text-body leading-[28.5px] font-medium text-text-muted">
              {t.wishes.empty}
            </li>
          ) : (
            wishes.map((wish) => (
              <li
                key={wish.id}
                className="border-b border-line py-4 last:border-b-0"
              >
                <p className="font-body text-[17px] leading-[25.5px] font-bold text-text-main">
                  {wish.name}
                </p>
                <p className="mt-1 font-body text-[16px] leading-[24px] font-medium text-text-main">
                  {wish.message}
                </p>
                <p className="mt-1 font-body text-[13.5px] leading-[20.3px] font-normal text-text-muted">
                  {stamp(wish.created_at)}
                </p>
              </li>
            ))
          )}
        </ul>
      </Reveal>
    </section>
  );
}
