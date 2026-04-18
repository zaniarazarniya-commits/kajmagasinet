import { defineField, defineType } from 'sanity'

/** Enstaka förstasida (singleton med id `homePage` i strukturen). */
export const homePage = defineType({
  name: 'homePage',
  title: 'Förstasida',
  type: 'document',
  fields: [
    defineField({
      name: 'headline',
      title: 'Rubrik',
      type: 'string',
      description: 'Huvudrubrik i hjälte-sektionen',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Bild',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternativtext',
          description: 'Kort beskrivning av bilden för tillgänglighet',
        }),
      ],
    }),
  ],
})
