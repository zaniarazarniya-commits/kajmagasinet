import { type SchemaTypeDefinition } from 'sanity'

import { homePage } from './homePage'
import { siteSettings } from './siteSettings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homePage, siteSettings],
}
