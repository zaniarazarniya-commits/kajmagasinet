import { defineQuery } from 'next-sanity'

export const homePageQuery = defineQuery(
  `*[_id == "homePage"][0]{ headline, heroImage }`,
)

export const siteSettingsQuery = defineQuery(
  `*[_id == "siteSettings"][0]{ openingHours[]{ day, time } }`,
)

export const pageGalleriesQuery = defineQuery(
  `*[_id == "pageGalleries"][0]{
    heritageSlides[]{ title, caption, image },
    menuSlides[]{ title, caption, image },
    vibeSlides[]{ title, caption, image },
  }`,
)

export const drinksSectionQuery = defineQuery(
  `*[_id == "drinksSection"][0]{
    title,
    intro,
    drinks[]{ slug, name, description, image }
  }`,
)
