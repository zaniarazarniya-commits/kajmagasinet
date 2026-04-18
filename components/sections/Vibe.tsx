"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhotoGallery } from "@/components/ui/PhotoGallery";
import { AFTER_MEAL, VIBE_GALLERY_TILES } from "@/lib/constants";
import { fadeUp, VIEWPORT_CONFIG } from "@/lib/animations";

export function Vibe() {
  return (
    <section
      id="aktiviteter"
      className="py-20 md:py-28 px-6 bg-[var(--parchment)]/80 border-t border-[var(--rope)]/12"
      aria-label="Från middag till häng"
    >
      <div className="max-w-xl mx-auto">
        <SectionHeading
          variant="editorial"
          eyebrow="Huset"
          title="Från middag till häng"
          subtitle={AFTER_MEAL.subtitle}
          centered
          className="mb-10 md:mb-12"
        />

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_CONFIG}
          variants={fadeUp}
          className="font-sans text-[15px] md:text-base text-[var(--ink-mid)]/88 leading-[1.75] text-center"
        >
          {AFTER_MEAL.body}
        </motion.p>
      </div>

      <div className="max-w-6xl mx-auto mt-10 md:mt-14">
        <PhotoGallery tiles={VIBE_GALLERY_TILES} />
      </div>
    </section>
  );
}
