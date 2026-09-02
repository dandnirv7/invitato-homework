import { MapPin } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { WEDDING_CONFIG } from "../lib/constants";
import { SectionReveal } from "./section-reveal";

export function LocationSection() {
  return (
    <section id="location" className="px-6 py-20">
      <SectionReveal className="text-center">
        <p className="font-script text-accent-brand text-2xl">
          Where to Find Us
        </p>
        <h2 className="font-heading mt-2 text-3xl">Lokasi Acara</h2>
        <p className="font-heading mt-6 text-lg">{WEDDING_CONFIG.reception.venueName}</p>
        <p className="font-body text-text-muted mt-1 text-base">
          {WEDDING_CONFIG.reception.venueAddress}
        </p>
      </SectionReveal>

      <SectionReveal className="mt-10" delay={0.1}>
        <div className="overflow-hidden rounded-sm shadow-sm">
          <iframe
            src={WEDDING_CONFIG.mapsEmbedUrl}
            title="Peta lokasi acara pernikahan"
            className="h-72 w-full border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <a
          href={WEDDING_CONFIG.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "font-heading border-accent-brand text-accent-brand mt-6 flex h-12 w-full rounded-full text-sm tracking-[0.25em] uppercase",
          )}
        >
          <MapPin className="size-4" />
          Buka di Google Maps
        </a>
      </SectionReveal>
    </section>
  );
}
