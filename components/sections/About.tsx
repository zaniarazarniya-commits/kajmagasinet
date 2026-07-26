"use client";

import Image from "next/image";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { ABOUT } from "@/lib/content";
import { IMAGES } from "@/lib/constants";

export function About() {
  const { t } = useLanguage();

  return (
    <section className="about section-y" id="om">
      <div className="wrap">
        <Reveal className="sec-head">
          <span className="kicker">{t(ABOUT.kicker)}</span>
          <h2>{t(ABOUT.heading)}</h2>
        </Reveal>

        <div className="about-grid">
          {/* Sidans viktigaste bild — det enda som ger verksamheten ett ansikte. */}
          <Reveal as="figure" className="portrait">
            <Image
              src={IMAGES.portrait.src}
              alt={t(IMAGES.portrait.alt)}
              fill
              sizes="(max-width: 920px) 100vw, 640px"
            />
            <figcaption>
              <b>{t(ABOUT.captionTitle)}</b>
              <span>{t(ABOUT.captionBody)}</span>
            </figcaption>
          </Reveal>

          <Reveal className="about-copy">
            <h3>{t(ABOUT.subheading)}</h3>
            {ABOUT.body.map((paragraph) => (
              <p key={paragraph.sv} className="dim">
                {t(paragraph)}
              </p>
            ))}
            <div className="mini">
              {IMAGES.aboutMini.map((image) => (
                <figure key={image.src}>
                  <Image
                    src={image.src}
                    alt={t(image.alt)}
                    fill
                    sizes="(max-width: 920px) 50vw, 260px"
                  />
                </figure>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
