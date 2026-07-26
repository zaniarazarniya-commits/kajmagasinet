import { defineQuery } from 'next-sanity'

export const siteSettingsQuery = defineQuery(
  `*[_id == "siteSettings"][0]{ openingHours[]{ day, time } }`,
)

export const drinksSectionQuery = defineQuery(
  `*[_id == "drinksSection"][0]{
    drinks[]{ slug, name, description, image }
  }`,
)
