import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'

import { dataset, isSanityConfigured, projectId } from '../env'

// https://www.sanity.io/docs/image-url
const builder = isSanityConfigured
  ? createImageUrlBuilder({ projectId, dataset })
  : null

export const urlFor = (source: SanityImageSource) => {
  if (!builder) {
    throw new Error(
      'Sanity är inte konfigurerat — sätt NEXT_PUBLIC_SANITY_PROJECT_ID i .env.local',
    )
  }
  return builder.image(source)
}
