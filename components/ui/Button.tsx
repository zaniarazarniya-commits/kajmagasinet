"use client";

import { motion } from "framer-motion";
import { type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "wood" | "subtle";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
}

const base =
  "inline-flex items-center justify-center gap-2 font-sans transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--brass)] cursor-pointer select-none rounded-[2px]";

const variants: Record<Variant, string> = {
  primary:
    "font-semibold uppercase tracking-[0.14em] text-[11px] bg-[var(--canvas)] text-[var(--ocean-deep)] hover:bg-[var(--stone)] border border-[var(--canvas)]",
  outline:
    "font-semibold uppercase tracking-[0.14em] text-[11px] border border-[var(--canvas)]/60 text-[var(--canvas)] hover:bg-[var(--canvas)] hover:text-[var(--ocean-deep)] hover:border-[var(--canvas)]",
  ghost:
    "font-semibold uppercase tracking-[0.14em] text-[11px] text-[var(--ink-dark)] hover:bg-[var(--parchment)] border border-[var(--ink-dark)]/15",
  wood:
    "font-semibold uppercase tracking-[0.14em] text-[11px] bg-[var(--ocean-deep)] text-[var(--canvas)] hover:bg-[var(--ocean-mid)] border border-[var(--ocean-deep)]",
  subtle:
    "font-normal normal-case tracking-normal text-sm text-[var(--ocean-deep)] border border-[var(--ocean-deep)]/15 bg-transparent hover:bg-[var(--ocean-deep)]/[0.04] px-6 py-3",
};

const sizes: Record<Size, string> = {
  sm: "px-5 py-2.5 text-[11px]",
  md: "px-6 py-3 text-[11px]",
  lg: "px-8 py-4 text-xs",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={classes}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...(props as object)}
    >
      {children}
    </motion.button>
  );
}
