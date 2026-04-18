"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { Anchor, ChevronLeft, ChevronRight } from "lucide-react";
import { DRINKS } from "@/lib/constants";

export function Drinks() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = useCallback(
    (next: number) => {
      const total = DRINKS.length;
      const wrapped = ((next % total) + total) % total;
      setDirection(next > index ? 1 : -1);
      setIndex(wrapped);
    },
    [index]
  );

  const prev = useCallback(() => go(index - 1), [go, index]);
  const next = useCallback(() => go(index + 1), [go, index]);

  const onCarouselDragEnd = useCallback(
    (_: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
      const { offset, velocity } = info;
      const flick = velocity.x * 0.18;
      const combined = offset.x + flick;
      const minSwipe = 56;
      if (combined < -minSwipe) next();
      else if (combined > minSwipe) prev();
    },
    [next, prev]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  const current = DRINKS[index];

  return (
    <section
      id="drinkar"
      className="relative py-20 md:py-36 bg-[var(--ocean-deep)] text-[var(--canvas)] overflow-hidden"
      aria-label="Drinkar"
    >
      {/* Diskret ankarvattenmärke */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <Anchor
          size={520}
          className="text-[var(--canvas)]/[0.025]"
          strokeWidth={0.3}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Rubrik */}
        <div className="text-center mb-10 md:mb-20">
          <div
            className="flex items-center justify-center gap-3 mb-5"
            aria-hidden="true"
          >
            <span className="h-px w-8 bg-[var(--brass)]/60" />
            <span className="text-[10px] font-sans font-medium uppercase tracking-[0.32em] text-[var(--brass-light)]">
              Baren
            </span>
            <span className="h-px w-8 bg-[var(--brass)]/60" />
          </div>
          <h2
            className="font-serif font-normal text-[var(--canvas)] leading-[1.05] mb-5"
            style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}
          >
            Något kallt i glaset?
          </h2>
          <p className="max-w-2xl mx-auto text-[var(--canvas)]/70 text-sm md:text-base leading-[1.6] font-sans">
            Baren är hjärtat i huset och här finns verkligen allt. Vi blandar allt
            från svalkande Daiquiris och kaffedrinkar till att servera kalla, lokala
            hantverksöl. För vinälskaren har vi något helt unikt: vi importerar våra
            egna viner direkt från italienska Vogadori Vini – ett exklusivt urval du
            bara hittar hos oss.
          </p>
        </div>

        {/* Karusell — svep vänster/höger för nästa/föregående */}
        <motion.div
          className="grid md:grid-cols-[1fr_1fr] gap-6 md:gap-16 items-center cursor-grab active:cursor-grabbing select-none"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          dragDirectionLock
          onDragEnd={onCarouselDragEnd}
        >
          {/* Bild */}
          <div className="relative">
            <div className="relative aspect-square md:aspect-[4/5] w-full max-w-[340px] md:max-w-md mx-auto overflow-hidden rounded-[2px] border border-[var(--canvas)]/10 bg-[var(--ocean-abyss)]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current.slug}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -40 }}
                  transition={{
                    type: "spring",
                    stiffness: 420,
                    damping: 38,
                    mass: 0.85,
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src={current.image}
                    alt={current.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Räknare */}
            <div className="mt-6 flex items-center justify-center gap-3 md:hidden">
              <span className="font-serif text-[var(--brass-light)] tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="h-px w-6 bg-[var(--canvas)]/20" />
              <span className="text-[var(--canvas)]/50 tabular-nums text-sm">
                {String(DRINKS.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Text + kontroller */}
          <div className="text-center md:text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.slug}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{
                  type: "spring",
                  stiffness: 380,
                  damping: 36,
                  mass: 0.9,
                }}
              >
                <div className="hidden md:flex items-center gap-4 mb-6">
                  <span className="font-serif text-2xl text-[var(--brass-light)] tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px w-10 bg-[var(--canvas)]/25" />
                  <span className="text-[var(--canvas)]/45 tabular-nums text-sm">
                    av {String(DRINKS.length).padStart(2, "0")}
                  </span>
                </div>

                <h3
                  className="font-serif font-normal text-[var(--canvas)] leading-[1.1] mb-5"
                  style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}
                >
                  {current.name}
                </h3>

                <p className="text-[var(--canvas)]/75 text-[15px] md:text-lg leading-[1.65] font-sans font-light max-w-md mx-auto md:mx-0">
                  {current.description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Navigering */}
            <div className="mt-8 md:mt-10 flex items-center justify-center md:justify-start gap-4">
              <button
                type="button"
                onPointerDownCapture={(e) => e.stopPropagation()}
                onClick={prev}
                aria-label="Föregående drink"
                className="w-11 h-11 flex items-center justify-center rounded-full border border-[var(--canvas)]/20 text-[var(--canvas)]/80 hover:bg-[var(--canvas)] hover:text-[var(--ocean-deep)] hover:border-[var(--canvas)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brass)]"
              >
                <ChevronLeft size={18} strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onPointerDownCapture={(e) => e.stopPropagation()}
                onClick={next}
                aria-label="Nästa drink"
                className="w-11 h-11 flex items-center justify-center rounded-full border border-[var(--canvas)]/20 text-[var(--canvas)]/80 hover:bg-[var(--canvas)] hover:text-[var(--ocean-deep)] hover:border-[var(--canvas)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brass)]"
              >
                <ChevronRight size={18} strokeWidth={1.5} />
              </button>

              <div className="ml-4 flex items-center gap-1.5">
                {DRINKS.map((d, i) => (
                  <button
                    key={d.slug}
                    type="button"
                    onPointerDownCapture={(e) => e.stopPropagation()}
                    onClick={() => go(i)}
                    aria-label={`Gå till ${d.name}`}
                    aria-current={i === index}
                    className="group p-2 -m-2 focus-visible:outline-none"
                  >
                    <span
                      className={[
                        "block h-px transition-all",
                        i === index
                          ? "w-8 bg-[var(--brass-light)]"
                          : "w-5 bg-[var(--canvas)]/25 group-hover:bg-[var(--canvas)]/50",
                      ].join(" ")}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
