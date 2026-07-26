import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { About } from "@/components/sections/About";
import { Bar } from "@/components/sections/Bar";
import { BookingContact } from "@/components/sections/BookingContact";
import { Hero } from "@/components/sections/Hero";
import { House } from "@/components/sections/House";
import { MenuPreview } from "@/components/sections/MenuPreview";
import { getSiteData } from "@/app/_lib/siteData";

export const metadata: Metadata = {
  title: "Kajmagasinet — Restaurang och bar vid kajen i Lysekil",
  description:
    "Restaurang och bar direkt vid vattnet i Lysekil sedan 2010. Se menyn, husets drinkar och de egenimporterade vinerna — och boka bord.",
  alternates: { canonical: "/" },
};

/**
 * Startsidan. Bakgrundsrytmen växlar medvetet mellan bara två teman:
 * marinblå (hero) → cream (Om oss) → marinblå (Meny) → djup marinblå (Baren)
 * → foto (Huset) → cream (Boka) → djup marinblå (Footer).
 */
export default async function Home() {
  const { openingHoursOverride, drinks } = await getSiteData();

  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <MenuPreview />
        <Bar drinks={drinks} />
        <House />
        <BookingContact openingHoursOverride={openingHoursOverride} />
      </main>
      <SiteFooter />
    </>
  );
}
