import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Booking } from "@/components/sections/Booking";
import { getSiteData } from "@/app/_lib/siteData";

export const metadata: Metadata = {
  title: "Boka bord | Kajmagasinet i Lysekil",
  description:
    "Boka bord på Kajmagasinet i Lysekil. Restaurang Lysekil vid kajen för lunch, middag och sällskap.",
};

export default async function BookingPage() {
  const { openingHours } = await getSiteData();

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="px-6 pt-12 pb-2 bg-[var(--canvas)]">
          <div className="max-w-7xl mx-auto">
            <h1 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] text-[var(--ocean-deep)]">
              Boka bord på Kajmagasinet i Lysekil
            </h1>
          </div>
        </section>
        <Booking />
      </main>
      <Footer openingHours={openingHours} />
    </>
  );
}
