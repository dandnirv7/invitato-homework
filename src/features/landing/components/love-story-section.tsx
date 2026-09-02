"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SectionReveal } from "./section-reveal";
import { LoveStoryModal } from "./love-story-modal";

export function LoveStorySection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section
        id="love-story"
        className="bg-bg-primary relative overflow-hidden px-6 pt-6 pb-16 text-center"
      >
        {/* Top corner accent bars matching reference */}
        <div
          className="bg-text-main absolute top-0 left-0 h-12 w-20 rounded-br-[2rem] sm:h-14 sm:w-28"
          aria-hidden
        />
        <div
          className="bg-text-main absolute top-0 right-0 h-12 w-20 rounded-bl-[2rem] sm:h-14 sm:w-28"
          aria-hidden
        />

        <SectionReveal className="flex flex-col items-center">
          {/* Ornament icon placed at the top, centered in the gap between the two bars */}
          <div className="flex h-12 items-center justify-center">
            <Image
              src="/assets/love-story-ornament.svg"
              alt=""
              width={32}
              height={32}
              className="size-8 object-contain opacity-75 sm:size-9"
            />
          </div>

          {/* Heading in muted grey serif */}
          <h2 className="font-heading text-text-muted mt-5 text-[28px] font-normal tracking-[0.25em] uppercase sm:text-[32px]">
            LOVE STORY
          </h2>

          {/* Subtitle */}
          <p className="font-body text-text-main mx-auto mt-3 max-w-[20rem] text-[17px] leading-relaxed sm:text-[18px]">
            Baca dan ikuti perjalanan cinta kami sebagai pasangan di sini:
          </p>

          {/* Button opening modal */}
          <Button
            type="button"
            onClick={() => setModalOpen(true)}
            className="bg-[#6c7278] text-text-alt font-body hover:bg-[#5a6066] mt-6 inline-flex h-10 items-center justify-center rounded-[4px] px-6 text-[15px] shadow-sm transition-all duration-300 hover:shadow-md active:scale-[0.98]"
          >
            Kisah Cinta Kami
          </Button>
        </SectionReveal>
      </section>

      <LoveStoryModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
}
