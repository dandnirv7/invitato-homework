"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export function SectionReveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: SectionRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  const getInitialPosition = () => {
    if (prefersReducedMotion) return { x: 0, y: 0 };
    switch (direction) {
      case "up":
        return { x: 0, y: 48 };
      case "down":
        return { x: 0, y: -48 };
      case "left":
        return { x: 48, y: 0 };
      case "right":
        return { x: -48, y: 0 };
      default:
        return { x: 0, y: 48 };
    }
  };

  const initialPos = getInitialPosition();

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        x: initialPos.x,
        y: initialPos.y,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.85,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
