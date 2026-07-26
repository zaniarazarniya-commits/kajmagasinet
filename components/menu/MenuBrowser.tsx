"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { InfrakustCredit } from "@/components/layout/InfrakustCredit";
import { Icon } from "@/components/ui/Icon";
import { MENU_PAGE, NAV } from "@/lib/content";
import { SITE } from "@/lib/constants";
import {
  DIET_CODES,
  DIET_LEGEND,
  MENU,
  type MenuItem,
  type MenuRowType,
} from "@/lib/menu-data";
import { cn } from "@/lib/utils";

/**
 * Hela menyn: fyra grupper, nitton undersektioner, ~120 poster.
 *
 * Navigeringen är två-nivås av en anledning: med bara en nivå var 15 av 19
 * sektioner onåbara utan blindscroll.
 */
export function MenuBrowser() {
  const { t } = useLanguage();
  const [activeGroup, setActiveGroup] = useState(0);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  // De negativa marginalerna gör att "aktiv" utlöses när sektionen är i övre
  // delen av viewporten, under den sticky navigeringen — inte när den råkar
  // nudda underkanten.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const groupEls = MENU.map((group) => root.querySelector(`#${group.id}`)).filter(
      (el): el is Element => el !== null,
    );
    const groupObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = groupEls.indexOf(entry.target);
          if (index >= 0) setActiveGroup(index);
        });
      },
      { rootMargin: "-165px 0px -68% 0px" },
    );
    groupEls.forEach((el) => groupObserver.observe(el));

    const sectionEls = MENU.flatMap((group) =>
      group.sections.map((section) => root.querySelector(`#${section.id}`)),
    ).filter((el): el is Element => el !== null);
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-170px 0px -70% 0px" },
    );
    sectionEls.forEach((el) => sectionObserver.observe(el));

    return () => {
      groupObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  return (
    <>
      <div className="wrap masthead">
        <span className="kicker">{t(MENU_PAGE.kicker)}</span>
        <h1>{t(MENU_PAGE.title)}</h1>
        <p>{t(MENU_PAGE.subtitle)}</p>
      </div>

      <nav className="catnav" aria-label={t(MENU_PAGE.groupNav)}>
        <div className="catrow groups">
          {MENU.map((group, i) => (
            <a
              key={group.id}
              href={`#${group.id}`}
              className={cn(i === activeGroup && "on")}
              aria-current={i === activeGroup ? "true" : undefined}
            >
              <Icon name={group.icon} />
              <span>{t(group.title)}</span>
            </a>
          ))}
        </div>
        {/* Pillren byts ut när man scrollar in i en ny grupp. */}
        <div className="catrow subs" aria-label={t(MENU_PAGE.sectionNav)}>
          {MENU[activeGroup].sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={cn(section.id === activeSection && "on")}
              aria-current={section.id === activeSection ? "true" : undefined}
            >
              {t(section.title)}
            </a>
          ))}
        </div>
      </nav>

      <main className="wrap menu-main">
        {/* Legenden måste ligga före innehållet — annars förstår ingen märkningen. */}
        <div className="legend">
          {DIET_LEGEND.map(({ code, label }) => (
            <span className="li" key={code}>
              <span className={cn("dt", code)}>{DIET_CODES[code]}</span>
              {t(label)}
            </span>
          ))}
        </div>

        <div ref={rootRef}>
          {MENU.map((group) => (
            <section className="group" id={group.id} key={group.id}>
              <div className="ghead">
                <h2>{t(group.title)}</h2>
                <div className="gimg">
                  <Image
                    src={group.image}
                    alt={t(group.imageAlt)}
                    fill
                    sizes="(max-width: 820px) 100vw, 300px"
                  />
                </div>
              </div>
              {group.note && (
                <p className="snote" style={{ marginTop: 18 }}>
                  {t(group.note)}
                </p>
              )}

              {group.sections.map((section) => (
                <div className="sec" id={section.id} key={section.id}>
                  <h3>
                    <Icon name={section.icon} />
                    {t(section.title)}
                  </h3>
                  {section.note && <p className="snote">{t(section.note)}</p>}

                  {section.type === "plain" ? (
                    <div className="plain">
                      {section.items.map((item) => (
                        <div key={item.name}>
                          {item.name}
                          {item.meta && <span>{t(item.meta)}</span>}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rows">
                      {section.items.map((item) => (
                        <Row key={item.name} item={item} type={section.type} />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </section>
          ))}
        </div>

        <div className="allergy">
          <Icon name="info" />
          <span>
            <b>{t(MENU_PAGE.allergyTitle)}</b> {t(MENU_PAGE.allergyBody)}
          </span>
        </div>

        <div className="endcta">
          <Link className="btn btn-gold" href="/#boka">
            <Icon name="cal" />
            <span>{t(NAV.book)}</span>
          </Link>
          <a className="btn btn-ghost" href={`tel:${SITE.phoneTel}`}>
            <Icon name="phone" />
            <span>{t(MENU_PAGE.call)}</span>
          </a>
        </div>
      </main>

      <footer aria-label="Sidfot">
        <div className="menu-footer">
          <div className="wrap foot">
            <span>
              {`${SITE.address} · `}
              <a href={`tel:${SITE.phoneTel}`}>{SITE.phone}</a>
            </span>
            <span>{t(MENU_PAGE.footNote)}</span>
          </div>
        </div>
        <InfrakustCredit />
      </footer>
    </>
  );
}

function Row({ item, type }: { item: MenuItem; type: MenuRowType }) {
  const { t } = useLanguage();
  const hasSplitPrice = Boolean(item.glassPrice || item.bottlePrice);

  return (
    <div className={cn("row", type === "tight" && "tight")}>
      <div className="nm">
        {item.name}
        {item.meta && <span className="meta">{t(item.meta)}</span>}
        {item.diet?.map((code) => (
          <span className={cn("dt", code)} key={code}>
            {DIET_CODES[code]}
          </span>
        ))}
        {item.mark && <span className="mark">{t(item.mark)}</span>}
      </div>

      <div className="pr">
        {hasSplitPrice ? (
          /* Varje pris etiketteras — "119/449:-" lämnade gästen att gissa. */
          <div className="prx">
            {item.glassPrice && (
              <span>
                {item.glassPrice}
                <small>{t(MENU_PAGE.glass)}</small>
              </span>
            )}
            {item.bottlePrice && (
              <span>
                {item.bottlePrice}
                <small>{t(MENU_PAGE.bottle)}</small>
              </span>
            )}
          </div>
        ) : (
          item.price
        )}
      </div>

      {item.description && <p className="ds">{t(item.description)}</p>}
    </div>
  );
}
