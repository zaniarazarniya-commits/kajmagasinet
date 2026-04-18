"use client";

import { motion } from "framer-motion";
import { fadeUp, VIEWPORT_CONFIG } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  /** Enklare rubrik utan sidolinjer — mer tidnings-/restaurangkänsla */
  variant?: "default" | "editorial";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  centered = false,
  light = false,
  variant = "default",
  className,
}: SectionHeadingProps) {
  const editorial = variant === "editorial";

  return (
    <motion.div
      className={cn(centered && "text-center", className)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_CONFIG}
    >
      {eyebrow && (
        <motion.p
          variants={fadeUp}
          className={cn(
            "mb-3",
            editorial
              ? cn(
                  "font-sans text-sm font-normal tracking-normal",
                  centered && "block",
                  light ? "text-[var(--canvas)]/60" : "text-[var(--ink-mid)]/65"
                )
              : cn(
                  "text-[11px] font-sans font-medium uppercase tracking-[0.14em] flex items-center gap-3",
                  centered && "justify-center",
                  light ? "text-[var(--brass-light)]" : "text-[var(--brass)]"
                )
          )}
        >
          {!editorial && (
            <span className="inline-block w-6 h-px bg-current opacity-60" aria-hidden="true" />
          )}
          {eyebrow}
          {!editorial && (
            <span className="inline-block w-6 h-px bg-current opacity-60" aria-hidden="true" />
          )}
        </motion.p>
      )}
      <motion.h2
        variants={fadeUp}
        className={cn(
          "font-serif leading-[1.15]",
          editorial
            ? cn(
                "text-[clamp(1.75rem,3.5vw,2.5rem)] font-normal",
                light ? "text-[var(--canvas)]" : "text-[var(--ocean-deep)]"
              )
            : cn(
                "font-semibold text-[clamp(2rem,4vw,3rem)]",
                light ? "text-[var(--canvas)]" : "text-[var(--ocean-deep)]"
              )
        )}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeUp}
          className={cn(
            "mt-4 text-base leading-[1.65] max-w-xl",
            centered && "mx-auto",
            editorial && "font-normal",
            light ? "text-[var(--muted-light)]" : "text-[var(--ink-mid)]/90"
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
