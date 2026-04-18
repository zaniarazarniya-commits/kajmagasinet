import { defineDocuments, defineLocations } from 'sanity/presentation'

export const mainDocuments = defineDocuments([
  { route: '/', filter: `_type == "homePage"` },
])

export const locations = {
  homePage: defineLocations({
    select: { title: 'headline' },
    resolve: (doc) => ({
      locations: [
        {
          title: doc?.title || 'Förstasida',
          href: '/',
        },
      ],
    }),
  }),
}
