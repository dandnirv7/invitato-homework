"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { submitRsvp } from "../api/submit-rsvp";
import { rsvpSchema } from "../lib/schemas";
import { SectionReveal } from "./section-reveal";

type RsvpFormValues = z.infer<typeof rsvpSchema>;

const attendanceOptions = [
  { value: "attending", label: "Hadir" },
  { value: "not_attending", label: "Tidak Hadir" },
] as const;

interface RsvpSectionProps {
  guestName?: string;
}

export function RsvpSection({ guestName }: RsvpSectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<RsvpFormValues>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      name: guestName || "",
      attendance: "attending",
      partySize: 1,
    },
  });

  useEffect(() => {
    if (guestName) {
      form.setValue("name", guestName);
    }
  }, [guestName, form]);

  const attendance = form.watch("attendance");

  const onSubmit = form.handleSubmit(async (values) => {
    setIsSubmitting(true);

    try {
      await submitRsvp({
        ...values,
        partySize:
          values.attendance === "attending" ? Number(values.partySize) : 1,
      });
      toast.success("RSVP terkirim. Terima kasih atas konfirmasinya!");
      form.reset({ name: guestName || "", attendance: "attending", partySize: 1 });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const data = error.response?.data as
          { errors?: Record<string, string[]>; error?: string } | undefined;

        if (data?.errors) {
          for (const [field, messages] of Object.entries(data.errors)) {
            if (messages?.length) {
              form.setError(field as keyof RsvpFormValues, {
                message: messages[0],
              });
            }
          }
          toast.error("Periksa kembali formulir Anda.");
          return;
        }

        toast.error(
          data?.error ?? "Terjadi kesalahan pada server. Silakan coba lagi."
        );
        return;
      }

      toast.error("Tidak dapat terhubung ke server. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <section id="rsvp" className="bg-bg-primary px-6 py-16 text-center">
      <SectionReveal>
        <h2 className="font-heading text-text-muted text-2xl tracking-[0.25em] uppercase sm:text-3xl">
          RSVP
        </h2>
        <p className="font-body text-text-main mx-auto mt-4 max-w-sm text-base leading-relaxed">
          Kami ingin mendengar kabar dari anda!
          <br />
          Silakan isi konfirmasi di bawah ini:
        </p>
      </SectionReveal>

      <SectionReveal className="mt-8 text-left" delay={0.1}>
        <Form {...form}>
          <form
            onSubmit={onSubmit}
            aria-busy={isSubmitting}
            className="mx-auto max-w-md space-y-5"
          >
            {/* Nama */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-heading text-text-main text-sm font-normal">
                    Nama:
                  </FormLabel>
                  <p className="font-body text-text-muted text-xs italic">
                    *) RSVP bersifat personal sehingga hanya bisa mengkonfirmasikan 1 nama tamu undangan saja
                  </p>
                  <FormControl>
                    <Input
                      placeholder="Nama lengkap Anda"
                      autoComplete="name"
                      disabled={isSubmitting}
                      className="bg-white/80 border-black/15 h-11 text-base text-text-main"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Nomor HP */}
            <div className="space-y-1.5">
              <label className="font-heading text-text-main text-sm font-normal">
                Nomor HP:
              </label>
              <div className="flex gap-2">
                <span className="bg-white/80 border border-black/15 flex h-11 items-center rounded-md px-3 font-body text-sm text-text-main">
                  + 62
                </span>
                <Input
                  type="tel"
                  placeholder="8123456789"
                  disabled={isSubmitting}
                  className="bg-white/80 border-black/15 h-11 text-base text-text-main flex-1"
                />
              </div>
            </div>

            {/* Alamat */}
            <div className="space-y-1.5">
              <label className="font-heading text-text-main text-sm font-normal">
                Alamat:
              </label>
              <Input
                placeholder="Kota / Alamat tempat tinggal"
                disabled={isSubmitting}
                className="bg-white/80 border-black/15 h-11 text-base text-text-main"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="font-heading text-text-main text-sm font-normal">
                Email:
              </label>
              <Input
                type="email"
                placeholder="email@example.com"
                disabled={isSubmitting}
                className="bg-white/80 border-black/15 h-11 text-base text-text-main"
              />
            </div>

            {/* Attendance Status */}
            <FormField
              control={form.control}
              name="attendance"
              render={({ field }) => (
                <FormItem className="pt-2">
                  <FormLabel className="font-heading text-text-main text-sm font-normal">
                    Konfirmasi Kehadiran:
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="grid grid-cols-2 gap-3 pt-1"
                    >
                      {attendanceOptions.map((option) => {
                        const isSelected = field.value === option.value;
                        return (
                          <label
                            key={option.value}
                            className={`flex cursor-pointer items-center justify-center gap-2 rounded-md border p-3 text-sm font-medium transition-all ${
                              isSelected
                                ? "border-text-main bg-text-main text-text-alt shadow-xs"
                                : "border-black/15 bg-white/80 text-text-main hover:bg-white"
                            }`}
                          >
                            <RadioGroupItem
                              value={option.value}
                              className="sr-only"
                            />
                            <span>{option.label}</span>
                          </label>
                        );
                      })}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Party Size */}
            {attendance === "attending" && (
              <FormField
                control={form.control}
                name="partySize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-heading text-text-main text-sm font-normal">
                      Jumlah Tamu Hadir:
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        max={10}
                        disabled={isSubmitting}
                        className="bg-white/80 border-black/15 h-11 text-base text-text-main"
                        name={field.name}
                        ref={field.ref}
                        onBlur={field.onBlur}
                        value={field.value ?? 1}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            )}

            <div className="pt-3 text-center">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#6c7278] text-text-alt font-body hover:bg-[#5a6066] inline-flex h-11 w-full items-center justify-center rounded-[4px] px-8 text-base shadow-sm transition-all duration-300 hover:shadow-md active:scale-[0.98] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  "Kirim Konfirmasi"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </SectionReveal>
    </section>
  );
}
