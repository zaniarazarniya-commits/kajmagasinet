export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-04-18'

const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() ?? ''
const rawDataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || 'production'

/** Sant när riktigt projekt-ID finns — krävs för API, Studio och CDN-bilder */
export const isSanityConfigured = rawProjectId.length > 0

/**
 * Dataset (default production). Sätts alltid så CLI/config kan laddas.
 */
export const dataset = rawDataset

/**
 * Sanity project ID. Om env saknas används en platshållare så moduler kan importeras
 * utan att krascha; anrop mot API ska då hoppas över (se isSanityConfigured).
 */
export const projectId = isSanityConfigured
  ? rawProjectId
  : 'missingProjectId'
