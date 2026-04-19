import type { SanityImageSource } from '@sanity/image-url'

import { DRINKS, type DrinkItem } from '@/lib/constants'

import { urlFor } from './image'

const DEFAULT_TITLE = 'Något kallt i glaset?'
const DEFAULT_INTRO = `Baren är hjärtat i huset och här finns verkligen allt. Vi blandar allt från svalkande Daiquiris och kaffedrinkar till att servera kalla, lokala hantverksöl. För vinälskaren har vi något helt unikt: vi importerar våra egna viner direkt från italienska Vogadori Vini – ett exklusivt urval du bara hittar hos oss.`

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
  sectionTitle: string
  sectionIntro: string
}

export function resolveDrinksSection(
  doc: {
    title?: string | null
    intro?: string | null
    drinks?: DrinkRow[] | null
  } | null,
): ResolvedDrinksSection {
  const sectionTitle = doc?.title?.trim() || DEFAULT_TITLE
  const sectionIntro = doc?.intro?.trim() || DEFAULT_INTRO

  const fallback = [...DRINKS] as DrinkItem[]
  const rows = doc?.drinks?.filter(Boolean) ?? []

  if (rows.length === 0) {
    return { drinks: fallback, sectionTitle, sectionIntro }
  }

  const out: DrinkItem[] = []
  rows.forEach((row, i) => {
    if (!row) return
    const fb = fallback[i] ?? fallback[fallback.length - 1]
    const name = row.name?.trim() || fb.name
    const description = row.description?.trim() || fb.description
    const slug =
      row.slug?.trim().replace(/\s+/g, '-') ||
      fb.slug ||
      `drink-${i + 1}`

    if (row.image && hasImageAsset(row.image)) {
      out.push({
        slug,
        name,
        description,
        image: urlFor(row.image).width(900).height(675).quality(85).url(),
      })
    } else {
      out.push({
        slug,
        name,
        description,
        image: fb.image,
      })
    }
  })

  return {
    drinks: out.length > 0 ? out : fallback,
    sectionTitle,
    sectionIntro,
  }
}
