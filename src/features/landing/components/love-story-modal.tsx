"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { WEDDING_CONFIG } from "../lib/constants";

interface LoveStoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoveStoryModal({ open, onOpenChange }: LoveStoryModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        open={open}
        onOpenChange={onOpenChange}
        className="bg-bg-primary text-text-main max-w-md p-6 sm:p-8"
      >
        <div className="flex flex-col items-center text-center">
          <h3 className="font-heading text-text-muted text-2xl tracking-[0.2em] uppercase sm:text-3xl">
            OUR LOVE STORY
          </h3>
          <div className="bg-text-main/15 my-4 h-px w-16" aria-hidden />
        </div>

        <div className="relative mt-6 pl-10 pr-2">
          {/* Vertical Timeline Track */}
          <div
            className="bg-text-muted/30 absolute top-4 bottom-4 left-4 w-px"
            aria-hidden
          />

          <div className="space-y-8">
            {WEDDING_CONFIG.loveStoryMilestones.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.1, duration: 0.4 }}
                className="relative"
              >
                {/* Heart Marker Circle */}
                <div
                  className="bg-text-muted text-text-alt absolute -left-10 top-0.5 flex size-8 items-center justify-center rounded-full shadow-sm"
                  aria-hidden
                >
                  <Heart className="size-4 fill-current" />
                </div>

                <div className="flex flex-col">
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading text-text-main text-2xl font-normal">
                      {item.year}
                    </span>
                    <span className="font-body text-text-muted text-sm tracking-wider uppercase">
                      — {item.title}
                    </span>
                  </div>
                  <p className="font-body text-text-main/85 mt-2 text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
