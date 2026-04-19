"use client";

import { Anchor } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhotoGallery } from "@/components/ui/PhotoGallery";
import type { GalleryTile } from "@/lib/constants";
import { HERITAGE_GALLERY_TILES } from "@/lib/constants";

type HeritageProps = {
  tiles?: GalleryTile[];
};

export function Heritage({ tiles = [...HERITAGE_GALLERY_TILES] }: HeritageProps) {
  return (
    <section
      id="arv"
      className="relative pt-16 pb-14 md:pt-20 md:pb-16 px-6 bg-[var(--canvas)] border-t border-[var(--rope)]/15"
      aria-label="Om oss"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center mb-8" aria-hidden="true">
          <Anchor size={26} strokeWidth={1.25} className="text-[var(--brass)] opacity-60" />
        </div>

        <SectionHeading
          variant="editorial"
          eyebrow="Om oss"
          title="Kajmagasinet i Lysekil"
          subtitle="Kajmagasinet är en restaurang i Lysekil och en naturlig samlingspunkt direkt vid vattnet. Här kan du njuta av sena sommarkvällar på trädäcket eller slå dig ner i våra rymliga lokaler inomhus."
          centered
          className="mb-1 md:mb-0"
        />
      </div>

      <PhotoGallery tiles={tiles} className="max-w-7xl mx-auto mt-10 md:mt-14 px-0 sm:px-2" />
    </section>
  );
}
