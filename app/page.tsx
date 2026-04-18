import { draftMode } from "next/headers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Heritage } from "@/components/sections/Heritage";
import { Menu } from "@/components/sections/Menu";
import { Drinks } from "@/components/sections/Drinks";
import { Vibe } from "@/components/sections/Vibe";
import { FindUs } from "@/components/sections/FindUs";
import { Booking } from "@/components/sections/Booking";
import { client } from "@/sanity/lib/client";
import { draftClient } from "@/sanity/lib/draftClient";
import { urlFor } from "@/sanity/lib/image";
import { homePageQuery } from "@/sanity/lib/queries";

export default async function Home() {
  const { isEnabled } = await draftMode();
  const activeClient = isEnabled ? draftClient : client;
  const data = await activeClient.fetch(
    homePageQuery,
    {},
    { perspective: isEnabled ? "previewDrafts" : "published" },
  );

  const heroImageUrl =
    data?.heroImage?.asset != null
      ? urlFor(data.heroImage).width(1920).height(1080).quality(85).url()
      : undefined;

  return (
    <>
      <Navbar />
      <main>
        <Hero
          headline={data?.headline}
          heroImageUrl={heroImageUrl}
          heroImageAlt={data?.heroImage?.alt}
        />
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
