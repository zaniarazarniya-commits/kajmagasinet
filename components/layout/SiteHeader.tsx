"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { Icon, type IconName } from "@/components/ui/Icon";
import { LangSwitch } from "@/components/ui/LangSwitch";
import { Logo } from "@/components/ui/Logo";
import { NAV } from "@/lib/content";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

type NavItem = { icon: IconName; label: (typeof NAV)[keyof typeof NAV]; href: string };

const NAV_ITEMS: NavItem[] = [
  { icon: "plate", label: NAV.menu, href: "/meny" },
  { icon: "glass", label: NAV.bar, href: "/#baren" },
  { icon: "people", label: NAV.about, href: "/#om" },
  { icon: "pin", label: NAV.findUs, href: "/#kontakt" },
];

export function SiteHeader() {
  const { t } = useLanguage();
  const [solid, setSolid] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [drawerOpen]);

  return (
    <>
      <header className={cn("site-header", solid && "solid")}>
        <div className="wrap nav">
          <Link href="/#top" className="brand" aria-label={SITE.name}>
            <Logo />
          </Link>

          <nav aria-label="Huvudnavigation">
            <ul className="nav-links">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <Icon name={item.icon} />
                    <span>{t(item.label)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav-cta">
            <a className="nav-phone" href={`tel:${SITE.phoneTel}`}>
              <Icon name="phone" />
              {SITE.phone}
            </a>
            <LangSwitch />
            <Link className="btn btn-gold nav-book" href="/#boka">
              <Icon name="cal" />
              <span>{t(NAV.book)}</span>
            </Link>
            <button
              type="button"
              className="burger"
              aria-label={t(NAV.openMenu)}
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen(true)}
            >
              <Icon name="burger" />
            </button>
          </div>
        </div>
      </header>

      <div
        className={cn("drawer", drawerOpen && "open")}
        id="drawer"
        role="dialog"
        aria-modal="true"
        aria-label={t(NAV.menu)}
      >
        <div className="drawer-top">
          <Link href="/#top" className="brand" aria-label={SITE.name}>
            <Logo />
          </Link>
          <button
            type="button"
            className="drawer-close"
            aria-label={t(NAV.closeMenu)}
            onClick={() => setDrawerOpen(false)}
          >
            &times;
          </button>
        </div>

        <nav aria-label="Mobilnavigation">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setDrawerOpen(false)}>
              <Icon name={item.icon} />
              <span>{t(item.label)}</span>
            </Link>
          ))}
        </nav>

        <div className="drawer-cta">
          <Link
            className="btn btn-gold"
            href="/#boka"
            onClick={() => setDrawerOpen(false)}
          >
            <Icon name="cal" />
            <span>{t(NAV.book)}</span>
          </Link>
          <a className="btn btn-ghost" href={`tel:${SITE.phoneTel}`}>
            <Icon name="phone" />
            <span>{SITE.phone}</span>
          </a>
        </div>
      </div>
    </>
  );
}
