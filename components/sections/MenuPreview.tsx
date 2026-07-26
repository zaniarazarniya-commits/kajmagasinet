"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { MENU_PREVIEW, NAV, PREVIEW_DISHES } from "@/lib/content";
import { IMAGES } from "@/lib/constants";

/** Ett urval ur menyn — hela menyn ligger på /meny. */
export function MenuPreview() {
  const { t } = useLanguage();

  return (
    <section className="menu-section section-y" id="meny">
      <div className="wrap">
        <Reveal className="sec-head">
          <span className="kicker">{t(MENU_PREVIEW.kicker)}</span>
          <h2>{t(MENU_PREVIEW.heading)}</h2>
          <p className="lead" style={{ color: "var(--on-navy-dim)" }}>
            {t(MENU_PREVIEW.lead)}
          </p>
        </Reveal>

        <div className="menu-grid">
          {/* Ligger kvar medan man läser rättlistan. */}
          <Reveal className="menu-photo">
            <Image
              src={IMAGES.menuPhoto.src}
              alt={t(IMAGES.menuPhoto.alt)}
              fill
              sizes="(max-width: 920px) 100vw, 520px"
            />
          </Reveal>

          <Reveal>
            <p className="menu-sub">{t(MENU_PREVIEW.subheading)}</p>

            {PREVIEW_DISHES.map((dish) => (
              <div className="dish" key={dish.name}>
                <h4>
                  {dish.name}
                  {dish.tag === "sea" && (
                    <span className="tag sea">{t(MENU_PREVIEW.tagSea)}</span>
                  )}
                  {dish.tag === "local" && (
                    <span className="tag local">{t(MENU_PREVIEW.tagLocal)}</span>
                  )}
                </h4>
                <span className="price">{dish.price}</span>
                <p className="desc">{t(dish.description)}</p>
              </div>
            ))}

            <p className="menu-note">{t(MENU_PREVIEW.note)}</p>

            <div className="menu-actions">
              <Link className="btn btn-gold" href="/meny">
                <Icon name="plate" />
                <span>{t(MENU_PREVIEW.fullMenu)}</span>
              </Link>
              <a className="btn btn-ghost" href="#boka">
                <Icon name="cal" />
                <span>{t(NAV.book)}</span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
