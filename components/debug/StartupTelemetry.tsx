"use client";

import { useEffect } from "react";

export function StartupTelemetry() {
  useEffect(() => {
    // #region agent log
    const nav = performance.getEntriesByType(
      "navigation"
    )[0] as PerformanceNavigationTiming | undefined;
    fetch("http://127.0.0.1:7671/ingest/5ed55b2f-ea65-492f-8092-6a07b353c087", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Debug-Session-Id": "df5fc8",
      },
      body: JSON.stringify({
        sessionId: "df5fc8",
        location: "StartupTelemetry.tsx:useEffect",
        message: "client after mount",
        data: {
          perfNow: performance.now(),
          ttfbMs: nav ? nav.responseStart - nav.requestStart : null,
          domContentLoadedMs: nav
            ? nav.domContentLoadedEventEnd - nav.startTime
            : null,
          loadCompleteMs: nav ? nav.loadEventEnd - nav.startTime : null,
        },
        timestamp: Date.now(),
        hypothesisId: "H2",
      }),
    }).catch(() => {});
    // #endregion
  }, []);

  return null;
}
