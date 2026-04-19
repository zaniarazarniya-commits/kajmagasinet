import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FindUs } from "@/components/sections/FindUs";
import { getSiteData } from "@/app/_lib/siteData";

export const metadata: Metadata = {
  title: "Kontakt & Hitta hit | Kajmagasinet i Lysekil",
  description:
    "Kontaktuppgifter, karta och öppettider för Kajmagasinet i Lysekil. Hitta till restaurangen och boka bord enkelt.",
};

export default async function ContactPage() {
  const { openingHours } = await getSiteData();

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="px-6 pt-12 pb-2 bg-[var(--ocean-deep)]">
          <div className="max-w-7xl mx-auto">
            <h1 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] text-[var(--canvas)]">
              Kontakt - Kajmagasinet i Lysekil
            </h1>
          </div>
        </section>
        <FindUs openingHours={openingHours} />
      </main>
      <Footer openingHours={openingHours} />
    </>
  );
}
