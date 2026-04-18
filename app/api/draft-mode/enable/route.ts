import { defineEnableDraftMode } from 'next-sanity/draft-mode'
import { NextResponse } from 'next/server'

import { draftClient } from '@/sanity/lib/draftClient'

const enableDraftModeRoute = defineEnableDraftMode({ client: draftClient })

export async function GET(request: Request) {
  const hasToken =
    Boolean(process.env.SANITY_API_READ_TOKEN) ||
    Boolean(process.env.SANITY_VIEWER_TOKEN)

  if (!hasToken) {
    return NextResponse.json(
      {
        error:
          'Missing SANITY_API_READ_TOKEN (or SANITY_VIEWER_TOKEN) in server environment.',
      },
      { status: 500 },
    )
  }

  return enableDraftModeRoute.GET(request)
}
