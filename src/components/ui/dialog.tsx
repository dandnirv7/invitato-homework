"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
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

export function DialogContent({
  open,
  onOpenChange,
  className,
  children,
  showCloseButton = true,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
}) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            className="bg-bg-overlay/60 fixed inset-0 backdrop-blur-xs"
            onClick={() => onOpenChange(false)}
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            className={cn(
              "bg-bg-primary text-text-main relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl p-6 shadow-2xl outline-1 outline-black/5",
              className
            )}
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {showCloseButton && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(false)}
                aria-label="Tutup dialog"
                className="text-text-main/70 hover:text-text-main hover:bg-black/5 focus-visible:ring-text-main absolute top-4 right-4 z-20 flex size-9 items-center justify-center rounded-full transition-colors focus-visible:ring-2"
              >
                <X className="size-5" />
              </Button>
            )}
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
