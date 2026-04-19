"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { slideInLeft, slideInRight, staggerContainer, fadeUp, VIEWPORT_CONFIG } from "@/lib/animations";

const TERRACE_LINES = [
  "Utsikt mot fjorden — bord utomhus när vädret tillåter",
  "Ljust läge på eftermiddagen och kvällen",
  "Öppet maj–september; platserna varierar med säsong",
];

export function Terrace() {
  return (
    <section
      id="terrassen"
      className="py-20 md:py-28 px-6 overflow-hidden bg-[var(--canvas)] border-t border-[var(--rope)]/15"
      aria-label="Terrassen"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-14 items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_CONFIG}
          variants={slideInLeft}
          className="relative"
        >
          <div
            className="relative aspect-[4/3] max-h-[min(480px,65vh)] rounded-sm overflow-hidden bg-[var(--ocean-mid)]/10"
            aria-hidden="true"
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(165deg, rgba(12,22,38,0.06) 0%, rgba(74,109,140,0.12) 45%, rgba(245,244,239,0.4) 100%)",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center p-12">
              <svg
                viewBox="0 0 80 80"
                width="100"
                height="100"
                className="text-[var(--ocean-deep)]/[0.12]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
              >
                <circle cx="40" cy="18" r="8" />
                <line x1="40" y1="26" x2="40" y2="70" />
                <line x1="16" y1="36" x2="64" y2="36" />
                <path d="M16 70 C16 56, 40 56, 40 70" />
                <path d="M64 70 C64 56, 40 56, 40 70" />
              </svg>
            </div>
          </div>
          <p className="mt-4 font-sans text-xs text-[var(--ink-mid)]/55 text-center md:text-left">
            Maj–september · terrass
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_CONFIG}
          variants={slideInRight}
          className="pt-2 md:pt-0"
        >
          <SectionHeading
            variant="editorial"
            eyebrow="Utomhus"
            title="Terrassen"
            subtitle="Servering utomhus under sommarhalvåret. Samma kök och bar som inne — bara närmare vattnet."
          />

          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_CONFIG}
            className="mt-5 space-y-3"
            role="list"
          >
            {TERRACE_LINES.map((text) => (
              <motion.li
                key={text}
                variants={fadeUp}
                className="font-sans text-[15px] text-[var(--ink-mid)]/88 leading-snug pl-4 border-l border-[var(--brass)]/25"
              >
                {text}
              </motion.li>
            ))}
          </motion.ul>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_CONFIG}
            className="mt-6 font-sans text-sm text-[var(--ink-mid)]/65 leading-snug"
          >
            Sedan 2010 på Rosviksgatan — biljard och dart inne, servering utomhus maj–september.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
