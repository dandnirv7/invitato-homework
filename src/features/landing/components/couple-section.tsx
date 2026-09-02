"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaInstagram } from "react-icons/fa6";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { WEDDING_CONFIG } from "../lib/constants";
import { SectionReveal } from "./section-reveal";

interface CouplePhotoStackProps {
  src: string;
  alt: string;
  priority?: boolean;
}

function CouplePhotoStack({ src, alt, priority = false }: CouplePhotoStackProps) {
  return (
    <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[380px]">
      {/* Card/Image yang belakang: transisi dari kiri ke kanan */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -inset-2.5 rounded-none bg-white/70 shadow-sm sm:-inset-3.5 md:-inset-4"
        aria-hidden
      />

      {/* Card/Image yang di depan: transisi dari bawah ke atas, nonrounded, 4:3 */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="relative aspect-[4/3] w-full overflow-hidden rounded-none bg-black/5 shadow-md"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 85vw, 380px"
          className="rounded-none object-cover object-top"
          priority={priority}
        />
      </motion.div>
    </div>
  );
}

export function CoupleSection() {
  return (
    <section id="couple" className="bg-bg-primary px-6 py-16 text-center">
      <SectionReveal>
        <h2 className="font-heading text-main-asset text-2xl tracking-[0.25em] uppercase sm:text-3xl">
          SANG MEMPELAI
        </h2>
      </SectionReveal>

      {/* Groom */}
      <div className="mt-12 flex flex-col items-center">
        <CouplePhotoStack
          src="/assets/groom.png"
          alt={WEDDING_CONFIG.groomFullName}
          priority
        />

        <SectionReveal delay={0.2} className="mt-8 flex flex-col items-center">
          <h3 className="font-heading text-text-main text-2xl leading-[1.2] sm:text-3xl">
            {WEDDING_CONFIG.groomFullName}
          </h3>

          <p className="font-body text-text-muted mt-3 text-base sm:text-lg">
            Putra dari
          </p>
          <p className="font-body text-text-main text-base sm:text-lg">
            Bapak Parent Man
          </p>
          <span className="font-and text-text-muted my-0.5 text-xl leading-none">&amp;</span>
          <p className="font-body text-text-main text-base sm:text-lg">
            Ibu Parent Lady
          </p>

          <a
            href={WEDDING_CONFIG.groomIg}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "default", size: "sm" }),
              "bg-[#6c7278] hover:bg-[#5a6066] text-white font-body mt-5 inline-flex h-9 items-center justify-center gap-2 rounded-[4px] px-5 text-sm shadow-xs transition-colors"
            )}
          >
            <FaInstagram className="size-3.5" />
            {WEDDING_CONFIG.groomIgHandle}
          </a>
        </SectionReveal>
      </div>

      {/* Ornament SVG before Bride */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="my-14 flex items-center justify-center"
      >
        <div className="relative size-8 opacity-70">
          <Image
            src="/assets/love-story-ornament.svg"
            alt="Divider Ornament"
            width={32}
            height={32}
            className="size-8 object-contain"
          />
        </div>
      </motion.div>

      {/* Bride */}
      <div className="flex flex-col items-center">
        <CouplePhotoStack
          src="/assets/bride.png"
          alt={WEDDING_CONFIG.brideFullName}
        />

        <SectionReveal delay={0.2} className="mt-8 flex flex-col items-center">
          <h3 className="font-heading text-text-main text-2xl leading-[1.2] sm:text-3xl">
            {WEDDING_CONFIG.brideFullName}
          </h3>

          <p className="font-body text-text-muted mt-3 text-base sm:text-lg">
            Putri dari
          </p>
          <p className="font-body text-text-main text-base sm:text-lg">
            Bapak Parent Man
          </p>
          <span className="font-and text-text-muted my-0.5 text-xl leading-none">&amp;</span>
          <p className="font-body text-text-main text-base sm:text-lg">
            Ibu Parent Lady
          </p>

          <a
            href={WEDDING_CONFIG.brideIg}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "default", size: "sm" }),
              "bg-[#6c7278] hover:bg-[#5a6066] text-white font-body mt-5 inline-flex h-9 items-center justify-center gap-2 rounded-[4px] px-5 text-sm shadow-xs transition-colors"
            )}
          >
            <FaInstagram className="size-3.5" />
            {WEDDING_CONFIG.brideIgHandle}
          </a>
        </SectionReveal>
      </div>
    </section>
  );
}
