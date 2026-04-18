import 'server-only'

import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

/** Endast server: token krävs för preview-/draft-läge (t.ex. draft-mode enable). */
export const draftClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
})
