import { defineQuery } from 'next-sanity'

export const homePageQuery = defineQuery(
  `*[_id == "homePage"][0]{ headline, heroImage }`,
)

export const siteSettingsQuery = defineQuery(
  `*[_id == "siteSettings"][0]{ openingHours[]{ day, time } }`,
)
