import type { SanityImageSource } from "@sanity/image-url";
import { draftMode } from "next/headers";
import type { OpeningHourRow } from "@/components/sections/FindUs";
import {
  HERITAGE_GALLERY_TILES,
  MENU_GALLERY_TILES,
  OPENING_HOURS,
  VIBE_GALLERY_TILES,
} from "@/lib/constants";
import { client } from "@/sanity/lib/client";
import { draftClient } from "@/sanity/lib/draftClient";
import { urlFor } from "@/sanity/lib/image";
import { isSanityConfigured } from "@/sanity/env";
import { resolveDrinksSection } from "@/sanity/lib/resolveDrinksSection";
import { resolveGalleryTiles } from "@/sanity/lib/resolveGalleryTiles";
import {
  drinksSectionQuery,
  homePageQuery,
  pageGalleriesQuery,
  siteSettingsQuery,
} from "@/sanity/lib/queries";

function isHeroImageWithAsset(
  value: unknown,
): value is SanityImageSource & { asset: unknown } {
  return (
    typeof value === "object" &&
    value !== null &&
    "asset" in value &&
    (value as { asset: unknown }).asset != null
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

export async function getSiteData() {
  const { isEnabled } = await draftMode();

  let homeData: {
    headline?: string | null;
    heroImage?: unknown;
  } | null = null;

  let openingHours: OpeningHourRow[] =
    OPENING_HOURS as unknown as OpeningHourRow[];

  let heritageTiles = [...HERITAGE_GALLERY_TILES];
  let menuTiles = [...MENU_GALLERY_TILES];
  let vibeTiles = [...VIBE_GALLERY_TILES];
  let drinksResolved = resolveDrinksSection(null);

  if (isSanityConfigured) {
    try {
      const activeClient = isEnabled ? draftClient : client;
      const perspective = isEnabled ? "previewDrafts" : "published";
      const [home, site, galleries, drinksDoc] = await Promise.all([
        activeClient.fetch(homePageQuery, {}, { perspective }),
        activeClient.fetch(siteSettingsQuery, {}, { perspective }),
        activeClient.fetch(pageGalleriesQuery, {}, { perspective }),
        activeClient.fetch(drinksSectionQuery, {}, { perspective }),
      ]);
      homeData = home;
      const cmsHours = site?.openingHours?.filter(
        (r: { day?: string; time?: string }) => r?.day?.trim() && r?.time?.trim(),
      );
      if (cmsHours?.length) {
        openingHours = cmsHours as OpeningHourRow[];
      }
      heritageTiles = resolveGalleryTiles(
        galleries?.heritageSlides,
        HERITAGE_GALLERY_TILES,
        "heritage",
      );
      menuTiles = resolveGalleryTiles(
        galleries?.menuSlides,
        MENU_GALLERY_TILES,
        "menu",
      );
      vibeTiles = resolveGalleryTiles(
        galleries?.vibeSlides,
        VIBE_GALLERY_TILES,
        "vibe",
      );
      drinksResolved = resolveDrinksSection(drinksDoc);
    } catch {
      homeData = null;
    }
  }

  const heroImageUrl =
    homeData?.heroImage != null && isHeroImageWithAsset(homeData.heroImage)
      ? urlFor(homeData.heroImage).width(1920).height(1080).quality(85).url()
      : undefined;

  return {
    heroHeadline: homeData?.headline ?? null,
    heroImageUrl,
    heroImageAlt: heroImageAltFromQuery(homeData?.heroImage),
    openingHours,
    heritageTiles,
    menuTiles,
    vibeTiles,
    drinksResolved,
  };
}
