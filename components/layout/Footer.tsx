"use client";

import { motion } from "framer-motion";
import { Share2, Mail, Phone, Anchor } from "lucide-react";
import { SITE, OPENING_HOURS } from "@/lib/constants";
import { fadeUp, staggerContainer, VIEWPORT_CONFIG } from "@/lib/animations";

const NAV_LINKS = [
  { label: "Om oss", href: "#arv" },
  { label: "Drinkar", href: "#drinkar" },
  { label: "Meny", href: "#meny" },
  { label: "Kväll", href: "#aktiviteter" },
  { label: "Hitta hit", href: "#hitta-oss" },
  { label: "Boka", href: "#boka" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="text-[var(--canvas)] pt-16 pb-8 px-6 bg-[var(--ocean-abyss)]"
      aria-label="Sidfot"
    >
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
              Restaurang och bar vid Kungsgatan — öppet sedan 2010.
            </p>
            <div className="flex gap-2">
              {[
                { href: SITE.instagram, icon: Share2, label: "Instagram" },
                { href: `mailto:${SITE.email}`, icon: Mail, label: "E-post" },
                { href: `tel:${SITE.phone.replace(/\s/g, "")}`, icon: Phone, label: "Telefon" },
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
              {OPENING_HOURS.map((row) => (
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

        {/* Bottom */}
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
    </footer>
  );
}
