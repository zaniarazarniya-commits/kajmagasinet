"use client";

import Link from "next/link";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { Icon } from "@/components/ui/Icon";
import { LangSwitch } from "@/components/ui/LangSwitch";
import { Logo } from "@/components/ui/Logo";
import { NAV } from "@/lib/content";
import { SITE } from "@/lib/constants";

/**
 * Menysidans header — alltid solid och sticky.
 *
 * `.nav` wrappar här: utan det spillde Boka bord-knappen utanför viewporten
 * runt 900 px bredd.
 */
export function MenuHeader() {
  const { t } = useLanguage();

  return (
    <header className="site-header static-solid">
      <div className="wrap nav">
        <Link href="/" className="brand" aria-label={SITE.name}>
          <Logo fontSize={21} />
        </Link>

        <div className="nav-cta">
          <Link className="nav-back" href="/">
            <Icon name="back" />
            <span>{t(NAV.backHome)}</span>
          </Link>
          <LangSwitch />
          <Link className="btn btn-gold" href="/#boka">
            <Icon name="cal" />
            <span>{t(NAV.book)}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
