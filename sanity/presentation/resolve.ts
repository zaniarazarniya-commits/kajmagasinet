import { defineDocuments, defineLocations } from 'sanity/presentation'

export const mainDocuments = defineDocuments([
  { route: '/', filter: `_type == "homePage"` },
  { route: '/#hitta-oss', filter: `_type == "siteSettings"` },
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
  siteSettings: defineLocations({
    select: { title: '_id' },
    resolve: () => ({
      locations: [
        {
          title: 'Öppettider (Hitta oss)',
          href: '/#hitta-oss',
        },
      ],
    }),
  }),
}
