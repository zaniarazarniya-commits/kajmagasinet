/**
* This configuration file lets you run `$ sanity [command]` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/
import { defineCliConfig } from 'sanity/cli'

/** Match sanity/env.ts: placeholder until NEXT_PUBLIC_SANITY_PROJECT_ID is set */
const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || 'missingProjectId'
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || 'production'

export default defineCliConfig({ api: { projectId, dataset } })
