"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { Icon } from "@/components/ui/Icon";
import {
  usePrefersReducedMotion,
  useOpeningStatus,
} from "@/components/ui/useOpeningStatus";
import { HERO, NAV } from "@/lib/content";
import { IMAGES, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

const SLIDE_INTERVAL = 5500;

export function Hero() {
  const { t } = useLanguage();
  const status = useOpeningStatus();
  const reducedMotion = usePrefersReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setInterval(
      () => setActive((i) => (i + 1) % IMAGES.heroSlides.length),
      SLIDE_INTERVAL,
    );
    return () => window.clearInterval(timer);
  }, [reducedMotion]);

  return (
    <section className="hero" id="top">
      {/* Första bilden bär sidans LCP. */}
      <link rel="preload" as="image" href={IMAGES.heroSlides[0].src} />

      <div className="hero-bg">
        {IMAGES.heroSlides.map((slide, i) => (
          <div
            key={slide.src}
            className={cn("slide", i === active && "active")}
            style={{ backgroundImage: `url('${slide.src}')` }}
            // Bara bilden som visas beskrivs — annars läses tre bilder upp.
            role={i === active ? "img" : undefined}
            aria-label={i === active ? t(slide.alt) : undefined}
            aria-hidden={i === active ? undefined : true}
          />
        ))}
      </div>

      <div className="hero-inner">
        <div className="hero-content">
          <span className="kicker">{t(HERO.kicker)}</span>
          <h1>{HERO.title}</h1>
          <p className="hero-tag">{t(HERO.tagline)}</p>
          <div className="hero-actions">
            <a className="btn btn-gold" href="#boka">
              <Icon name="cal" />
              <span>{t(NAV.book)}</span>
            </a>
            <Link className="btn btn-ghost" href="/meny">
              <Icon name="plate" />
              <span>{t(HERO.seeMenu)}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Infobaren signalerar redan att sidan fortsätter nedanför — därför
          finns ingen separat scroll-cue. */}
      <div className="hero-bar">
        <div className="hero-bar-inner">
          <div className="item">
            <span className={cn("status-dot", status && !status.open && "closed")} />
            <span>
              {status ? (
                status.open ? (
                  <>
                    <b>{t(HERO.openNow)}</b>
                    {` · ${t(HERO.closes)} ${status.closesLabel}:00`}
                  </>
                ) : (
                  <>
                    <b>{t(HERO.closedNow)}</b>
                    {` · ${t(HERO.opens)} ${status.opensLabel}:00`}
                  </>
                )
              ) : null}
            </span>
          </div>
          <div className="item">
            <Icon name="clock" />
            <span>{status ? `${t(HERO.today)} ${status.todayLabel}` : null}</span>
          </div>
          <div className="item">
            <Icon name="pin" />
            <span>{`${SITE.streetAddress}, ${SITE.city}`}</span>
          </div>
          <span className="spacer" />
          <a
            className="item"
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="insta" />
            <span>{SITE.instagramHandle}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
