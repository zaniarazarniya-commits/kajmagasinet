import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Heritage } from "@/components/sections/Heritage";
import { Menu } from "@/components/sections/Menu";
import { Drinks } from "@/components/sections/Drinks";
import { Vibe } from "@/components/sections/Vibe";
import { FindUs } from "@/components/sections/FindUs";
import { Booking } from "@/components/sections/Booking";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Heritage />
<Menu />
        <Drinks />
        <Vibe />
        <Booking />
        <FindUs />
      </main>
      <Footer />
    </>
  );
}
