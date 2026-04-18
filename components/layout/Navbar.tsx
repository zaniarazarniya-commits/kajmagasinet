"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Anchor } from "lucide-react";
import { SITE } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

const NAV_LINKS = [
  { label: "Meny", href: "#meny" },
  { label: "Drinkar", href: "#drinkar" },
  { label: "Om oss", href: "#arv" },
  { label: "Hitta hit", href: "#hitta-oss" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={[
        "fixed top-0 inset-x-0 z-50 transition-all duration-400",
        scrolled
          ? "bg-[var(--ocean-deep)]/90 backdrop-blur-md border-b border-[var(--canvas)]/10"
          : "bg-transparent",
      ].join(" ")}
    >
      <nav
        className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between"
        aria-label="Huvudnavigation"
      >
        <a
          href="#top"
          className="flex items-center gap-2.5 group"
          aria-label="Kajmagasinet — till startsidan"
        >
          <Anchor
            size={16}
            className="text-[var(--brass-light)] group-hover:text-[var(--brass-light)] transition-colors"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <span className="font-serif font-normal text-lg text-[var(--canvas)] tracking-wide">
            {SITE.name}
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-8" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--canvas)]/65 hover:text-[var(--canvas)] transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button href="#boka" size="sm">
            Boka bord
          </Button>
        </div>

        <button
          className="md:hidden p-2 text-[var(--canvas)]"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Stäng meny" : "Öppna meny"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[var(--ocean-deep)] border-t border-[var(--canvas)]/10 px-6 py-5 flex flex-col gap-4"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-sans text-sm font-medium uppercase tracking-[0.22em] text-[var(--canvas)]/70 hover:text-[var(--canvas)] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Button href="#boka" size="sm" className="self-start mt-2">
            Boka bord
          </Button>
        </motion.div>
      )}
    </motion.header>
  );
}
