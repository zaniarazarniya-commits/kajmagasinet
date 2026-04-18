"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Clock, AtSign, ExternalLink, Anchor } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SITE, OPENING_HOURS } from "@/lib/constants";
import {
  staggerContainer,
  fadeUp,
  slideInLeft,
  slideInRight,
  VIEWPORT_CONFIG,
} from "@/lib/animations";

export function FindUs() {
  return (
    <section
      id="hitta-oss"
      className="relative py-28 md:py-36 bg-[var(--ocean-deep)] text-[var(--canvas)] overflow-hidden"
      aria-label="Hitta oss"
    >
      {/* Subtil ankarbakgrund */}
      <div
        className="absolute inset-0 flex items-end justify-end pointer-events-none select-none pr-8 pb-8 opacity-[0.03]"
        aria-hidden="true"
      >
        <Anchor size={380} strokeWidth={0.4} className="text-[var(--canvas)]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">

        {/* Rubrik */}
        <motion.div
          className="mb-16 md:mb-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_CONFIG}
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5">
            <span className="h-px w-8 bg-[var(--brass)]/60" />
            <span className="text-[10px] font-sans font-medium uppercase tracking-[0.32em] text-[var(--brass-light)]">
              Besök oss
            </span>
            <span className="h-px w-8 bg-[var(--brass)]/60" />
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-serif font-normal text-[var(--canvas)] leading-[1.05] mb-5"
            style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}
          >
            Välkommen in
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="max-w-lg text-[var(--canvas)]/65 text-[15px] md:text-base leading-[1.75] font-sans"
          >
            Vi håller hus mitt i Lysekil, ett stenkast från hamnen.
            Kom som du är — ensam, med sällskap eller utan plan.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">

          {/* Vänster: info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_CONFIG}
            variants={slideInLeft}
            className="space-y-8"
          >
            {/* Adress + telefon */}
            <div className="space-y-5">
              <a
                href={SITE.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-5 hover:opacity-80 transition-opacity"
              >
                <span className="mt-0.5 w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-full border border-[var(--canvas)]/15">
                  <MapPin size={15} className="text-[var(--brass-light)]" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[11px] font-sans font-medium uppercase tracking-[0.22em] text-[var(--canvas)]/45 mb-1">
                    Adress
                  </p>
                  <p className="font-sans text-[var(--canvas)] text-base leading-snug">
                    {SITE.address}
                  </p>
                  <span className="inline-flex items-center gap-1 mt-1.5 text-xs text-[var(--brass-light)] group-hover:underline">
                    Öppna i kartor <ExternalLink size={10} aria-hidden="true" />
                  </span>
                </div>
              </a>

              <a
                href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                className="group flex items-start gap-5 hover:opacity-80 transition-opacity"
              >
                <span className="mt-0.5 w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-full border border-[var(--canvas)]/15">
                  <Phone size={15} className="text-[var(--brass-light)]" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[11px] font-sans font-medium uppercase tracking-[0.22em] text-[var(--canvas)]/45 mb-1">
                    Telefon
                  </p>
                  <p className="font-sans text-[var(--canvas)] text-base">{SITE.phone}</p>
                </div>
              </a>
            </div>

            {/* Skiljelinje */}
            <div className="h-px bg-[var(--canvas)]/10" />

            {/* Öppettider */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <Clock size={14} className="text-[var(--brass-light)]" aria-hidden="true" />
                <p className="text-[11px] font-sans font-medium uppercase tracking-[0.22em] text-[var(--canvas)]/45">
                  Öppettider
                </p>
              </div>
              <motion.dl
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_CONFIG}
                className="space-y-3"
              >
                {OPENING_HOURS.map((row) => (
                  <motion.div
                    key={row.day}
                    variants={fadeUp}
                    className="flex justify-between items-baseline gap-4"
                  >
                    <dt className="font-sans text-sm text-[var(--canvas)]/60">{row.day}</dt>
                    <dd className="font-sans text-sm text-[var(--canvas)] tabular-nums">{row.time}</dd>
                  </motion.div>
                ))}
              </motion.dl>
            </div>

            {/* Skiljelinje */}
            <div className="h-px bg-[var(--canvas)]/10" />

            {/* Instagram */}
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 hover:opacity-80 transition-opacity"
            >
              <span className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-full border border-[var(--canvas)]/15">
                <AtSign size={15} className="text-[var(--brass-light)]" aria-hidden="true" />
              </span>
              <div>
                <p className="font-sans text-sm text-[var(--canvas)]">Följ oss på Instagram</p>
                <p className="font-sans text-xs text-[var(--canvas)]/45">@kajmagasinet</p>
              </div>
              <ExternalLink
                size={13}
                className="ml-auto text-[var(--canvas)]/30 group-hover:text-[var(--canvas)]/70 transition-colors"
                aria-hidden="true"
              />
            </a>
          </motion.div>

          {/* Höger: karta-kort */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_CONFIG}
            variants={slideInRight}
          >
            <div className="rounded-[2px] overflow-hidden border border-[var(--canvas)]/10 bg-[var(--ocean-mid)]">

              {/* Karta-yta */}
              <div
                className="aspect-[4/3] flex flex-col items-center justify-center gap-6 p-10 text-center"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 70% at 50% 60%, rgba(42,70,104,0.6) 0%, rgba(14,26,46,1) 100%)",
                }}
              >
                <div
                  className="w-14 h-14 flex items-center justify-center rounded-full border border-[var(--canvas)]/20"
                  aria-hidden="true"
                >
                  <MapPin size={22} className="text-[var(--brass-light)]" strokeWidth={1.5} />
                </div>

                <div>
                  <p className="font-serif text-2xl text-[var(--canvas)] mb-1">Kajmagasinet</p>
                  <p className="font-sans text-sm text-[var(--canvas)]/55">{SITE.address}</p>
                  <p className="font-sans text-xs text-[var(--canvas)]/35 mt-0.5">Lysekil, Bohuslän</p>
                </div>

                <Button href={SITE.mapsUrl} variant="outline" size="md">
                  Öppna i Google Maps
                </Button>
              </div>

              {/* Nedre info-rad */}
              <div className="px-7 py-5 border-t border-[var(--canvas)]/10 flex items-center justify-between">
                <p className="font-sans text-xs text-[var(--canvas)]/50">
                  Ingång från gatan · terrassen mot vattnet
                </p>
                <span className="text-[var(--canvas)]/25 text-xs">🧭</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
