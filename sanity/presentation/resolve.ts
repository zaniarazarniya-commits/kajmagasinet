import { defineDocuments, defineLocations } from 'sanity/presentation'

export const mainDocuments = defineDocuments([
  { route: '/', filter: `_type == "homePage"` },
  { route: '/#hitta-oss', filter: `_type == "siteSettings"` },
  { route: '/#arv', filter: `_type == "pageGalleries"` },
  { route: '/#drinkar', filter: `_type == "drinksSection"` },
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
  pageGalleries: defineLocations({
    select: { title: '_id' },
    resolve: () => ({
      locations: [
        { title: 'Bildspel: Om oss', href: '/#arv' },
        { title: 'Bildspel: Servering', href: '/#meny' },
        { title: 'Bildspel: Kväll', href: '/#aktiviteter' },
      ],
    }),
  }),
  drinksSection: defineLocations({
    select: { title: 'title' },
    resolve: (doc) => ({
      locations: [
        {
          title: doc?.title || 'Drinkar (Baren)',
          href: '/#drinkar',
        },
      ],
    }),
  }),
}
