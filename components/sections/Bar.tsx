"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { usePrefersReducedMotion } from "@/components/ui/useOpeningStatus";
import { BAR } from "@/lib/content";
import { IMAGES, type DrinkItem } from "@/lib/constants";
import { cn } from "@/lib/utils";

const AUTO_ADVANCE = 6500;

/** Läser antalet kort per sida ur CSS, så brytpunkterna bara finns på ett ställe. */
function readPerPage(viewport: HTMLElement | null): number {
  if (!viewport) return 3;
  const raw = getComputedStyle(viewport).getPropertyValue("--drink-per-page");
  const parsed = Number.parseInt(raw.trim(), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 3;
}

export function Bar({ drinks }: { drinks: DrinkItem[] }) {
  const { t } = useLanguage();
  const reducedMotion = usePrefersReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);

  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const perPage = readPerPage(viewport);
    setPageCount(Math.max(1, Math.ceil(drinks.length / perPage)));
  }, [drinks.length]);

  useEffect(() => {
    measure();
    const observer = new ResizeObserver(measure);
    if (viewportRef.current) observer.observe(viewportRef.current);
    return () => observer.disconnect();
  }, [measure]);

  const goTo = useCallback(
    (next: number) => {
      const viewport = viewportRef.current;
      if (!viewport) return;
      const gap = Number.parseFloat(
        getComputedStyle(viewport).getPropertyValue("--drink-gap"),
      );
      const step = viewport.clientWidth + (Number.isFinite(gap) ? gap : 24);
      const target = ((next % pageCount) + pageCount) % pageCount;
      viewport.scrollTo({
        left: Math.min(target * step, viewport.scrollWidth - viewport.clientWidth),
        behavior: reducedMotion ? "auto" : "smooth",
      });
    },
    [pageCount, reducedMotion],
  );

  // Punkten följer den faktiska scrollpositionen, så svep på mobil håller
  // markeringen i synk utan extra bokföring.
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const onScroll = () => {
      const gap = Number.parseFloat(
        getComputedStyle(viewport).getPropertyValue("--drink-gap"),
      );
      const step = viewport.clientWidth + (Number.isFinite(gap) ? gap : 24);
      setPage(Math.min(pageCount - 1, Math.round(viewport.scrollLeft / step)));
    };
    viewport.addEventListener("scroll", onScroll, { passive: true });
    return () => viewport.removeEventListener("scroll", onScroll);
  }, [pageCount]);

  useEffect(() => {
    if (reducedMotion || paused || pageCount < 2) return;
    const timer = window.setInterval(() => goTo(page + 1), AUTO_ADVANCE);
    return () => window.clearInterval(timer);
  }, [goTo, page, pageCount, paused, reducedMotion]);

  return (
    <section className="bar section-y" id="baren">
      <Icon name="anchor" className="bar-anchor" />

      <div className="wrap">
        <Reveal className="sec-head center">
          <span className="kicker center">{t(BAR.kicker)}</span>
          <h2>{t(BAR.heading)}</h2>
          <p className="lead" style={{ color: "var(--on-navy-dim)" }}>
            {t(BAR.lead)}
          </p>
        </Reveal>

        <Reveal
          className="drink-carousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div className="drink-viewport" ref={viewportRef} tabIndex={0}>
            <div className="drink-track">
              {drinks.map((drink) => (
                <article className="drink" key={drink.slug}>
                  <Image
                    src={drink.image}
                    alt={drink.name}
                    fill
                    sizes="(max-width: 560px) 100vw, (max-width: 920px) 50vw, 400px"
                  />
                  <div className="ov">
                    {/* Smakprofil, inte löpnummer — ett nummer säger gästen inget. */}
                    <span className="taste">{t(drink.taste)}</span>
                    <h4>{drink.name}</h4>
                    <p>{t(drink.description)}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="drink-nav">
            <div className="drink-dots">
              {Array.from({ length: pageCount }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  className={cn(i === page && "active")}
                  aria-label={`${t(BAR.page)} ${i + 1}`}
                  aria-current={i === page}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
            <div className="drink-arrows">
              <button
                type="button"
                className="darr"
                aria-label={t(BAR.previous)}
                onClick={() => goTo(page - 1)}
              >
                <Icon name="arrowL" />
              </button>
              <button
                type="button"
                className="darr"
                aria-label={t(BAR.next)}
                onClick={() => goTo(page + 1)}
              >
                <Icon name="arrowR" />
              </button>
            </div>
          </div>
        </Reveal>

        {/* Viner som inte finns någon annanstans i Sverige — verksamhetens
            starkaste differentiator, och därför en egen plats. */}
        <div className="wine">
          <Reveal className="wine-photo">
            <Image
              src={IMAGES.winePhoto.src}
              alt={t(IMAGES.winePhoto.alt)}
              fill
              sizes="(max-width: 920px) 100vw, 560px"
            />
          </Reveal>
          <Reveal>
            <span className="kicker">{t(BAR.wineKicker)}</span>
            <h3>{t(BAR.wineHeading)}</h3>
            <p>{t(BAR.wineBody)}</p>
            <div className="menu-actions">
              <Link className="btn btn-ghost" href="/meny#vogadori">
                <Icon name="glass" />
                <span>{t(BAR.wineCta)}</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
