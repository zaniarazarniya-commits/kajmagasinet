import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Heritage } from "@/components/sections/Heritage";
import { Menu } from "@/components/sections/Menu";
import { Drinks } from "@/components/sections/Drinks";
import { Vibe } from "@/components/sections/Vibe";
import { FindUs } from "@/components/sections/FindUs";
import { Booking } from "@/components/sections/Booking";
import { getSiteData } from "@/app/_lib/siteData";

export const metadata: Metadata = {
  title: "Kajmagasinet i Lysekil | Restaurang Lysekil vid kajen",
  description:
    "Kajmagasinet i Lysekil - restaurang med meny, drinkar och bokning direkt vid vattnet. Boka bord hos Kajmagasinet Lysekil idag.",
};

export default async function Home() {
  const {
    heroHeadline,
    heroImageAlt,
    heroImageUrl,
    openingHours,
    heritageTiles,
    menuTiles,
    vibeTiles,
    drinksResolved,
  } = await getSiteData();

  return (
    <>
      <Navbar />
      <main>
        <Hero
          headline={heroHeadline}
          heroImageUrl={heroImageUrl}
          heroImageAlt={heroImageAlt}
        />
        <Heritage tiles={heritageTiles} />
        <Menu tiles={menuTiles} />
        <Drinks
          drinks={drinksResolved.drinks}
          sectionTitle={drinksResolved.sectionTitle}
          sectionIntro={drinksResolved.sectionIntro}
        />
        <Vibe tiles={vibeTiles} />
        <Booking />
        <FindUs openingHours={openingHours} />
      </main>
      <Footer openingHours={openingHours} />
    </>
  );
}
