import { type SchemaTypeDefinition } from 'sanity'

import { drinksSection } from './drinksSection'
import { homePage } from './homePage'
import { pageGalleries } from './pageGalleries'
import { siteSettings } from './siteSettings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homePage, siteSettings, pageGalleries, drinksSection],
}
