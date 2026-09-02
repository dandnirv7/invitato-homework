"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { WEDDING_CONFIG } from "../lib/constants";
import { INVITATION_OPENED_EVENT } from "./audio-player";

interface CoverSectionProps {
  guestName?: string;
}

export function CoverSection({ guestName = "Invitato" }: CoverSectionProps) {
  const [opened, setOpened] = useState(false);
  const [exited, setExited] = useState(false);

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useEffect(() => {
    if (opened) return;

    window.scrollTo(0, 0);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [opened]);

  const handleOpen = () => {
    window.scrollTo(0, 0);
    setOpened(true);
    window.dispatchEvent(new Event(INVITATION_OPENED_EVENT));
  };

  if (exited) {
    return <CoverRail />;
  }

  return (
    <>
      <motion.section
        aria-hidden={opened}
        className="bg-bg-overlay fixed inset-0 z-50 flex flex-col items-center justify-between overflow-hidden px-6 py-12 text-center"
        animate={opened ? { y: "-100%" } : { y: 0 }}
        transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1] }}
        onAnimationComplete={() => {
          if (opened) setExited(true);
        }}
      >
        <Image
          src="/assets/welcoming-portrait.png"
          alt="Foto Ricky dan Fellycia"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
        <div className="bg-bg-overlay/40 absolute inset-0" aria-hidden />

        {/* Top Spacer */}
        <div className="relative z-10 w-full" />

        {/* Center Content */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="text-text-alt relative z-10 flex flex-col items-center px-6 text-center"
        >
          <p className="font-heading text-xs tracking-[0.4em] uppercase opacity-90">
            The Wedding of
          </p>
          <h1 className="font-heading mt-4 flex items-center justify-center text-4xl leading-tight sm:text-5xl">
            {WEDDING_CONFIG.groomName.toUpperCase()}
            <span className="font-script mx-2.5 text-[52px] font-light lowercase sm:text-[60px]">
              and
            </span>
            {WEDDING_CONFIG.brideName.toUpperCase()}
          </h1>
          <p className="font-body text-text-alt/90 mt-2 text-sm italic tracking-wider">
            {WEDDING_CONFIG.hashtag}
          </p>

          <div className="font-body mt-6 space-y-1">
            <p className="text-xs tracking-wider opacity-80 uppercase">Kepada Yth. Bapak/Ibu/Saudara/i</p>
            <p className="font-heading text-lg font-medium tracking-wide">
              {guestName}
            </p>
          </div>
        </motion.div>

        {/* Bottom Open Invitation Action Pill */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative z-10 flex flex-col items-center gap-2"
        >
          <Button
            type="button"
            variant="outline"
            onClick={handleOpen}
            aria-label="Buka Undangan"
            className="border-text-alt/80 text-text-alt hover:bg-white/15 bg-transparent group flex h-auto flex-col items-center gap-2 rounded-full border px-6 py-2.5 shadow-lg backdrop-blur-xs transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span className="font-heading text-xs tracking-[0.25em] uppercase">
              Buka Undangan
            </span>
            <div className="flex h-5 w-5 items-center justify-center">
              <span className="text-sm transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
            </div>
          </Button>
        </motion.div>
      </motion.section>

      {/* Desktop Left Rail rendered under cover while closed */}
      <CoverRail />
    </>
  );
}

function CoverRail() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-[60vw] overflow-hidden lg:block">
      <Image
        src="/assets/desktop-landscape.png"
        alt="The Wedding of Ricky & Fellycia"
        fill
        priority
        sizes="60vw"
        className="object-cover object-center"
      />
      <div className="text-text-main absolute inset-0 flex flex-col justify-start bg-black/5 p-[4.5vw]">
        <p className="font-heading text-[1.1vw] tracking-[0.25em] uppercase opacity-85">
          THE WEDDING OF
        </p>
        <h2 className="font-heading mt-3 flex items-center text-[clamp(2.5rem,4vw,4.5rem)] leading-none font-normal tracking-wide">
          {WEDDING_CONFIG.groomName}
          <span className="font-script mx-3 text-[1.25em] font-light">
            and
          </span>
          {WEDDING_CONFIG.brideName}
        </h2>
        <p className="font-body text-text-main/90 mt-8 max-w-[24vw] text-[1.25vw] leading-[1.6]">
          &ldquo;{WEDDING_CONFIG.bibleVerseId.quote}&rdquo;
        </p>
        <p className="font-heading text-text-main/80 mt-3 text-[0.9vw] tracking-wider uppercase">
          — {WEDDING_CONFIG.bibleVerseId.source}
        </p>
      </div>
    </aside>
  );
}
