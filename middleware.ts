import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.method === "GET" && request.nextUrl.pathname === "/") {
    // #region agent log
    void fetch("http://127.0.0.1:7671/ingest/5ed55b2f-ea65-492f-8092-6a07b353c087", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Debug-Session-Id": "df5fc8",
      },
      body: JSON.stringify({
        sessionId: "df5fc8",
        location: "middleware.ts:GET/",
        message: "middleware saw home request",
        data: { pathname: request.nextUrl.pathname },
        timestamp: Date.now(),
        hypothesisId: "H4",
      }),
    }).catch(() => {});
    // #endregion
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
