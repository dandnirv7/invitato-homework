"use client";

import { Menu, X, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const links = [
  { href: "#access-card", label: "Kartu Akses" },
  { href: "#couple", label: "Mempelai" },
  { href: "#events", label: "Detail Acara" },
  { href: "#rsvp", label: "RSVP" },
  { href: "#livestreaming", label: "Siaran Langsung" },
  { href: "#gift", label: "Tanda Kasih" },
];

export function NavigationControls() {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState<"id" | "en">("id");

  const toggleLanguage = () => {
    setLang((prev) => (prev === "id" ? "en" : "id"));
  };

  return (
    <>
      {/* Bottom Left Hamburger Menu Button */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
        aria-expanded={isOpen}
        className="bg-text-main/90 text-text-alt hover:bg-text-main fixed bottom-5 left-5 z-50 flex size-10 items-center justify-center rounded-full shadow-md backdrop-blur-xs transition-transform duration-300 hover:scale-105 active:scale-95 lg:left-6"
      >
        {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </Button>

      {/* Bottom Right Language Switcher */}
      <Button
        type="button"
        variant="ghost"
        onClick={toggleLanguage}
        aria-label="Ganti Bahasa"
        className="bg-[#566068]/90 text-text-alt hover:bg-[#566068] fixed bottom-5 right-5 z-40 flex h-9 items-center gap-1.5 rounded-full px-3.5 text-xs font-semibold tracking-wider shadow-md backdrop-blur-xs transition-transform duration-300 hover:scale-105 active:scale-95"
      >
        <Globe className="size-3.5" />
        <span>{lang.toUpperCase()}</span>
      </Button>

      {/* Sliding Navigation Drawer from Right */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          open={isOpen}
          onOpenChange={setIsOpen}
          className="bg-[#2c3f4e] text-white px-8 py-10"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-right"
          >
            <h2 className="font-heading text-2xl tracking-wide sm:text-3xl">
              RICKY <span className="font-script text-3xl font-light">and</span> FELLYCIA
            </h2>
          </motion.div>

          {/* Links List with horizontal dividing lines */}
          <nav className="mt-12 w-full" aria-label="Bagian undangan">
            <ul className="divide-y divide-white/20">
              {links.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.15 + index * 0.05,
                    duration: 0.4,
                  }}
                >
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="font-heading flex h-14 items-center justify-end text-right text-sm tracking-[0.2em] uppercase transition-colors hover:text-[#d5dade]"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* Drawer Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="font-body text-white/70 mt-auto pt-10 text-right text-xs leading-relaxed"
          >
            <p>Created with Love by Invitato</p>
            <p className="mt-1">2026 Ricky &amp; Fellycia</p>
            <p>All Rights Reserved</p>
          </motion.div>
        </SheetContent>
      </Sheet>
    </>
  );
}
