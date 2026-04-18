"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Anchor, ChevronLeft, ChevronRight, X } from "lucide-react";
import { fadeUp, staggerContainer, VIEWPORT_CONFIG } from "@/lib/animations";
import type { GalleryTile } from "@/lib/constants";

type PhotoGalleryProps = {
  tiles: GalleryTile[];
  className?: string;
};

const CARD_BASE =
  "group relative w-[44vw] min-w-[150px] max-w-[190px] md:w-[190px] md:min-w-[190px] lg:w-[210px] lg:min-w-[210px] aspect-square overflow-hidden rounded-sm border border-[var(--rope)]/20 bg-[var(--ocean-deep)] snap-start cursor-zoom-in shrink-0";

export function PhotoGallery({ tiles, className = "" }: PhotoGalleryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
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
    container.scrollTo({ left: value, behavior: "smooth" });
  };

  const setScrollFromPointer = (clientX: number) => {
    const track = trackRef.current;
    if (!track || maxScroll <= 0) return;
    const bounds = track.getBoundingClientRect();
    const ratio = (clientX - bounds.left) / bounds.width;
    const clampedRatio = Math.min(1, Math.max(0, ratio));
    handleBarChange(clampedRatio * maxScroll);
  };

  const startDragging = (clientX: number) => {
    setScrollFromPointer(clientX);

    const onMove = (event: PointerEvent) => {
      setScrollFromPointer(event.clientX);
    };

    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp, { once: true });
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
        <div className="mt-4 mx-auto w-full max-w-xl px-1">
          <div
            ref={trackRef}
            role="slider"
            aria-label="Bläddra i fotogalleriet"
            aria-valuemin={0}
            aria-valuemax={Math.round(maxScroll)}
            aria-valuenow={Math.round(Math.min(scrollLeft, maxScroll))}
            tabIndex={0}
            onPointerDown={(e) => startDragging(e.clientX)}
            onKeyDown={(e) => {
              const step = maxScroll / 12 || 40;
              if (e.key === "ArrowLeft") {
                e.preventDefault();
                handleBarChange(Math.max(0, scrollLeft - step));
              }
              if (e.key === "ArrowRight") {
                e.preventDefault();
                handleBarChange(Math.min(maxScroll, scrollLeft + step));
              }
            }}
            className="relative h-3 cursor-ew-resize rounded-full border border-[var(--rope)]/35 bg-[linear-gradient(90deg,#b78f43,#d6b978,#b78f43)] shadow-[inset_0_1px_2px_rgba(10,20,40,0.25)]"
          >
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-[linear-gradient(90deg,var(--brass),#d3b57a)]"
              style={{ width: `${(scrollLeft / maxScroll) * 100}%` }}
              aria-hidden="true"
            />
            <div
              className="absolute top-1/2 z-10 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[var(--ocean-deep)] bg-[var(--brass)] shadow-[0_2px_8px_rgba(5,11,22,0.35)]"
              style={{ left: `${(scrollLeft / maxScroll) * 100}%` }}
              aria-hidden="true"
            >
              <Anchor size={14} strokeWidth={1.8} className="text-[var(--ocean-deep)]" />
            </div>
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
