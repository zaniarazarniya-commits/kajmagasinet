"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { staggerContainer, fadeUp, VIEWPORT_CONFIG } from "@/lib/animations";

const GALLERY_TILES = [
  {
    id: "deck",
    title: "Trädäcket i söderläge",
    caption: "Perfekt för sena kvällar i solen vid vattnet",
    image: "/images/hero-atmosphere.svg",
  },
  {
    id: "indoor",
    title: "Rymligt inomhus",
    caption: "Avslappnad miljö för både middag och spontanhäng",
    image: "/images/hero-atmosphere.svg",
  },
  {
    id: "social",
    title: "Social stämning",
    caption: "Mat, drinkar och umgänge under samma tak",
    image: "/images/hero-atmosphere.svg",
  },
  {
    id: "local-food",
    title: "Lokala smaker",
    caption: "Bra råvaror, rejält med smak och avslappnad servering",
    image: "/images/hero-atmosphere.svg",
  },
  {
    id: "friends",
    title: "Kväll med vänner",
    caption: "Plats för både spontana besök och större sällskap",
    image: "/images/hero-atmosphere.svg",
  },
] as const;

export function Menu() {
  const [activeTile, setActiveTile] = useState<(typeof GALLERY_TILES)[number] | null>(null);

  return (
    <section
      id="meny"
      className="pt-14 pb-20 md:pt-16 md:pb-28 px-6 border-t border-[var(--rope)]/15 bg-[var(--canvas)]"
      aria-label="Meny"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          variant="editorial"
          eyebrow="Servering"
          title="Mat för alla tillfällen"
          subtitle="Hos oss hittar du vällagad mat utan krångel. Vi fokuserar på bra råvaror, lokala favoriter och rätter som man faktiskt blir mätt på. Allt från säsongens fisk till en riktigt bra burgare. Vi satsar bara på att det ska smaka riktigt gott, varje gång."
          centered
          className="mb-10 md:mb-20"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_CONFIG}
          className="flex lg:grid lg:grid-cols-5 gap-3 md:gap-4 overflow-x-auto lg:overflow-visible pb-2 snap-x snap-mandatory"
        >
          {GALLERY_TILES.map((tile, i) => (
            <motion.div
              key={tile.id}
              variants={fadeUp}
              style={{ transitionDelay: `${i * 0.06}s` }}
              className="group relative w-[44vw] min-w-[150px] max-w-[190px] lg:w-auto lg:min-w-0 aspect-square overflow-hidden rounded-sm border border-[var(--rope)]/20 bg-[var(--ocean-deep)] snap-start cursor-zoom-in"
              onClick={() => setActiveTile(tile)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveTile(tile);
                }
              }}
            >
              <Image
                src={tile.image}
                alt={tile.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[rgba(7,13,24,0.88)] via-[rgba(7,13,24,0.35)] to-transparent"
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 p-3 md:p-4">
                <h3 className="font-serif text-base md:text-lg leading-tight text-[var(--canvas)] mb-1">
                  {tile.title}
                </h3>
                <p className="font-sans text-[11px] md:text-xs leading-relaxed text-[var(--canvas)]/80">
                  {tile.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_CONFIG}
          variants={fadeUp}
          className="mt-16 md:mt-20 flex justify-center"
        >
          <Button href="#boka" variant="subtle" size="md">
            Se fullständig meny
          </Button>
        </motion.div>
      </div>

      <AnimatePresence>
        {activeTile && (
          <motion.div
            className="fixed inset-0 z-[70] md:hidden bg-black/70 backdrop-blur-sm p-4 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveTile(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-white/20 bg-[var(--ocean-deep)]">
                <Image
                  src={activeTile.image}
                  alt={activeTile.title}
                  fill
                  sizes="90vw"
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => setActiveTile(null)}
                  className="absolute top-2 right-2 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center"
                  aria-label="Stäng bild"
                >
                  <X size={18} />
                </button>
              </div>
              <p className="text-center text-xs text-white/80 mt-3">Tryck utanför bilden för att stänga</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
