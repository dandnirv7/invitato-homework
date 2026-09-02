import { ExternalLink, Play } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SectionReveal } from "./section-reveal";

interface VideoSectionProps {
  id: string;
  title: string;
  embedUrl: string;
  watchUrl: string;
}

export function VideoSection({
  id,
  title,
  embedUrl,
  watchUrl,
}: VideoSectionProps) {
  return (
    <section id={id} className="px-6 py-20">
      <SectionReveal className="text-center">
        <h2 className="font-heading text-3xl tracking-[0.08em] uppercase">
          {title}
        </h2>
      </SectionReveal>

      <SectionReveal className="mt-10" delay={0.1}>
        <div className="overflow-hidden rounded-xl shadow-sm outline outline-1 outline-black/10">
          <iframe
            src={embedUrl}
            title="Video of Ricky & Fellycia"
            className="aspect-video w-full border-0"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>

        <p className="font-body text-text-main mx-auto mt-8 max-w-sm text-center text-xl leading-relaxed">
          Should you have any issues with video above, then please click on the
          button below instead:
        </p>

        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({ variant: "secondary" }),
            "font-heading mx-auto mt-6 flex h-12 w-fit rounded-lg px-6 text-sm tracking-wide uppercase shadow-sm transition-transform duration-300 hover:-translate-y-0.5 active:scale-[0.96]",
          )}
        >
          <Play className="size-4 fill-current" />
          Buka via YouTube
          <ExternalLink className="size-3.5" />
        </a>
      </SectionReveal>
    </section>
  );
}
