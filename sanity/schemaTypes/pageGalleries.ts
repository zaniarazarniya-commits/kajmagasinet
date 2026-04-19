import { defineArrayMember, defineField, defineType } from 'sanity'

const gallerySlide = defineArrayMember({
  type: 'object',
  name: 'gallerySlide',
  title: 'Bild',
  fields: [
    defineField({
      name: 'image',
      title: 'Bild',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternativtext (valfritt)',
          description: 'För skärmläsare; visas inte som rubrik på sajten',
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { media: 'image' },
    prepare({ media }) {
      return { title: 'Bild', media }
    },
  },
})

/** Tre bildspel på startsidan (Om oss, Servering, Kväll) — singleton `pageGalleries`. */
export const pageGalleries = defineType({
  name: 'pageGalleries',
  title: 'Bildspel (startsida)',
  type: 'document',
  description:
    'Karusellbilder under sektionerna Om oss, Servering och Från middag till häng. Ladda upp egna bilder — upp till 10 per rad.',
  fields: [
    defineField({
      name: 'heritageSlides',
      title: 'Om oss — bildspel',
      type: 'array',
      of: [gallerySlide],
      validation: (Rule) => Rule.max(12),
    }),
    defineField({
      name: 'menuSlides',
      title: 'Servering — bildspel',
      type: 'array',
      of: [gallerySlide],
      validation: (Rule) => Rule.max(12),
    }),
    defineField({
      name: 'vibeSlides',
      title: 'Från middag till häng — bildspel',
      type: 'array',
      of: [gallerySlide],
      validation: (Rule) => Rule.max(12),
    }),
  ],
})
