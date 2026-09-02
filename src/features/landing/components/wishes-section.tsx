"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { getWishes } from "../api/get-wishes";
import { submitWish } from "../api/submit-wish";
import { wishSchema } from "../lib/schemas";
import { formatRelativeTime } from "../lib/format-relative-time";
import type { Wish } from "../types";
import { SectionReveal } from "./section-reveal";

type WishFormValues = z.input<typeof wishSchema>;
type ListStatus = "loading" | "ready" | "error";

interface WishesSectionProps {
  guestName?: string;
}

const PINNED_WISHES = [
  {
    id: 999999,
    name: "Invitato",
    message:
      "Hi, Bride & Groom. Kami dari Invitato ingin mengucapkan selamat untuk pernikahannya, ya! Semoga menjadi keluarga yang bahagia dan penuh kasih sayang. 💜",
    created_at: "2024-09-12T16:56:00.000Z",
  },
  {
    id: 999998,
    name: "Invitato Team",
    message:
      "May your love continue to grow each and every year. Best wishes on your wedding Bride & Groom. Thank you for trusting Invitato for your website invitation 💜",
    created_at: "2025-04-13T02:41:00.000Z",
  },
];

export function WishesSection({ guestName }: WishesSectionProps) {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [status, setStatus] = useState<ListStatus>("loading");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<WishFormValues>({
    resolver: zodResolver(wishSchema),
    defaultValues: { name: guestName || "", message: "" },
  });

  useEffect(() => {
    if (guestName) {
      form.setValue("name", guestName);
    }
  }, [guestName, form]);

  useEffect(() => {
    let ignore = false;
    getWishes()
      .then((data) => {
        if (!ignore) {
          setWishes(data);
          setStatus("ready");
        }
      })
      .catch(() => {
        if (!ignore) {
          setStatus("error");
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  const onSubmit = form.handleSubmit(async (values) => {
    setIsSubmitting(true);

    try {
      const saved = await submitWish(values);
      setWishes((previous) => [saved, ...previous]);
      setStatus("ready");
      toast.success("Ucapan Anda telah terkirim. Terima kasih!");
      form.reset({ name: guestName || "", message: "" });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const data = error.response?.data as
          { errors?: Record<string, string[]>; error?: string } | undefined;

        if (data?.errors) {
          for (const [field, messages] of Object.entries(data.errors)) {
            if (messages?.length) {
              form.setError(field as keyof WishFormValues, {
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

  const allWishes = [...wishes, ...PINNED_WISHES];

  return (
    <section id="wishes" className="bg-bg-primary px-6 py-16 text-center">
      <SectionReveal>
        <h2 className="font-heading text-text-muted text-2xl tracking-[0.25em] uppercase sm:text-3xl">
          DOA &amp; UCAPAN
        </h2>
        <p className="font-body text-text-main mx-auto mt-4 max-w-sm text-base leading-relaxed">
          Silakan kirimkan doa dan ucapan yang tulus untuk kami:
        </p>
      </SectionReveal>

      {/* Wishes Form */}
      <SectionReveal className="mt-8 text-left" delay={0.1}>
        <Form {...form}>
          <form
            onSubmit={onSubmit}
            aria-busy={isSubmitting}
            className="mx-auto max-w-md space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-heading text-text-main text-sm font-normal">
                    Nama Anda:
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nama Anda"
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

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-heading text-text-main text-sm font-normal">
                    Untuk Ricky &amp; Fellycia...
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="..."
                      disabled={isSubmitting}
                      rows={3}
                      className="bg-white/80 border-black/15 resize-none text-base text-text-main"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <div className="flex justify-end pt-1">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#6c7278] text-text-alt font-body hover:bg-[#5a6066] inline-flex h-9 items-center justify-center rounded-[4px] px-6 text-sm shadow-xs transition-colors disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 size-3.5 animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  "Kirim"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </SectionReveal>

      {/* Wishes Feed List Container */}
      <SectionReveal className="mt-8 text-left" delay={0.2}>
        <div className="mx-auto max-w-md overflow-hidden rounded-md border border-black/10 bg-white/70 shadow-xs">
          <div
            className="max-h-80 space-y-3 overflow-y-auto p-4 scrollbar-thin"
            role="feed"
            aria-label="Daftar ucapan dan doa untuk mempelai"
          >
            {status === "loading" && wishes.length === 0 ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="size-6 animate-spin text-text-muted" />
              </div>
            ) : allWishes.length === 0 ? (
              <p className="font-body text-text-muted py-8 text-center text-sm">
                Belum ada ucapan. Jadilah yang pertama mengirimkan ucapan!
              </p>
            ) : (
              allWishes.map((wish) => (
                <article
                  key={wish.id}
                  className="rounded-md border border-black/5 bg-white/90 p-3.5 shadow-2xs transition-colors"
                >
                  <h4 className="font-heading text-text-main text-sm font-semibold">
                    {wish.name}
                  </h4>
                  <p className="font-body text-text-main/90 mt-1.5 text-sm leading-relaxed whitespace-pre-wrap">
                    {wish.message}
                  </p>
                  <p className="font-body text-text-muted mt-2 text-[11px]">
                    {formatRelativeTime(wish.created_at)}
                  </p>
                </article>
              ))
            )}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
