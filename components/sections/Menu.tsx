"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { fadeUp, VIEWPORT_CONFIG } from "@/lib/animations";
import { PhotoGallery } from "@/components/ui/PhotoGallery";
import { MENU_GALLERY_TILES } from "@/lib/constants";

export function Menu() {
  return (
    <section
      id="meny"
      className="pt-14 pb-20 md:pt-16 md:pb-28 px-6 border-t border-[var(--rope)]/15 bg-[var(--canvas)]"
      aria-label="Meny"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          variant="editorial"
          eyebrow="Servering"
          title="Mat för alla tillfällen"
          subtitle="Hos oss hittar du vällagad mat utan krångel. Vi fokuserar på bra råvaror, lokala favoriter och rätter som man faktiskt blir mätt på. Allt från säsongens fisk till en riktigt bra burgare. Vi satsar bara på att det ska smaka riktigt gott, varje gång."
          centered
          className="mb-10 md:mb-20"
        />

        <PhotoGallery tiles={MENU_GALLERY_TILES} />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_CONFIG}
          variants={fadeUp}
          className="mt-16 md:mt-20 flex justify-center"
        >
          <Button href="#boka" variant="subtle" size="md">
            Se fullständig meny
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
