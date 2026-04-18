import { defineEnableDraftMode } from 'next-sanity/draft-mode'

import { draftClient } from '@/sanity/lib/draftClient'

export const { GET } = defineEnableDraftMode({ client: draftClient })
