"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { fadeUp, VIEWPORT_CONFIG } from "@/lib/animations";
import { PhotoGallery } from "@/components/ui/PhotoGallery";
import type { GalleryTile } from "@/lib/constants";
import { MENU_GALLERY_TILES } from "@/lib/constants";

type MenuProps = {
  tiles?: GalleryTile[];
};

export function Menu({ tiles = [...MENU_GALLERY_TILES] }: MenuProps) {
  return (
    <section
      id="meny"
      className="pt-14 pb-20 md:pt-16 md:pb-28 px-6 border-t border-[var(--rope)]/15 bg-[var(--canvas)]"
      aria-label="Meny"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          variant="editorial"
          eyebrow="Servering"
          title="Restaurangmeny i Lysekil"
          subtitle="Kajmagasinet i Lysekil serverar vällagad mat utan krångel. Vi fokuserar på bra råvaror, lokala favoriter och rätter som man faktiskt blir mätt på."
          centered
          className="mb-6 md:mb-12"
        />

        <PhotoGallery tiles={tiles} className="px-0 sm:px-2" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_CONFIG}
          variants={fadeUp}
          className="mt-16 md:mt-20 flex justify-center"
        >
          <Button href="/boka" variant="subtle" size="md">
            Se fullständig meny
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
