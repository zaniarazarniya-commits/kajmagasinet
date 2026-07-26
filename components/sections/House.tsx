"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { usePrefersReducedMotion } from "@/components/ui/useOpeningStatus";
import { HOUSE } from "@/lib/content";
import { IMAGES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const SLIDE_INTERVAL = 6000;

export function House() {
  const { t } = useLanguage();
  const reducedMotion = usePrefersReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setInterval(
      () => setActive((i) => (i + 1) % IMAGES.houseSlides.length),
      SLIDE_INTERVAL,
    );
    return () => window.clearInterval(timer);
  }, [reducedMotion]);

  return (
    <section className="huset" aria-labelledby="huset-heading">
      <div className="huset-bg" aria-hidden="true">
        {IMAGES.houseSlides.map((src, i) => (
          <div
            key={src}
            className={cn("hslide", i === active && "active")}
            style={{ backgroundImage: `url('${src}')` }}
          />
        ))}
      </div>

      <div className="wrap">
        <Reveal className="huset-inner">
          <span className="kicker">{t(HOUSE.kicker)}</span>
          <h2 id="huset-heading">{t(HOUSE.heading)}</h2>
          <p>{t(HOUSE.body)}</p>
          <div className="huset-tags">
            {HOUSE.tags.map((tag) => (
              <span className="tagpill" key={tag.icon}>
                <Icon name={tag.icon as IconName} />
                <span>{t(tag.label)}</span>
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
