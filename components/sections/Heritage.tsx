"use client";

import { Anchor } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhotoGallery } from "@/components/ui/PhotoGallery";
import { HERITAGE_GALLERY_TILES } from "@/lib/constants";

export function Heritage() {
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
          title="Huset, kajen och solen"
          subtitle="Kajmagasinet är mer än bara en restaurang – det är Lysekils naturliga samlingspunkt direkt vid vattnet. Här kan du njuta av sena sommarkvällar på vårt stora trädäck i direkt söderläge, eller slå dig ner i våra rymliga lokaler inomhus när havet friskar på."
          centered
          className="mb-1 md:mb-0"
        />
      </div>

      <PhotoGallery tiles={HERITAGE_GALLERY_TILES} className="max-w-6xl mx-auto mt-8 md:mt-12" />
    </section>
  );
}
