"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { submitRsvp } from "../api/submit-rsvp";
import { useInvitation } from "../i18n/invitation-provider";
import { rsvpSchema, type RsvpInput } from "../lib/schemas";
import { wedding } from "../lib/wedding-data";
import { Reveal } from "./reveal";

const fieldClass =
  "h-10 rounded-[5px] border border-line bg-bg-alt px-4 font-body text-[17px] leading-[25.5px] font-medium text-text-main outline-none placeholder:text-text-main/50 focus:border-brand";
const labelClass =
  "mt-6 mb-2 w-full text-left font-body text-body leading-[22.8px] font-medium text-text-main";

export function SectionRsvp() {
  const { t, guestName } = useInvitation();
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const isPersonalized = Boolean(guestName);

  const form = useForm<RsvpInput>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      name: guestName || "",
      countryCode: "62",
      phoneNumber: "",
      address: "",
      email: "",
      attendance: undefined,
      partySize: 1,
    },
  });

  useEffect(() => {
    if (guestName) {
      form.setValue("name", guestName);
    }
  }, [guestName, form]);

  const attendance = form.watch("attendance");

  async function onSubmit(values: RsvpInput) {
    try {
      await submitRsvp(values);
      setStatus("ok");
      form.reset({
        ...values,
        name: guestName || "",
        phoneNumber: "",
        address: "",
        email: "",
      });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="rsvp"
      className="relative flex flex-col items-center overflow-hidden py-8"
    >
      <div
        className="bg-brand pointer-events-none absolute top-6 -left-4 h-16 w-8 rounded-r-full"
        aria-hidden
      />
      <div
        className="bg-brand pointer-events-none absolute top-6 -right-4 h-16 w-8 rounded-l-full"
        aria-hidden
      />

      <Reveal className="flex w-full flex-col items-center px-[50px] max-md:px-10">
        <h2 className="font-heading text-h1 text-text-muted leading-normal uppercase">
          {t.rsvp.title}
        </h2>

        <p className="font-body text-body text-text-main mt-6 w-full text-center leading-[28.5px] font-medium">
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
          <p className="font-body text-text-main/80 mt-1 mb-2 w-full text-left text-[14px] leading-[16.8px] font-normal italic">
            {t.rsvp.nameHelper}
          </p>
          <input
            id="rsvp-name"
            type="text"
            required
            readOnly={isPersonalized}
            placeholder={t.rsvp.placeholder}
            className={`${fieldClass} w-full ${
              isPersonalized
                ? "text-text-main/85 cursor-not-allowed bg-[#E2E8F0] font-semibold"
                : ""
            }`}
            {...form.register("name")}
          />

          <p className={labelClass}>{`${t.rsvp.phoneLabel} :`}</p>
          <div className="flex w-full">
            <select
              aria-label={t.rsvp.phoneLabel}
              className={`${fieldClass} min-w-max shrink-0 rounded-r-none pr-8`}
              {...form.register("countryCode")}
            >
              {wedding.countryCodes.map((country) => (
                <option
                  key={`${country.name}-${country.code}`}
                  value={country.code}
                >
                  {`+${country.code}`}
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
                className={`font-body h-8 flex-1 cursor-pointer rounded-[6px] px-3 text-[17px] leading-[20.4px] font-medium transition-colors duration-200 ${
                  attendance === value
                    ? "bg-brand text-text-alt"
                    : "border-brand text-brand border bg-transparent"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="mt-6 flex w-full justify-center">
            <button
              type="submit"
              className="font-body inline-flex h-8 cursor-pointer items-center justify-center rounded-[6px] bg-[#6D7275] px-6 py-2 text-[18px] leading-[21.6px] font-medium text-white transition-opacity duration-200 hover:opacity-85"
            >
              {t.rsvp.submit}
            </button>
          </div>

          {status === "ok" ? (
            <p
              role="status"
              className="font-body text-text-main mt-4 w-full text-center text-[17px] leading-[25.5px] font-medium"
            >
              {t.rsvp.success}
            </p>
          ) : null}
          {status === "error" ? (
            <p
              role="alert"
              className="font-body mt-4 w-full text-center text-[17px] leading-[25.5px] font-medium text-[#A1425C]"
            >
              {t.rsvp.failure}
            </p>
          ) : null}
        </form>
      </Reveal>
    </section>
  );
}
