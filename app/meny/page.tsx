import type { Metadata } from "next";
import { MenuHeader } from "@/components/layout/MenuHeader";
import { MenuBrowser } from "@/components/menu/MenuBrowser";

export const metadata: Metadata = {
  title: "Meny & vinlista",
  description:
    "Hela menyn hos Kajmagasinet i Lysekil — förrätter, huvudrätter, barnmeny, desserter, öl, cider, mjöd, vin och sprit. Med kostmärkning och priser.",
  alternates: { canonical: "/meny" },
};

export default function MenuPage() {
  return (
    <div className="menu-page">
      <MenuHeader />
      <MenuBrowser />
    </div>
  );
}
