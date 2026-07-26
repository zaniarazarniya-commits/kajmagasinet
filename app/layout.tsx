import type { Metadata, Viewport } from "next";
import { draftMode } from "next/headers";
import { Jost, Mulish, Playfair_Display } from "next/font/google";
import { LanguageProvider } from "@/components/i18n/LanguageProvider";
import { VisualEditingFrameGate } from "@/components/sanity/VisualEditingFrameGate";
import { IMAGES, SITE } from "@/lib/constants";
import { openingHoursSpecification } from "@/lib/hours";
import { jsonLd } from "@/lib/jsonLd";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

/** Närmast originalloggans geometriska sans. */
const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
});

const siteUrl = "https://kajmagasinet.se";

const description =
  "Restaurang och bar direkt vid vattnet i Lysekil sedan 2010. Bohuslänska råvaror, egenimporterade viner och husets drinkar. Boka bord på 076-716 04 24.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Kajmagasinet — Restaurang och bar vid kajen i Lysekil",
    template: "%s | Kajmagasinet i Lysekil",
  },
  description,
  keywords: [
    "restaurang lysekil",
    "kajmagasinet lysekil",
    "boka bord lysekil",
    "meny lysekil",
    "bar lysekil",
  ],
  alternates: { canonical: "/" },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: "Kajmagasinet — Restaurang och bar vid kajen i Lysekil",
    description,
    locale: "sv_SE",
    images: [{ url: IMAGES.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: [IMAGES.ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: "#0c2034",
};

const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": `${siteUrl}/#restaurant`,
  name: SITE.name,
  url: siteUrl,
  logo: `${siteUrl}${IMAGES.logo}`,
  image: `${siteUrl}${IMAGES.ogImage}`,
  description,
  telephone: SITE.phoneTel,
  email: SITE.email,
  servesCuisine: ["Svenskt", "Bohuslänskt", "Skaldjur"],
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.streetAddress,
    postalCode: SITE.postalCode,
    addressLocality: SITE.city,
    addressCountry: "SE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: SITE.geo.latitude,
    longitude: SITE.geo.longitude,
  },
  sameAs: [SITE.instagram],
  openingHoursSpecification,
  acceptsReservations: true,
};

const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: SITE.name,
  inLanguage: "sv-SE",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled } = await draftMode();

  return (
    <html
      lang="sv"
      className={`${playfair.variable} ${mulish.variable} ${jost.variable}`}
    >
      <head>
        {/* Utan JS kör inga IntersectionObservers, och .reveal skulle lämna
            hela sidan osynlig. */}
        <noscript>
          <style>{".reveal{opacity:1;transform:none}"}</style>
        </noscript>
      </head>
      <body>
        <script type="application/ld+json">{jsonLd(webSiteJsonLd)}</script>
        <script type="application/ld+json">{jsonLd(restaurantJsonLd)}</script>
        <LanguageProvider>{children}</LanguageProvider>
        {isEnabled && <VisualEditingFrameGate />}
      </body>
    </html>
  );
}
