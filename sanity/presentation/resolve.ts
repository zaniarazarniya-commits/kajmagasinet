import { defineDocuments, defineLocations } from 'sanity/presentation'

export const mainDocuments = defineDocuments([
  { route: '/', filter: `_type == "homePage"` },
  { route: '/#kontakt', filter: `_type == "siteSettings"` },
  { route: '/#om', filter: `_type == "pageGalleries"` },
  { route: '/#baren', filter: `_type == "drinksSection"` },
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
          href: '/#kontakt',
        },
      ],
    }),
  }),
  pageGalleries: defineLocations({
    select: { title: '_id' },
    resolve: () => ({
      locations: [
        { title: 'Bildspel: Om oss', href: '/#om' },
        { title: 'Bildspel: Servering', href: '/#meny' },
        { title: 'Bildspel: Kväll', href: '/#huset' },
      ],
    }),
  }),
  drinksSection: defineLocations({
    select: { title: 'title' },
    resolve: (doc) => ({
      locations: [
        {
          title: doc?.title || 'Drinkar (Baren)',
          href: '/#baren',
        },
      ],
    }),
  }),
}
