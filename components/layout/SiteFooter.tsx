"use client";

import Link from "next/link";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { InfrakustCredit } from "@/components/layout/InfrakustCredit";
import { Logo } from "@/components/ui/Logo";
import { FOOTER, NAV } from "@/lib/content";
import { SITE } from "@/lib/constants";

export function SiteFooter() {
  const { t } = useLanguage();

  return (
    <footer aria-label="Sidfot">
      <div className="site-footer">
        <div className="wrap">
          <div className="foot-grid">
            <div className="foot-brand">
              <div className="fb">
                <Logo fontSize={26} />
              </div>
              <p>{t(FOOTER.blurb)}</p>
            </div>

            <div className="foot-col">
              <h5>{t(FOOTER.navigate)}</h5>
              <Link href="/meny">{t(FOOTER.menuAndWine)}</Link>
              <Link href="/#baren">{t(NAV.bar)}</Link>
              <Link href="/#om">{t(NAV.about)}</Link>
              <Link href="/#boka">{t(NAV.book)}</Link>
            </div>

            <div className="foot-col">
              <h5>{t(FOOTER.findUs)}</h5>
              <p>{SITE.address}</p>
              <a href={`tel:${SITE.phoneTel}`}>{SITE.phone}</a>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer">
                {SITE.instagramHandle}
              </a>
            </div>
          </div>

          <div className="foot-bottom">
            <span>{t(FOOTER.copyright)}</span>
            <span>{t(FOOTER.place)}</span>
          </div>
        </div>
      </div>

      <InfrakustCredit />
    </footer>
  );
}
