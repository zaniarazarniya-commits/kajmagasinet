import { draftMode } from "next/headers";
import type { OpeningHourOverride } from "@/components/sections/BookingContact";
import { client } from "@/sanity/lib/client";
import { draftClient } from "@/sanity/lib/draftClient";
import { isSanityConfigured } from "@/sanity/env";
import { resolveDrinksSection } from "@/sanity/lib/resolveDrinksSection";
import { drinksSectionQuery, siteSettingsQuery } from "@/sanity/lib/queries";

/**
 * Innehåll som personalen kan ändra i Sanity.
 *
 * Öppettidernas logik (status, "idag") räknas alltid ur `lib/hours.ts` — CMS:et
 * kan bara skriva om hur raderna visas, t.ex. vid säsongsändringar.
 */
export async function getSiteData() {
  const { isEnabled } = await draftMode();

  let openingHoursOverride: OpeningHourOverride[] | undefined;
  let drinksResolved = resolveDrinksSection(null);

  if (isSanityConfigured) {
    try {
      const activeClient = isEnabled ? draftClient : client;
      const perspective = isEnabled ? "previewDrafts" : "published";
      const [site, drinksDoc] = await Promise.all([
        activeClient.fetch(siteSettingsQuery, {}, { perspective }),
        activeClient.fetch(drinksSectionQuery, {}, { perspective }),
      ]);

      const cmsHours = site?.openingHours?.filter(
        (row: { day?: string; time?: string }) =>
          row?.day?.trim() && row?.time?.trim(),
      );
      if (cmsHours?.length) {
        openingHoursOverride = cmsHours as OpeningHourOverride[];
      }

      drinksResolved = resolveDrinksSection(drinksDoc);
    } catch {
      // Sajten ska fungera även om CMS:et inte svarar.
    }
  }

  return { openingHoursOverride, drinks: drinksResolved.drinks };
}
