"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SectionReveal } from "./section-reveal";
import { GiftModal } from "./gift-modal";

export function GiftSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section id="gift" className="px-6 py-16 text-center">
        <SectionReveal className="flex flex-col items-center">
          {/* Top circle ornament */}
          <div className="mb-4 flex size-10 items-center justify-center opacity-70">
            <Image
              src="/assets/love-story-ornament.svg"
              alt=""
              width={28}
              height={28}
              className="size-7 object-contain"
            />
          </div>

          <h2 className="font-heading text-text-muted text-2xl tracking-[0.2em] uppercase sm:text-3xl">
            TANDA KASIH
          </h2>

          <p className="font-body text-text-main mx-auto mt-4 max-w-sm text-[16px] leading-relaxed sm:text-[17px]">
            Bagi yang ingin memberikan tanda kasih, dapat mengirimkan melalui
            fitur di bawah ini:
          </p>

          <Button
            type="button"
            onClick={() => setModalOpen(true)}
            className="bg-[#6c7278] text-text-alt font-body hover:bg-[#5a6066] mt-6 inline-flex h-10 items-center justify-center rounded-[4px] px-7 text-[15px] shadow-sm transition-all duration-300 hover:shadow-md active:scale-[0.98]"
          >
            Kirim Hadiah
          </Button>
        </SectionReveal>
      </section>

      <GiftModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
}
