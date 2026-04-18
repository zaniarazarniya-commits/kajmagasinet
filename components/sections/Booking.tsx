"use client";

import { motion } from "framer-motion";
import { Phone, Mail, Anchor } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";
import { fadeUp, staggerContainer, VIEWPORT_CONFIG } from "@/lib/animations";

export function Booking() {
  return (
    <section
      id="boka"
      className="py-24 px-6 canvas-bg"
      aria-label="Boka bord"
    >
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_CONFIG}
        >
          {/* Anchor icon */}
          <motion.div variants={fadeUp} className="flex justify-center mb-6" aria-hidden="true">
            <div className="w-12 h-12 border border-[var(--brass)]/50 flex items-center justify-center bg-[var(--parchment)]">
              <Anchor size={20} className="text-[var(--brass)]" />
            </div>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="text-xs font-sans font-medium uppercase tracking-[0.18em] text-[var(--brass)] mb-3 flex items-center justify-center gap-3"
          >
            <span className="w-6 h-px bg-[var(--brass)] opacity-50" aria-hidden="true" />
            Bord
            <span className="w-6 h-px bg-[var(--brass)] opacity-50" aria-hidden="true" />
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="font-serif text-[clamp(2rem,4vw,3rem)] font-semibold text-[var(--ocean-deep)] mb-4"
          >
            Boka bord
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="font-sans text-[var(--ink-mid)] leading-relaxed mb-10 max-w-lg mx-auto"
          >
            Hör av dig med datum, tid och antal gäster — så återkommer vi med bekräftelse.
            Större sällskap och terrassbokning hanteras i mån av plats.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button href={`tel:${SITE.phoneTel}`} size="lg">
              <Phone size={16} aria-hidden="true" />
              Ring oss
            </Button>
            <Button href={`mailto:${SITE.email}?subject=Bordsbokning`} size="lg" variant="wood">
              <Mail size={16} aria-hidden="true" />
              Skriv till oss
            </Button>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-6 font-sans text-xs text-[var(--ink-mid)]/50"
          >
            Vi svarar inom 2 timmar under öppettid.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
