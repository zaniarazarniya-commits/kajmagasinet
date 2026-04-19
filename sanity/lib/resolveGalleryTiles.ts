import type { SanityImageSource } from '@sanity/image-url'

import type { GalleryTile } from '@/lib/constants'

import { urlFor } from './image'

type Slide = {
  title?: string | null
  caption?: string | null
  image?: SanityImageSource | null
} | null

function hasImageAsset(image: unknown): image is SanityImageSource & {
  asset: unknown
} {
  return (
    typeof image === 'object' &&
    image !== null &&
    'asset' in image &&
    (image as { asset?: unknown }).asset != null
  )
}

/**
 * Bygger GalleryTile[] från Sanity-slide eller fallback från constants.
 * Rader med bild i CMS använder cdn.sanity.io; saknas bild används fallback-radens lokala bild.
 */
export function resolveGalleryTiles(
  slides: Slide[] | null | undefined,
  fallback: readonly GalleryTile[],
  idPrefix: string,
): GalleryTile[] {
  if (!slides?.length) {
    return [...fallback]
  }

  const out: GalleryTile[] = []

  slides.forEach((slide, i) => {
    const fb = fallback[i] ?? fallback[fallback.length - 1]
    if (!fb) return

    const title = slide?.title?.trim() || fb.title
    const caption = slide?.caption?.trim() || fb.caption

    if (slide?.image && hasImageAsset(slide.image)) {
      out.push({
        id: `${idPrefix}-${i}`,
        title,
        caption,
        image: urlFor(slide.image).width(900).height(675).quality(85).url(),
      })
    } else {
      out.push({
        id: `${idPrefix}-${i}`,
        title,
        caption,
        image: fb.image,
      })
    }
  })

  return out.length > 0 ? out : [...fallback]
}
