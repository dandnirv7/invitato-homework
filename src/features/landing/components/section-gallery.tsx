"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useInvitation } from "../i18n/invitation-provider";
import { wedding } from "../lib/wedding-data";
import { Reveal } from "./reveal";

const arrowClass =
  "absolute top-1/2 z-[4] flex h-[138px] w-[34px] -translate-y-1/2 cursor-pointer items-center justify-center bg-transparent p-0 text-text-main transition-opacity duration-200 hover:opacity-60";

/**
 * Section 6. Measured on the live reference: h 945.8 desktop / 839.9 mobile,
 * bg #D5DADE, padding 64px 24px 46px. Slide 384.2 x 576.5 radius 16, thumbnails
 * 75 x 50 radius 8, arrow buttons 34 x 138 centred on the slide's vertical middle.
 * `curve.svg` overflows 66.2px above the section box.
 *
 * The reference bundles react-image-lightbox CSS but never opens a lightbox, so
 * none is implemented here either.
 */
export function SectionGallery() {
  const { t } = useInvitation();
  const slides = wedding.portraits;
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="relative flex flex-col items-center bg-bg-primary px-6 pt-16 pb-[46px] text-center">
      <Image
        src="/assets/curve.svg"
        alt=""
        width={495}
        height={328.5}
        aria-hidden
        className="pointer-events-none absolute -top-[66.2px] left-1/2 h-auto w-[495px] max-w-full -translate-x-1/2"
      />

      <Reveal className="flex w-full flex-col items-center text-center">
        <h2 className="w-full font-heading text-[19px] leading-[19px] text-text-muted uppercase">
          {t.gallery.title}
        </h2>

        <p className="mt-3 flex flex-wrap items-start justify-center font-heading text-h2 leading-[39px] text-text-muted normal-case">
          {t.groomShort}
          <span className="mx-2 -mt-3 font-script text-[66px] leading-[79.2px] font-normal normal-case">
            and
          </span>
          {t.brideShort}
        </p>

        <p className="mt-2 w-full font-body text-body leading-[28.5px] font-medium text-text-main">
          {t.gallery.quote}
        </p>
        <p className="w-full font-body text-[18px] leading-[21.6px] font-light text-text-main">
          {wedding.hashtag}
        </p>
      </Reveal>

      <div className="relative mt-[26px] w-full">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {slides.map((src, index) => (
              <div
                key={src}
                className="flex min-w-0 shrink-0 grow-0 basis-full justify-center"
              >
                <div className="relative aspect-[2/3] w-[384.2px] max-w-full overflow-hidden rounded-[16px]">
                  <Image
                    src={src}
                    alt={`${t.gallery.title} ${index + 1}`}
                    fill
                    sizes="384px"
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          aria-label={t.gallery.previous}
          className={`${arrowClass} left-0`}
          onClick={() => emblaApi?.scrollPrev()}
        >
          <ChevronLeft className="size-6" aria-hidden />
        </button>
        <button
          type="button"
          aria-label={t.gallery.next}
          className={`${arrowClass} right-0`}
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
