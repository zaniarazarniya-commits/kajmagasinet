import type { SanityImageSource } from '@sanity/image-url'

import { DRINKS, type DrinkItem } from '@/lib/constants'

import { urlFor } from './image'

type DrinkRow = {
  slug?: string | null
  name?: string | null
  description?: string | null
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

export type ResolvedDrinksSection = {
  drinks: DrinkItem[]
}

/**
 * Drinkar från Sanity, med husets lista som reserv.
 *
 * CMS-fälten är enspråkiga. En text som skrivits i Studio används därför för
 * både svenska och engelska — vill man ha egna översättningar behöver
 * `drinkRow`-schemat kompletteras med engelska fält.
 */
export function resolveDrinksSection(
  doc: {
    drinks?: DrinkRow[] | null
  } | null,
): ResolvedDrinksSection {
  const fallback = [...DRINKS]
  const rows = doc?.drinks?.filter(Boolean) ?? []

  if (rows.length === 0) {
    return { drinks: fallback }
  }

  const out: DrinkItem[] = []
  rows.forEach((row, i) => {
    if (!row) return
    const fb = fallback[i] ?? fallback[fallback.length - 1]
    const name = row.name?.trim() || fb.name
    const cmsDescription = row.description?.trim()
    const slug =
      row.slug?.trim().replace(/\s+/g, '-') || fb.slug || `drink-${i + 1}`

    out.push({
      slug,
      name,
      taste: fb.taste,
      description: cmsDescription
        ? { sv: cmsDescription, en: cmsDescription }
        : fb.description,
      image:
        row.image && hasImageAsset(row.image)
          ? urlFor(row.image).width(900).height(1200).quality(85).url()
          : fb.image,
    })
  })

  return { drinks: out.length > 0 ? out : fallback }
}
