import type { Variants } from "framer-motion";

export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: EASE_OUT_EXPO },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: EASE_OUT_EXPO },
  },
};

export const VIEWPORT_CONFIG = {
  once: true,
  amount: 0.2,
} as const;

/** Subtle hover — evokes gentle motion on water */
export const gentleRock = {
  rest: {
    y: 0,
    rotate: 0,
    transition: { duration: 0.45, ease: EASE_OUT_EXPO },
  },
  hover: {
    y: -4,
    rotate: 0.2,
    transition: { duration: 0.5, ease: EASE_OUT_EXPO },
  },
} as const;
