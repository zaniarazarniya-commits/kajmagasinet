import { defineArrayMember, defineField, defineType } from 'sanity'

const drinkRow = defineArrayMember({
  type: 'object',
  name: 'drinkRow',
  title: 'Drink',
  fields: [
    defineField({
      name: 'slug',
      title: 'ID (valfritt)',
      type: 'string',
      description:
        'Kort namn utan mellanslag, t.ex. gin-tonic. Används internt — lämna tom så genereras ett automatiskt.',
    }),
    defineField({
      name: 'name',
      title: 'Namn',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Beskrivning / ingredienser',
      type: 'text',
      rows: 4,
      description: 'Vad som ingår i drinken — visas som brödtext.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Bild',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternativtext',
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'name', media: 'image' },
    prepare({ title, media }) {
      return { title: title || 'Drink', media }
    },
  },
})

/** Drinkkarusell under Baren — singleton `drinksSection`. */
export const drinksSection = defineType({
  name: 'drinksSection',
  title: 'Drinkar (Baren)',
  type: 'document',
  description:
    'Rubrik, ingress och upp till 12 drinkar med bild och text. Publicera efter ändring.',
  fields: [
    defineField({
      name: 'title',
      title: 'Rubrik',
      type: 'string',
      description: 'Huvudrubrik ovanför karusellen',
      initialValue: 'Något kallt i glaset?',
    }),
    defineField({
      name: 'intro',
      title: 'Ingress',
      type: 'text',
      rows: 6,
      description: 'Text under rubriken (om tom används standardtext från sajten).',
    }),
    defineField({
      name: 'drinks',
      title: 'Drinkar',
      type: 'array',
      of: [drinkRow],
      validation: (Rule) => Rule.max(12),
    }),
  ],
})
