"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { stegaClean } from "next-sanity";
import { Anchor, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { staggerContainer, fadeUp } from "@/lib/animations";

const DEFAULT_HEADLINE = "Kajmagasinet";

type HeroProps = {
  headline?: string | null;
  heroImageUrl?: string | null;
  heroImageAlt?: string | null;
};

export function Hero({
  headline,
  heroImageUrl,
  heroImageAlt,
}: HeroProps) {
  const title =
    headline != null && stegaClean(headline).trim() !== ""
      ? headline
      : DEFAULT_HEADLINE;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative h-[100svh] min-h-[640px] flex items-center justify-center overflow-hidden bg-[var(--ocean-deep)]"
      aria-label="Välkommen till Kajmagasinet"
    >
      {/* Enkel djupblå bakgrund med mjuk gradient */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        {heroImageUrl ? (
          <Image
            src={heroImageUrl}
            alt={heroImageAlt?.trim() || "Kajmagasinet Lysekil vid kajen"}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        ) : null}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(43,70,104,0.55) 0%, rgba(14,26,46,0.95) 70%, #070d18 100%)",
          }}
          aria-hidden="true"
        />
      </motion.div>

      {/* Stort ankare som diskret centralt motiv */}
      <div
        className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <Anchor
          size={440}
          className="text-[var(--canvas)]/[0.04]"
          strokeWidth={0.4}
        />
      </div>

      {/* Innehåll */}
      <motion.div
        style={{ opacity }}
        className="relative z-30 text-center px-6 max-w-4xl mx-auto"
      >
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          <motion.div
            variants={fadeUp}
            className="flex items-center justify-center gap-4 mb-6"
            aria-hidden="true"
          >
            <span className="h-px w-10 bg-[var(--brass)]/70" />
            <Anchor size={14} className="text-[var(--brass-light)]" strokeWidth={1.5} />
            <span className="h-px w-10 bg-[var(--brass)]/70" />
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="text-[10px] md:text-[11px] font-sans font-medium uppercase tracking-[0.32em] text-[var(--brass-light)]/85 mb-4"
          >
            Lysekil · sedan 2010
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-serif font-normal text-[var(--canvas)] leading-[0.98] mb-4"
            style={{ fontSize: "clamp(3rem, 8vw, 5.75rem)" }}
          >
            {title}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="font-serif italic text-[var(--canvas)]/75 mb-8 font-normal"
            style={{ fontSize: "clamp(1.05rem, 2vw, 1.35rem)" }}
          >
            Restaurang Lysekil vid kajen - boka bord hos Kajmagasinet i Lysekil
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 flex-wrap"
          >
            <Button
              href="/boka"
              size="lg"
              variant="outline"
              className="shadow-[0_10px_32px_rgba(0,0,0,0.35)]"
            >
              Boka bord
            </Button>
            <Button href="/kontakt" size="lg">
              Kontakt & hitta hit
            </Button>
            <Button href="/meny" size="lg" variant="outline">
              Se menyn
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.a
        href="#arv"
        aria-label="Scrolla vidare"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 text-[var(--canvas)]/40 hover:text-[var(--canvas)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--canvas)] rounded-full p-1"
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}
      >
        <ChevronDown size={22} />
      </motion.a>
    </section>
  );
}
