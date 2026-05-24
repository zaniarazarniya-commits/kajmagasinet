"use client";

import { motion } from "framer-motion";
import { Share2, Mail, Phone, Anchor } from "lucide-react";
import { SITE, OPENING_HOURS } from "@/lib/constants";
import type { OpeningHourRow } from "@/components/sections/FindUs";
import { fadeUp, staggerContainer, VIEWPORT_CONFIG } from "@/lib/animations";

type FooterProps = {
  openingHours?: OpeningHourRow[];
};

const NAV_LINKS = [
  { label: "Start", href: "/" },
  { label: "Meny", href: "/meny" },
  { label: "Boka bord", href: "/boka" },
  { label: "Kontakt", href: "/kontakt" },
  { label: "Om oss", href: "/#arv" },
];

export function Footer({ openingHours }: FooterProps) {
  const year = new Date().getFullYear();
  const fromCms =
    openingHours?.filter((r) => r.day?.trim() && r.time?.trim()) ?? [];
  const hours: OpeningHourRow[] =
    fromCms.length > 0
      ? fromCms
      : (OPENING_HOURS as unknown as OpeningHourRow[]);

  return (
    <footer aria-label="Sidfot">
      {/* ── Huvud-footer ─────────────────────────────────────────────── */}
      <div className="text-[var(--canvas)] pt-16 pb-8 px-6 bg-[var(--ocean-abyss)]">
        {/* Tunn guldlinje överst */}
        <div
          className="max-w-6xl mx-auto mb-12 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, var(--brass) 30%, var(--brass-light) 50%, var(--brass) 70%, transparent 100%)",
            opacity: 0.45,
          }}
          aria-hidden="true"
        />

        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_CONFIG}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 pb-12 border-b border-[var(--canvas)]/8"
          >
            {/* Brand */}
            <motion.div variants={fadeUp}>
              <div className="flex items-center gap-2.5 mb-4">
                <Anchor size={16} className="text-[var(--brass-light)]" aria-hidden="true" />
                <p className="font-serif text-xl font-normal text-[var(--canvas)]">{SITE.name}</p>
              </div>
              <p className="font-sans text-sm text-[var(--canvas)]/50 leading-relaxed mb-6">
                Kajmagasinet i Lysekil - restaurang och bar vid Rosviksgatan sedan
                2010.
              </p>
              <div className="flex gap-2">
                {[
                  { href: SITE.instagram, icon: Share2, label: "Instagram" },
                  { href: `mailto:${SITE.email}`, icon: Mail, label: "E-post" },
                  { href: `tel:${SITE.phoneTel}`, icon: Phone, label: "Telefon" },
                ].map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={label}
                    className="w-9 h-9 border border-[var(--canvas)]/15 flex items-center justify-center text-[var(--canvas)]/45 hover:text-[var(--brass-light)] hover:border-[var(--brass)]/50 transition-colors"
                  >
                    <Icon size={14} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Nav */}
            <motion.div variants={fadeUp}>
              <p className="font-sans text-[10px] font-medium uppercase tracking-[0.28em] text-[var(--brass-light)]/70 mb-5">
                Navigation
              </p>
              <ul className="space-y-3" role="list">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="font-sans text-sm text-[var(--canvas)]/50 hover:text-[var(--brass-light)] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Hours */}
            <motion.div variants={fadeUp}>
              <p className="font-sans text-[10px] font-medium uppercase tracking-[0.28em] text-[var(--brass-light)]/70 mb-5">
                Öppettider
              </p>
              <dl className="space-y-2.5">
                {hours.map((row) => (
                  <div key={row.day} className="flex justify-between gap-4">
                    <dt className="font-sans text-sm text-[var(--canvas)]/50">{row.day}</dt>
                    <dd className="font-sans text-sm text-[var(--canvas)]/80 tabular-nums">{row.time}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 pt-4 border-t border-[var(--canvas)]/10">
                <p className="font-sans text-xs text-[var(--canvas)]/35">{SITE.address}</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Copyright-rad */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_CONFIG}
            className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-3"
          >
            <p className="font-sans text-xs text-[var(--canvas)]/30">
              © {year} {SITE.name}. Alla rättigheter förbehållna.
            </p>
            <p className="font-sans text-xs text-[var(--canvas)]/25 flex items-center gap-1.5">
              <Anchor size={10} className="text-[var(--brass)]/60" aria-hidden="true" />
              Lysekil, Bohuslän, Sverige
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Infrakust-band ───────────────────────────────────────────── */}
      <motion.a
        href="https://www.infrakust.se"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Hemsida skapad av Infrakust — besök infrakust.se"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="group flex items-center justify-center gap-3 py-4 px-6 w-full"
        style={{ background: "#000" }}
      >
        {/* Vänster linje */}
        <span
          className="block h-px w-8 flex-shrink-0 bg-[#c9a96e] opacity-35 group-hover:opacity-65 group-hover:w-12 transition-all duration-700"
          aria-hidden="true"
        />

        <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-[#faf8f3]/35 group-hover:text-[#faf8f3]/50 transition-colors duration-500">
          Powered by
        </span>

        <span
          className="font-serif font-bold text-[#faf8f3]/55 group-hover:text-[#faf8f3]/90 transition-colors duration-500"
          style={{ fontSize: "1.05rem", letterSpacing: "0.02em" }}
        >
          Infrakust
        </span>

        {/* Pil som glider in vid hover */}
        <span
          className="font-sans text-[11px] text-[#c9a96e] opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-500"
          aria-hidden="true"
        >
          →
        </span>

        {/* Höger linje */}
        <span
          className="block h-px w-8 flex-shrink-0 bg-[#c9a96e] opacity-35 group-hover:opacity-65 group-hover:w-12 transition-all duration-700"
          aria-hidden="true"
        />
      </motion.a>
    </footer>
  );
}
