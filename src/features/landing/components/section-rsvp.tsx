"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { submitRsvp } from "../api/submit-rsvp";
import { useInvitation } from "../i18n/invitation-provider";
import { rsvpSchema, type RsvpInput } from "../lib/schemas";
import { wedding } from "../lib/wedding-data";
import { Reveal } from "./reveal";
import { templateButtonClass } from "./template-button";

const fieldClass =
  "h-10 rounded-[5px] border border-line bg-bg-alt px-4 font-body text-[17px] leading-[25.5px] font-medium text-text-main outline-none placeholder:text-text-main/50 focus:border-brand";
const labelClass =
  "mt-6 mb-2 w-full text-left font-body text-body leading-[22.8px] font-medium text-text-main";

/**
 * Section 5. Measured on the live reference: h 741.8 desktop / 758.6 mobile,
 * section padding 32px 0, every field 400px wide (80% of the 500px column).
 * Labels carry margin 24px 0 8px; inputs are 40px tall with radius 5px.
 * The two attendance buttons are 192 x 32 with radius 6px and 17px text —
 * deliberately NOT the shared CTA's 5px/18px.
 */
export function SectionRsvp() {
  const { t } = useInvitation();
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");

  const form = useForm<RsvpInput>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      name: "",
      countryCode: "62",
      phoneNumber: "",
      address: "",
      email: "",
      attendance: undefined,
      partySize: 1,
    },
  });

  const attendance = form.watch("attendance");

  async function onSubmit(values: RsvpInput) {
    try {
      await submitRsvp(values);
      setStatus("ok");
      form.reset({ ...values, name: "", phoneNumber: "", address: "", email: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="rsvp" className="flex flex-col items-center py-8">
      <Reveal className="flex w-full flex-col items-center px-[50px] max-md:px-10">
        <h2 className="w-full font-heading text-h1 leading-normal text-text-muted uppercase">
          {t.rsvp.title}
        </h2>

        <p className="mt-6 w-full text-center font-body text-body leading-[28.5px] font-medium text-text-main">
          {t.rsvp.introTop}
          <br />
          {t.rsvp.introBottom}
        </p>

        <form
          className="flex w-full flex-col"
          onSubmit={form.handleSubmit(onSubmit)}
          noValidate={false}
        >
          <label className={labelClass} htmlFor="rsvp-name">
            {t.rsvp.nameLabel}
          </label>
          <p className="mt-1 mb-2 w-full text-left font-body text-[14px] leading-[16.8px] font-normal text-text-main">
            {t.rsvp.nameHelper}
          </p>
          <input
            id="rsvp-name"
            type="text"
            required
            placeholder={t.rsvp.placeholder}
            className={`${fieldClass} w-full`}
            {...form.register("name")}
          />

          <p className={labelClass}>{`${t.rsvp.phoneLabel} :`}</p>
          <div className="flex w-full">
            <select
              aria-label={t.rsvp.phoneLabel}
              className={`${fieldClass} w-[85px] shrink-0 rounded-r-none pr-8`}
              {...form.register("countryCode")}
            >
              {wedding.countryCodes.map((country) => (
                <option key={`${country.name}-${country.code}`} value={country.code}>
                  {`${country.name} - ${country.code}`}
                </option>
              ))}
            </select>
            <input
              type="tel"
              inputMode="numeric"
              aria-label={t.rsvp.phoneLabel}
              className={`${fieldClass} w-full flex-1 rounded-l-none`}
              {...form.register("phoneNumber")}
            />
          </div>

          <label className={labelClass} htmlFor="rsvp-address">
            {t.rsvp.addressLabel}
          </label>
          <input
            id="rsvp-address"
            type="text"
            placeholder={t.rsvp.placeholder}
            className={`${fieldClass} w-full`}
            {...form.register("address")}
          />

          <label className={labelClass} htmlFor="rsvp-email">
            {t.rsvp.emailLabel}
          </label>
          <input
            id="rsvp-email"
            type="email"
            placeholder={t.rsvp.placeholder}
            className={`${fieldClass} w-full`}
            {...form.register("email")}
          />

          <p className={labelClass}>{t.rsvp.attendQuestion}</p>
          <div className="flex w-full gap-4">
            {(
              [
                ["attending", t.rsvp.attendYes],
                ["not_attending", t.rsvp.attendNo],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                aria-pressed={attendance === value}
                onClick={() => form.setValue("attendance", value)}
                className={`h-8 flex-1 cursor-pointer rounded-[6px] px-3 font-body text-[17px] leading-[20.4px] font-medium transition-colors duration-200 ${
                  attendance === value
                    ? "bg-brand text-text-alt"
                    : "border border-brand bg-transparent text-brand"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="mt-6 flex w-full justify-center">
            <button type="submit" className={templateButtonClass}>
              {t.rsvp.submit}
            </button>
          </div>

          {status === "ok" ? (
            <p
              role="status"
              className="mt-4 w-full text-center font-body text-[17px] leading-[25.5px] font-medium text-text-main"
            >
              {t.rsvp.success}
            </p>
          ) : null}
          {status === "error" ? (
            <p
              role="alert"
              className="mt-4 w-full text-center font-body text-[17px] leading-[25.5px] font-medium text-[#A1425C]"
            >
              {t.rsvp.failure}
            </p>
          ) : null}
        </form>
      </Reveal>
    </section>
  );
}
