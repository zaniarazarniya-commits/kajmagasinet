import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { StartupTelemetry } from "@/components/debug/StartupTelemetry";
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
  title: "Kajmagasinet — Restaurang och bar, Lysekil",
  description:
    "Restaurang och bar vid kajen i Lysekil. Mat från säsongens råvaror, terrass på sommaren, biljard och musik vid utvalda tillfällen.",
  keywords: ["restaurang lysekil", "bar lysekil", "kajmagasinet", "terrass", "lysekil"],
  openGraph: {
    title: "Kajmagasinet — Restaurang och bar, Lysekil",
    description: "Restaurang och bar vid vattnet i Lysekil. Öppet året runt; terrass maj–september.",
    locale: "sv_SE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" className={`${inter.variable} ${playfair.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <StartupTelemetry />
        {children}
      </body>
    </html>
  );
}
