"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { fadeUp, staggerContainer, VIEWPORT_CONFIG } from "@/lib/animations";
import type { GalleryTile } from "@/lib/constants";

type PhotoGalleryProps = {
  tiles: GalleryTile[];
  className?: string;
};

const CARD_BASE =
  "group relative w-[44vw] min-w-[150px] max-w-[190px] lg:w-auto lg:min-w-0 aspect-square overflow-hidden rounded-sm border border-[var(--rope)]/20 bg-[var(--ocean-deep)] snap-start cursor-zoom-in shrink-0";

export function PhotoGallery({ tiles, className = "" }: PhotoGalleryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeTile, setActiveTile] = useState<GalleryTile | null>(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  const scrollByCards = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;
    const card = container.querySelector<HTMLElement>("[data-gallery-card='true']");
    const amount = card ? card.offsetWidth + 16 : 220;
    const distance = direction === "left" ? -amount * 2 : amount * 2;
    container.scrollBy({ left: distance, behavior: "smooth" });
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const updateMetrics = () => {
      const nextMax = Math.max(0, container.scrollWidth - container.clientWidth);
      setMaxScroll(nextMax);
      setScrollLeft(Math.min(container.scrollLeft, nextMax));
    };

    updateMetrics();
    container.addEventListener("scroll", updateMetrics, { passive: true });
    window.addEventListener("resize", updateMetrics);
    return () => {
      container.removeEventListener("scroll", updateMetrics);
      window.removeEventListener("resize", updateMetrics);
    };
  }, [tiles.length]);

  const handleBarChange = (value: number) => {
    const container = scrollRef.current;
    if (!container) return;
    container.scrollTo({ left: value, behavior: "auto" });
  };

  return (
    <>
      <div className={`relative ${className}`}>
        <button
          type="button"
          aria-label="Scrolla bilder åt vänster"
          onClick={() => scrollByCards("left")}
          className="hidden md:flex absolute -left-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full border border-[var(--rope)]/25 bg-[var(--canvas)]/90 text-[var(--ink)] shadow-sm hover:bg-[var(--canvas)]"
        >
          <ChevronLeft size={18} />
        </button>

        <motion.div
          ref={scrollRef}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_CONFIG}
          className="flex gap-3 md:gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {tiles.map((tile, i) => (
            <motion.div
              key={tile.id}
              variants={fadeUp}
              style={{ transitionDelay: `${i * 0.05}s` }}
              className={CARD_BASE}
              data-gallery-card="true"
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
                priority={i < 3}
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

        <button
          type="button"
          aria-label="Scrolla bilder åt höger"
          onClick={() => scrollByCards("right")}
          className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full border border-[var(--rope)]/25 bg-[var(--canvas)]/90 text-[var(--ink)] shadow-sm hover:bg-[var(--canvas)]"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {maxScroll > 0 && (
        <div className="mt-4 mx-auto w-full max-w-md">
          <div className="relative h-2 rounded-full bg-[linear-gradient(90deg,rgba(7,13,24,0.9),rgba(7,13,24,0.65))] border border-[var(--rope)]/25">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-[linear-gradient(90deg,var(--brass),#d3b57a)]"
              style={{ width: `${(scrollLeft / maxScroll) * 100}%` }}
              aria-hidden="true"
            />
            <input
              type="range"
              min={0}
              max={maxScroll}
              step={1}
              value={Math.min(scrollLeft, maxScroll)}
              onChange={(e) => handleBarChange(Number(e.target.value))}
              aria-label="Bläddra i fotogalleriet"
              className="absolute inset-0 h-full w-full cursor-ew-resize appearance-none bg-transparent [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-[var(--rope)]/40 [&::-webkit-slider-thumb]:bg-[var(--brass)] [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-[var(--rope)]/40 [&::-moz-range-thumb]:bg-[var(--brass)] [&::-moz-range-track]:bg-transparent"
            />
          </div>
        </div>
      )}

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
                <Image src={activeTile.image} alt={activeTile.title} fill sizes="90vw" className="object-cover" />
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
    </>
  );
}
