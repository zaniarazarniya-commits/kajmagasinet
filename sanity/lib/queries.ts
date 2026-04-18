import { defineQuery } from 'next-sanity'

export const homePageQuery = defineQuery(
  `*[_id == "homePage"][0]{ headline, heroImage }`,
)
