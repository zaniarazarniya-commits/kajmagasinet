import { draftMode } from "next/headers";
import type { SanityImageSource } from "@sanity/image-url";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Heritage } from "@/components/sections/Heritage";
import { Menu } from "@/components/sections/Menu";
import { Drinks } from "@/components/sections/Drinks";
import { Vibe } from "@/components/sections/Vibe";
import { FindUs } from "@/components/sections/FindUs";
import type { OpeningHourRow } from "@/components/sections/FindUs";
import { Booking } from "@/components/sections/Booking";
import { OPENING_HOURS } from "@/lib/constants";
import { client } from "@/sanity/lib/client";
import { draftClient } from "@/sanity/lib/draftClient";
import { urlFor } from "@/sanity/lib/image";
import { isSanityConfigured } from "@/sanity/env";
import { homePageQuery, siteSettingsQuery } from "@/sanity/lib/queries";

function isHeroImageWithAsset(
  v: unknown,
): v is SanityImageSource & { asset: unknown } {
  return (
    typeof v === "object" &&
    v !== null &&
    "asset" in v &&
    (v as { asset: unknown }).asset != null
  );
}

function heroImageAltFromQuery(heroImage: unknown): string | undefined {
  if (
    typeof heroImage === "object" &&
    heroImage !== null &&
    "alt" in heroImage &&
    typeof (heroImage as { alt: unknown }).alt === "string"
  ) {
    return (heroImage as { alt: string }).alt;
  }
  return undefined;
}

export default async function Home() {
  const { isEnabled } = await draftMode();

  let data: {
    headline?: string | null;
    heroImage?: unknown;
  } | null = null;

  let openingHours: OpeningHourRow[] = OPENING_HOURS as unknown as OpeningHourRow[];

  if (isSanityConfigured) {
    try {
      const activeClient = isEnabled ? draftClient : client;
      const perspective = isEnabled ? "previewDrafts" : "published";
      const [home, site] = await Promise.all([
        activeClient.fetch(homePageQuery, {}, { perspective }),
        activeClient.fetch(siteSettingsQuery, {}, { perspective }),
      ]);
      data = home;
      const cmsHours = site?.openingHours?.filter(
        (r: { day?: string; time?: string }) =>
          r?.day?.trim() && r?.time?.trim(),
      );
      if (cmsHours?.length) {
        openingHours = cmsHours as OpeningHourRow[];
      }
    } catch {
      data = null;
    }
  }

  const heroImageUrl =
    data?.heroImage != null && isHeroImageWithAsset(data.heroImage)
      ? urlFor(data.heroImage).width(1920).height(1080).quality(85).url()
      : undefined;

  return (
    <>
      <Navbar />
      <main>
        <Hero
          headline={data?.headline}
          heroImageUrl={heroImageUrl}
          heroImageAlt={heroImageAltFromQuery(data?.heroImage)}
        />
        <Heritage />
        <Menu />
        <Drinks />
        <Vibe />
        <Booking />
        <FindUs openingHours={openingHours} />
      </main>
      <Footer openingHours={openingHours} />
    </>
  );
}
