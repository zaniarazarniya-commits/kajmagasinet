import type { Metadata } from "next";
import { MenuHeader } from "@/components/layout/MenuHeader";
import { MenuBrowser } from "@/components/menu/MenuBrowser";
import { IMAGES, SITE } from "@/lib/constants";

const title = "Meny & vinlista";
const description =
  "Hela menyn hos Kajmagasinet i Lysekil — förrätter, huvudrätter, barnmeny, desserter, öl, cider, mjöd, vin och sprit. Med kostmärkning och priser.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/meny" },
  // Utan egna fält ärvs startsidans delningskort. openGraph och twitter
  // ersätter layoutens i sin helhet, så bild och typ måste med här också.
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${title} | Kajmagasinet i Lysekil`,
    description,
    url: "/meny",
    locale: "sv_SE",
    images: [{ url: IMAGES.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Kajmagasinet i Lysekil`,
    description,
    images: [IMAGES.ogImage],
  },
};

export default function MenuPage() {
  return (
    <div className="menu-page">
      <MenuHeader />
      <MenuBrowser />
    </div>
  );
}
