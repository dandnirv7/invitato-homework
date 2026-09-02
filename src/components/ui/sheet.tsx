"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function Sheet({ open, onOpenChange, children }: SheetProps) {
  React.useEffect(() => {
    if (!open) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", handleEsc);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.documentElement.style.overflow = "";
    };
  }, [open, onOpenChange]);

  return <>{children}</>;
}

export function SheetTrigger({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return <span onClick={onClick}>{children}</span>;
}

export function SheetOverlay({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="bg-bg-overlay/40 fixed inset-0 z-30 backdrop-blur-[2px]"
          onClick={() => onOpenChange(false)}
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />
      )}
    </AnimatePresence>
  );
}

export function SheetContent({
  open,
  onOpenChange,
  className,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="bg-bg-overlay/40 fixed inset-0 z-30 backdrop-blur-[2px]"
            onClick={() => onOpenChange(false)}
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Navigasi undangan"
            className={cn(
              "bg-text-main text-text-alt fixed inset-y-0 right-0 z-40 flex w-8/12 flex-col overflow-y-auto shadow-2xl",
              className
            )}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
