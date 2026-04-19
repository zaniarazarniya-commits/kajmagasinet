/**
 * Bygger galleri-rader från Sanity. GalleryTile har varken title eller caption —
 * bara { image } eller { empty: true }. Äldre kod med fb.title/fb.caption ska bort.
 */
import type { SanityImageSource } from '@sanity/image-url'

import type { GalleryTile } from '@/lib/constants'

import { urlFor } from './image'

type Slide = {
  image?: (SanityImageSource & { alt?: string | null }) | null
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

function imageAlt(image: unknown): string | undefined {
  if (typeof image === 'object' && image !== null && 'alt' in image) {
    const a = (image as { alt?: string | null }).alt?.trim()
    return a || undefined
  }
  return undefined
}

function isFallbackEmpty(fb: GalleryTile): fb is { id: string; empty: true } {
  return 'empty' in fb && fb.empty === true
}

/**
 * Bygger GalleryTile[] från Sanity (endast bild + valfri alt-text) eller fallback från constants.
 * Tomma platser (`empty: true` i fallback) behålls om CMS saknar bild för raden.
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

    if (slide?.image && hasImageAsset(slide.image)) {
      const cmsAlt = imageAlt(slide.image)
      const fbAlt = !isFallbackEmpty(fb) && 'alt' in fb ? fb.alt : undefined
      const alt = cmsAlt ?? fbAlt
      out.push({
        id: `${idPrefix}-${i}`,
        image: urlFor(slide.image).width(900).height(675).quality(85).url(),
        ...(alt ? { alt } : {}),
      })
      return
    }

    if (isFallbackEmpty(fb)) {
      out.push({ id: `${idPrefix}-${i}`, empty: true })
      return
    }

    const withImage = fb as { id: string; image: string; alt?: string }
    out.push({
      id: `${idPrefix}-${i}`,
      image: withImage.image,
      ...(withImage.alt ? { alt: withImage.alt } : {}),
    })
  })

  return out.length > 0 ? out : [...fallback]
}
