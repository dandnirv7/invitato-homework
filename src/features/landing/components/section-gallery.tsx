"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useInvitation } from "../i18n/invitation-provider";
import { wedding } from "../lib/wedding-data";
import { Reveal } from "./reveal";

export function SectionGallery() {
  const { t } = useInvitation();
  const slides = wedding.portraits;
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });
  const [selected, setSelected] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi || !isPlaying) return;
    const interval = window.setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);
    return () => window.clearInterval(interval);
  }, [emblaApi, isPlaying]);

  return (
    <section className="bg-bg-primary relative flex flex-col items-center overflow-hidden px-6 pt-16 pb-[46px] text-center">
      <Image
        src="/assets/curve.svg"
        alt=""
        width={540}
        height={360}
        aria-hidden
        className="pointer-events-none absolute -top-10 -right-12 z-0 h-auto w-[520px] max-w-none opacity-40"
      />

      <Reveal className="relative z-10 flex w-full flex-col items-center text-center">
        <h2 className="font-heading text-text-muted w-full text-[19px] leading-[19px] uppercase">
          {t.gallery.title}
        </h2>

        <p className="font-heading text-h2 text-text-muted mt-3 flex flex-wrap items-center justify-center leading-[39px] normal-case">
          <span
            className="bg-text-muted/60 mr-2 inline-block h-px w-6"
            aria-hidden
          />
          {t.groomShort}
          <span className="font-script mx-2 -mt-3 text-[66px] leading-[79.2px] font-normal normal-case">
            and
          </span>
          {t.brideShort}
        </p>

        <p className="font-body text-body text-text-main mt-2 w-full leading-[28.5px] font-medium">
          {t.gallery.quote}
        </p>
        <p className="font-body text-text-main w-full text-[18px] leading-[21.6px] font-light">
          {wedding.hashtag}
        </p>
      </Reveal>

      <div className="relative z-10 mx-auto mt-[26px] w-[384.2px] max-w-full">
        <div className="overflow-hidden rounded-[16px]" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {slides.map((src, index) => (
              <div
                key={src}
                className="flex min-w-0 shrink-0 grow-0 basis-full justify-center"
              >
                <div className="relative aspect-[2/3] w-full max-w-full overflow-hidden">
                  <Image
                    src={src}
                    alt={`${t.gallery.title} ${index + 1}`}
                    fill
                    sizes="384px"
                    className="object-cover"
                  />
                  {index === selected ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsPlaying(!isPlaying);
                      }}
                      aria-label={
                        isPlaying ? "Pause slideshow" : "Play slideshow"
                      }
                      className="absolute bottom-4 left-4 z-5 flex size-8 cursor-pointer items-center justify-center rounded bg-black/40 text-white backdrop-blur-xs transition-opacity hover:opacity-80"
                    >
                      {isPlaying ? (
                        <Pause className="size-4" fill="currentColor" />
                      ) : (
                        <Play className="size-4" fill="currentColor" />
                      )}
                    </button>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          aria-label={t.gallery.previous}
          className="absolute top-1/2 left-2 z-6 -translate-y-1/2 cursor-pointer p-1 text-white/70 drop-shadow-md transition hover:text-white"
          onClick={() => emblaApi?.scrollPrev()}
        >
          <ChevronLeft className="size-6" aria-hidden />
        </button>
        <button
          type="button"
          aria-label={t.gallery.next}
          className="absolute top-1/2 right-2 z-6 -translate-y-1/2 cursor-pointer p-1 text-white/70 drop-shadow-md transition hover:text-white"
          onClick={() => emblaApi?.scrollNext()}
        >
          <ChevronRight className="size-6" aria-hidden />
        </button>
      </div>

      <div className="mt-[9px] flex justify-center gap-2">
        {slides.map((src, index) => (
          <button
            key={src}
            type="button"
            aria-label={`${t.gallery.title} ${index + 1}`}
            aria-current={index === selected}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-[50px] w-[75px] cursor-pointer overflow-hidden rounded-[8px] p-0 transition-opacity duration-200 ${
              index === selected ? "opacity-100" : "opacity-60"
            }`}
          >
            <Image
              src={src}
              alt=""
              width={75}
              height={50}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </section>
  );
}
