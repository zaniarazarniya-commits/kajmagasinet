"use client";

import { motion } from "framer-motion";
import { VIEWPORT_CONFIG } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedCard({ children, className, delay = 0 }: AnimatedCardProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_CONFIG}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
        },
      }}
      whileHover={{
        y: -3,
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
      }}
      className={cn(
        "bg-[var(--parchment)] border border-[var(--brass)]/25 overflow-hidden rounded-sm",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_10px_36px_rgba(12,22,38,0.1)]",
        "transition-shadow duration-500 hover:shadow-[0_16px_48px_rgba(12,22,38,0.16)]",
        "hover:border-[var(--brass)]/45",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
