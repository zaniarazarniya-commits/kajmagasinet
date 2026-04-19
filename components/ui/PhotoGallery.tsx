"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { isGalleryImageTile, type GalleryTile } from "@/lib/constants";

type PhotoGalleryProps = {
  tiles: GalleryTile[];
  className?: string;
};

type ImageTile = Extract<GalleryTile, { image: string }>;

/** Liggande kort — samma storlek för alla (ingen “aktiv” som växer) */
const CARD_BASE =
  "group relative w-[min(88vw,420px)] min-w-[260px] max-w-[420px] sm:min-w-[280px] sm:max-w-[460px] md:w-[min(48vw,480px)] md:min-w-[340px] md:max-w-[480px] lg:w-[min(42vw,520px)] lg:min-w-[380px] lg:max-w-[520px] aspect-[4/3] overflow-hidden rounded-sm border border-[var(--rope)]/20 bg-[var(--ocean-deep)] snap-start snap-always shrink-0";

const CARD_IMAGE = `${CARD_BASE} cursor-zoom-in`;
const CARD_EMPTY = `${CARD_BASE} cursor-default border-dashed border-[var(--rope)]/45 bg-[var(--ocean-deep)]/50 flex flex-col items-center justify-center gap-1`;

const IMG_BASE =
  "h-full w-full object-cover object-center transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.02]";

/** Mjuk infading när bilden är färdigladdad — undviker hack och “hoppar” i storlek */
function CarouselImage({
  src,
  alt,
  sizes,
  index,
}: {
  src: string;
  alt: string;
  sizes: string;
  index: number;
}) {
  const [show, setShow] = useState(false);
  const reduceMotion = useReducedMotion();

  const visible = show || reduceMotion;

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      loading="eager"
      decoding="async"
      priority={index < 5}
      onLoadingComplete={() => setShow(true)}
      className={cn(
        IMG_BASE,
        "transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
        visible ? "opacity-100" : "opacity-0",
      )}
    />
  );
}

function galleryAltText(alt?: string): string {
  const cleaned = alt?.trim();
  return cleaned && cleaned.length > 0
    ? cleaned
    : "Miljöbild från Kajmagasinet Lysekil";
}

export function PhotoGallery({ tiles, className = "" }: PhotoGalleryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const lightboxOpenRef = useRef(false);
  const historyEntryAddedRef = useRef(false);

  const imageTiles = useMemo(() => tiles.filter(isGalleryImageTile), [tiles]);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [canScroll, setCanScroll] = useState(false);

  const openLightbox = useCallback(
    (tile: ImageTile) => {
      const idx = imageTiles.findIndex((t) => t.id === tile.id);
      setLightboxIndex(idx >= 0 ? idx : 0);
    },
    [imageTiles],
  );

  const closeLightbox = useCallback(() => {
    if (lightboxOpenRef.current && historyEntryAddedRef.current) {
      window.history.back();
      return;
    }
    setLightboxIndex(null);
  }, []);

  const goPrev = useCallback(() => {
    setLightboxIndex((i) => {
      if (i === null || imageTiles.length < 2) return i;
      return i <= 0 ? imageTiles.length - 1 : i - 1;
    });
  }, [imageTiles.length]);

  const goNext = useCallback(() => {
    setLightboxIndex((i) => {
      if (i === null || imageTiles.length < 2) return i;
      return i >= imageTiles.length - 1 ? 0 : i + 1;
    });
  }, [imageTiles.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, closeLightbox, goPrev, goNext]);

  useEffect(() => {
    lightboxOpenRef.current = lightboxIndex !== null;

    if (lightboxIndex !== null && !historyEntryAddedRef.current) {
      window.history.pushState({ photoGallery: true }, "");
      historyEntryAddedRef.current = true;
    }

    if (lightboxIndex === null) {
      historyEntryAddedRef.current = false;
    }
  }, [lightboxIndex]);

  useEffect(() => {
    const onPopState = () => {
      if (lightboxOpenRef.current) {
        setLightboxIndex(null);
      }
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [lightboxIndex]);

  const scrollByCards = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;
    const card = container.querySelector<HTMLElement>("[data-gallery-card='true']");
    const gap = 20;
    const amount = card ? card.offsetWidth + gap : 320;
    const distance = direction === "left" ? -amount : amount;
    container.scrollBy({ left: distance, behavior: "smooth" });
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const updateMetrics = () => {
      const firstCard = container.querySelector<HTMLElement>("[data-gallery-card='true']");
      const cardWidth = firstCard?.offsetWidth ?? 1;
      const gap = 20;
      const step = cardWidth + gap;
      const nextIndex = Math.round(container.scrollLeft / step) + 1;
      setCurrentIndex(Math.max(1, Math.min(tiles.length, nextIndex)));
      setCanScroll(container.scrollWidth > container.clientWidth + 1);
    };

    updateMetrics();
    container.addEventListener("scroll", updateMetrics, { passive: true });
    window.addEventListener("resize", updateMetrics);
    return () => {
      container.removeEventListener("scroll", updateMetrics);
      window.removeEventListener("resize", updateMetrics);
    };
  }, [tiles.length]);

  const activeSlide = lightboxIndex !== null ? imageTiles[lightboxIndex] : null;

  return (
    <>
      <div className={`relative ${className}`}>
        <button
          type="button"
          aria-label="Scrolla bilder åt vänster"
          onClick={() => scrollByCards("left")}
          className="flex absolute -left-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full border border-[var(--rope)]/25 bg-[var(--canvas)]/90 text-[var(--ink)] shadow-sm hover:bg-[var(--canvas)]"
        >
          <ChevronLeft size={18} />
        </button>

        <div
          ref={scrollRef}
          className={cn(
            "flex gap-4 md:gap-5 overflow-x-auto pb-2 scroll-smooth",
            /* Mjukare stopp vid svep på mobil än snap-mandatory */
            "snap-x snap-proximity md:snap-mandatory",
            "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
            "overscroll-x-contain touch-pan-x [overflow-scrolling:touch]",
          )}
        >
          {tiles.map((tile, i) => {
            if (!isGalleryImageTile(tile)) {
              return (
                <div
                  key={tile.id}
                  className={CARD_EMPTY}
                  data-gallery-card="true"
                  aria-label="Tom plats för bild"
                >
                  <span className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-[var(--ink-mid)]/45">
                    Tom plats
                  </span>
                </div>
              );
            }

            const imageIndex = tiles.slice(0, i).filter(isGalleryImageTile).length;

            return (
              <div
                key={tile.id}
                className={CARD_IMAGE}
                data-gallery-card="true"
                onClick={() => openLightbox(tile)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openLightbox(tile);
                  }
                }}
              >
                <CarouselImage
                  src={tile.image}
                  alt={galleryAltText(tile.alt)}
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 520px"
                  index={imageIndex}
                />
              </div>
            );
          })}
        </div>

        <button
          type="button"
          aria-label="Scrolla bilder åt höger"
          onClick={() => scrollByCards("right")}
          className="flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full border border-[var(--rope)]/25 bg-[var(--canvas)]/90 text-[var(--ink)] shadow-sm hover:bg-[var(--canvas)]"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {canScroll && (
        <div className="mt-3 flex justify-center">
          <p className="font-sans text-xs tracking-[0.22em] uppercase text-[var(--ink-mid)]/70">
            {currentIndex}/{tiles.length}
          </p>
        </div>
      )}

      <AnimatePresence>
        {activeSlide && lightboxIndex !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Bildvisning"
            className="fixed inset-0 z-[70] flex flex-col bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={closeLightbox}
            onTouchStart={(e) => {
              touchStartX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (touchStartX.current === null) return;
              const x = e.changedTouches[0].clientX;
              const delta = x - touchStartX.current;
              touchStartX.current = null;
              if (Math.abs(delta) < 72) return;
              if (delta > 0) goPrev();
              else goNext();
            }}
          >
            <div className="flex shrink-0 items-center justify-between gap-2 px-3 py-3 md:px-6">
              <p className="font-sans text-xs tracking-[0.2em] uppercase text-white/75">
                {lightboxIndex + 1} / {imageTiles.length}
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  closeLightbox();
                }}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                aria-label="Stäng"
              >
                <X size={22} />
              </button>
            </div>

            <div
              className="relative flex min-h-0 flex-1 items-center justify-center px-2 pb-6 md:px-8"
              onClick={(e) => e.stopPropagation()}
            >
              {imageTiles.length > 1 && (
                <button
                  type="button"
                  aria-label="Föregående bild"
                  onClick={(e) => {
                    e.stopPropagation();
                    goPrev();
                  }}
                  className="absolute left-1 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white hover:bg-black/60 md:left-4 md:h-12 md:w-12"
                >
                  <ChevronLeft size={26} />
                </button>
              )}

              <div className="relative mx-auto h-[min(85dvh,calc(100dvh-8rem))] w-full max-w-7xl">
                <Image
                  key={activeSlide.id}
                  src={activeSlide.image}
                  alt={galleryAltText(activeSlide.alt)}
                  fill
                  sizes="100vw"
                  className="object-contain object-center transition-opacity duration-300 ease-out"
                  priority
                />
              </div>

              {imageTiles.length > 1 && (
                <button
                  type="button"
                  aria-label="Nästa bild"
                  onClick={(e) => {
                    e.stopPropagation();
                    goNext();
                  }}
                  className="absolute right-1 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white hover:bg-black/60 md:right-4 md:h-12 md:w-12"
                >
                  <ChevronRight size={26} />
                </button>
              )}
            </div>

            <p className="shrink-0 pb-4 text-center font-sans text-[11px] text-white/55 md:pb-6 [padding-bottom:max(1rem,env(safe-area-inset-bottom))]">
              Pilar eller svep · Esc stänger
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
