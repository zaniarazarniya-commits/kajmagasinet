"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { gentleRock } from "@/lib/animations";

type Variant = "dark" | "canvas";

interface NauticalCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
}

const variantStyles: Record<Variant, string> = {
  dark: cn(
    "nautical-panel-dark text-[var(--canvas)]",
    "border border-[var(--brass)]/35",
    "shadow-[inset_0_1px_0_rgba(255,248,230,0.06),0_16px_48px_rgba(6,10,18,0.5)]"
  ),
  canvas: cn(
    "bg-[var(--parchment)]/90 text-[var(--ink-dark)]",
    "border border-[var(--rope)]/35",
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_8px_32px_rgba(12,22,38,0.12)]"
  ),
};

export function NauticalCard({
  children,
  className,
  variant = "dark",
}: NauticalCardProps) {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      variants={gentleRock}
      className={cn(
        "group relative rounded-sm p-6 md:p-7 overflow-hidden",
        "ring-1 ring-[var(--brass)]/25 ring-offset-2",
        variant === "dark" ? "ring-offset-[var(--ocean-deep)]" : "ring-offset-[var(--canvas)]",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-sm",
        "before:bg-[linear-gradient(135deg,rgba(212,181,106,0.12)_0%,transparent_42%,rgba(90,60,40,0.08)_100%)]",
        "before:opacity-0 before:transition-opacity before:duration-500 group-hover:before:opacity-100",
        variantStyles[variant],
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--brass-light)]/50 to-transparent opacity-70"
        aria-hidden="true"
      />
      <div className="relative z-[1]">{children}</div>
    </motion.div>
  );
}
