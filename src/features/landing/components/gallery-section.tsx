"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play, Maximize2, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useReducedMotion, AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SectionReveal } from "./section-reveal";
import { cn } from "@/lib/utils";

const photos = [
  {
    src: "/assets/1.jpg",
    alt: "Ricky & Fellycia Moments 1",
  },
  {
    src: "/assets/2.jpg",
    alt: "Ricky & Fellycia Moments 2",
  },
  {
    src: "/assets/3.jpg",
    alt: "Ricky & Fellycia Moments 3",
  },
  {
    src: "/assets/4.jpg",
    alt: "Ricky & Fellycia Moments 4",
  },
  {
    src: "/assets/5.jpg",
    alt: "Ricky & Fellycia Moments 5",
  },
  {
    src: "/assets/gallery-1.png",
    alt: "Ricky & Fellycia Moments 6",
  },
  {
    src: "/assets/gallery-2.png",
    alt: "Ricky & Fellycia Moments 7",
  },
  {
    src: "/assets/gallery-3.png",
    alt: "Ricky & Fellycia Moments 8",
  },
] as const;

const slideVariants = {
  enter: (direction: number) => ({
    x: direction >= 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction >= 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

export function GallerySection() {
  const [[activeIndex, direction], setActiveSlide] = useState<[number, number]>([0, 1]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const goToSlide = useCallback((newIndex: number) => {
    setActiveSlide(([current]) => {
      const normalized = (newIndex + photos.length) % photos.length;
      const dir = normalized >= current ? 1 : -1;
      return [normalized, dir];
    });
  }, []);

  const goToPrevious = useCallback(() => {
    setActiveSlide(([current]) => [
      (current - 1 + photos.length) % photos.length,
      -1,
    ]);
  }, []);

  const goToNext = useCallback(() => {
    setActiveSlide(([current]) => [
      (current + 1) % photos.length,
      1,
    ]);
  }, []);

  useEffect(() => {
    if (!isPlaying || prefersReducedMotion || lightboxOpen) return;

    const interval = window.setInterval(goToNext, 4500);
    return () => window.clearInterval(interval);
  }, [goToNext, isPlaying, prefersReducedMotion, lightboxOpen]);

  return (
    <>
      <section id="gallery" className="bg-bg-primary px-6 py-16">
        <SectionReveal className="text-center">
          <h2 className="font-heading text-text-muted text-2xl tracking-[0.25em] uppercase sm:text-3xl">
            GALLERY
          </h2>
        </SectionReveal>

        <SectionReveal className="mt-8" delay={0.1}>
          {/* Main Carousel Card */}
          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="Galeri foto Ricky dan Fellycia"
            className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-black/10 shadow-lg outline-1 outline-black/10"
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") goToPrevious();
              if (event.key === "ArrowRight") goToNext();
            }}
            tabIndex={0}
          >
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={photos[activeIndex].src}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "tween", ease: [0.32, 0.72, 0, 1], duration: 0.55 },
                  opacity: { duration: 0.35 },
                }}
                className="absolute inset-0 cursor-pointer"
                onClick={() => setLightboxOpen(true)}
              >
                <Image
                  src={photos[activeIndex].src}
                  alt={photos[activeIndex].alt}
                  fill
                  priority={activeIndex === 0}
                  sizes="(max-width: 768px) 100vw, 448px"
                  className="object-cover transition-transform duration-700 hover:scale-[1.02]"
                />
              </motion.div>
            </AnimatePresence>

            {/* Lightbox hint icon on hover */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setLightboxOpen(true)}
              aria-label="Perbesar foto"
              className="text-text-alt absolute top-3 right-3 z-10 flex size-8 items-center justify-center rounded-full bg-black/30 backdrop-blur-xs opacity-0 transition-opacity duration-300 hover:bg-black/50 group-hover:opacity-100"
            >
              <Maximize2 className="size-4" />
            </Button>

            {/* Left Chevron */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              aria-label="Foto sebelumnya"
              className="text-text-alt absolute top-1/2 left-3 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/25 backdrop-blur-xs transition-all duration-300 hover:scale-105 hover:bg-black/50 active:scale-95"
            >
              <ChevronLeft className="size-5" />
            </Button>

            {/* Right Chevron */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              aria-label="Foto berikutnya"
              className="text-text-alt absolute top-1/2 right-3 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/25 backdrop-blur-xs transition-all duration-300 hover:scale-105 hover:bg-black/50 active:scale-95"
            >
              <ChevronRight className="size-5" />
            </Button>

            {/* Play/Pause Button */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                setIsPlaying(!isPlaying);
              }}
              aria-label={isPlaying ? "Jeda galeri foto" : "Putar galeri foto"}
              className="text-text-alt absolute bottom-3 left-3 z-10 flex size-8 items-center justify-center rounded-full bg-black/35 backdrop-blur-xs transition-transform duration-300 hover:scale-105 hover:bg-black/50 active:scale-95"
            >
              {isPlaying ? (
                <Pause className="size-4" />
              ) : (
                <Play className="size-4 fill-current pl-0.5" />
              )}
            </Button>
          </div>

          {/* Thumbnail Navigation Strip */}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {photos.map((photo, index) => (
              <Button
                key={photo.src}
                type="button"
                variant="ghost"
                onClick={() => goToSlide(index)}
                aria-label={`Lihat foto ${index + 1}`}
                className={cn(
                  "relative aspect-[4/5] h-16 w-auto shrink-0 overflow-hidden rounded-md p-0 transition-all duration-300 hover:bg-transparent",
                  activeIndex === index
                    ? "ring-2 ring-text-main opacity-100 scale-105 shadow-xs"
                    : "opacity-60 hover:opacity-90"
                )}
              >
                <Image
                  src={photo.src}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </Button>
            ))}
          </div>
        </SectionReveal>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setLightboxOpen(false)}
              aria-label="Tutup lightbox"
              className="absolute top-4 right-4 z-50 flex size-10 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30 hover:text-white"
            >
              <X className="size-6" />
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={goToPrevious}
              aria-label="Foto sebelumnya"
              className="absolute left-4 top-1/2 z-50 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30 hover:text-white"
            >
              <ChevronLeft className="size-7" />
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={goToNext}
              aria-label="Foto berikutnya"
              className="absolute right-4 top-1/2 z-50 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30 hover:text-white"
            >
              <ChevronRight className="size-7" />
            </Button>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="relative max-h-[85vh] max-w-[85vw] aspect-[4/5] overflow-hidden rounded-xl"
            >
              <Image
                src={photos[activeIndex].src}
                alt={photos[activeIndex].alt}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
