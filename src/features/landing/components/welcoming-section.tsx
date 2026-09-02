"use client";

import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WEDDING_CONFIG } from "../lib/constants";
import { SectionReveal } from "./section-reveal";

export function WelcomingSection() {
  const scrollToNext = () => {
    const nextSection = document.getElementById("story");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-between overflow-hidden px-6 py-12 text-center">
      {/* Background Image on Sailboat */}
      <Image
        src="/assets/welcoming-portrait.png"
        alt="Ricky dan Fellycia"
        fill
        priority
        sizes="(max-width: 768px) 100vw, 40vw"
        className="object-cover object-top"
      />
      <div className="bg-bg-overlay/30 absolute inset-0" aria-hidden />

      {/* Top Section */}
      <div className="relative z-10 w-full" />

      {/* Center Content */}
      <SectionReveal className="text-text-alt relative z-10 flex flex-col items-center">
        <h2 className="font-heading flex items-center text-3xl font-normal tracking-wide sm:text-4xl">
          {WEDDING_CONFIG.groomName.toUpperCase()}
          <span className="font-script mx-2 text-[44px] font-light lowercase">
            and
          </span>
          {WEDDING_CONFIG.brideName.toUpperCase()}
        </h2>
        <p className="font-body text-text-alt/90 mt-2 text-base italic tracking-wider">
          {WEDDING_CONFIG.hashtag}
        </p>
      </SectionReveal>

      {/* Bottom Scroll Down Arrow Pill */}
      <div className="relative z-10">
        <Button
          type="button"
          variant="outline"
          onClick={scrollToNext}
          aria-label="Gulir ke bagian berikutnya"
          className="border-text-alt/70 text-text-alt hover:bg-white/10 bg-transparent flex h-11 w-7 items-center justify-center rounded-full border p-0 transition-all duration-300 hover:scale-105"
        >
          <ArrowDown className="size-4 animate-bounce" />
        </Button>
      </div>
    </section>
  );
}
