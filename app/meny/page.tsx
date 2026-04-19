import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Menu } from "@/components/sections/Menu";
import { Drinks } from "@/components/sections/Drinks";
import { Booking } from "@/components/sections/Booking";
import { getSiteData } from "@/app/_lib/siteData";

export const metadata: Metadata = {
  title: "Meny | Kajmagasinet i Lysekil - Restaurang Lysekil",
  description:
    "Se menyn hos Kajmagasinet i Lysekil. Restaurang Lysekil med mat, drinkar och boka bord direkt online.",
};

export default async function MenuPage() {
  const { menuTiles, drinksResolved, openingHours } = await getSiteData();

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="px-6 pt-12 pb-2 bg-[var(--canvas)]">
          <div className="max-w-7xl mx-auto">
            <h1 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] text-[var(--ocean-deep)]">
              Meny hos Kajmagasinet i Lysekil - Restaurang Lysekil
            </h1>
          </div>
        </section>
        <Menu tiles={menuTiles} />
        <Drinks
          drinks={drinksResolved.drinks}
          sectionTitle={drinksResolved.sectionTitle}
          sectionIntro={drinksResolved.sectionIntro}
        />
        <Booking />
      </main>
      <Footer openingHours={openingHours} />
    </>
  );
}
