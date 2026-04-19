import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { Inter, Playfair_Display } from "next/font/google";
import { VisualEditingFrameGate } from "@/components/sanity/VisualEditingFrameGate";
import { SITE } from "@/lib/constants";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kajmagasinet.se"),
  title: {
    default: "Kajmagasinet i Lysekil | Restaurang Lysekil",
    template: "%s | Kajmagasinet i Lysekil",
  },
  description:
    "Kajmagasinet i Lysekil är en restaurang och bar vid kajen. Boka bord, se meny och hitta kontaktuppgifter för restaurang i Lysekil.",
  keywords: [
    "restaurang lysekil",
    "kajmagasinet lysekil",
    "boka bord lysekil",
    "meny lysekil",
    "bar lysekil",
  ],
  openGraph: {
    title: "Kajmagasinet i Lysekil | Restaurang Lysekil",
    description:
      "Restaurang och bar vid vattnet i Lysekil. Se meny, boka bord och hitta hit till Kajmagasinet i Lysekil.",
    locale: "sv_SE",
    type: "website",
  },
};

const siteUrl = "https://kajmagasinet.se";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": `${siteUrl}/#restaurant`,
  name: "Kajmagasinet i Lysekil",
  url: siteUrl,
  image: `${siteUrl}/images/hero-atmosphere.svg`,
  description:
    "Kajmagasinet i Lysekil är en restaurang och bar vid kajen. Boka bord, se meny och hitta hit.",
  servesCuisine: ["Swedish", "Seafood", "Bistro"],
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rosviksgatan 1",
    postalCode: "453 30",
    addressLocality: "Lysekil",
    addressCountry: "SE",
  },
  telephone: SITE.phoneTel,
  email: SITE.email,
  sameAs: [SITE.instagram],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "11:00",
      closes: "23:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Friday", "Saturday"],
      opens: "11:00",
      closes: "01:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "12:00",
      closes: "22:00",
    },
  ],
};

const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: "Kajmagasinet i Lysekil",
  inLanguage: "sv-SE",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled } = await draftMode();

  return (
    <html lang="sv" className={`${inter.variable} ${playfair.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
        {isEnabled && <VisualEditingFrameGate />}
      </body>
    </html>
  );
}
