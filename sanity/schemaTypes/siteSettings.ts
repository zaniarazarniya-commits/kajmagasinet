import { defineArrayMember, defineField, defineType } from 'sanity'

/** Webbplatsinställningar — öppettider m.m. (singleton `siteSettings`). */
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Webbplats',
  type: 'document',
  description: 'Öppettider som visas under Hitta oss och i sidfoten. Publicera när ni ändrat.',
  fields: [
    defineField({
      name: 'openingHours',
      title: 'Öppettider',
      type: 'array',
      validation: (Rule) =>
        Rule.min(1).error('Lägg minst till en rad med dag(ar) och tid'),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'openingHourRow',
          title: 'Rad',
          fields: [
            defineField({
              name: 'day',
              title: 'Dagar',
              type: 'string',
              description: 'T.ex. Måndag – Torsdag',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'time',
              title: 'Tider',
              type: 'string',
              description: 'T.ex. 11:00 – 23:00',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { day: 'day', time: 'time' },
            prepare({ day, time }) {
              return { title: day || 'Rad', subtitle: time }
            },
          },
        }),
      ],
    }),
  ],
  initialValue: () => ({
    openingHours: [
      {
        _type: 'openingHourRow',
        day: 'Måndag – Torsdag',
        time: '11:00 – 23:00',
      },
      {
        _type: 'openingHourRow',
        day: 'Fredag – Lördag',
        time: '11:00 – 01:00',
      },
      {
        _type: 'openingHourRow',
        day: 'Söndag',
        time: '12:00 – 22:00',
      },
    ],
  }),
})
