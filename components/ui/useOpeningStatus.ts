"use client";

import { useMemo, useSyncExternalStore } from "react";
import { getOpeningStatus, type OpeningStatus } from "@/lib/hours";

const MINUTE = 60_000;

function subscribeToMinute(onChange: () => void) {
  const timer = window.setInterval(onChange, MINUTE);
  return () => window.clearInterval(timer);
}

/**
 * Öppet/stängt-status.
 *
 * Räknas bara på klienten: serverns klocka går i UTC och skulle ge fel svar
 * kring öppning och stängning. Returnerar `null` fram till första renderingen
 * efter hydrering, och räknas om varje minut så statusen inte fastnar över ett
 * dygnsskifte.
 */
export function useOpeningStatus(): OpeningStatus | null {
  const minute = useSyncExternalStore(
    subscribeToMinute,
    () => Math.floor(Date.now() / MINUTE),
    () => null,
  );

  return useMemo(
    () => (minute === null ? null : getOpeningStatus(new Date(minute * MINUTE))),
    [minute],
  );
}

function localIsoDate(): string {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * MINUTE)
    .toISOString()
    .slice(0, 10);
}

/**
 * Dagens datum i gästens tidszon, som `YYYY-MM-DD`. Tomt på servern —
 * serverns dygn är inte gästens.
 */
export function useTodayIso(): string {
  return useSyncExternalStore(
    subscribeToMinute,
    localIsoDate,
    () => "",
  );
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/** True när användaren bett om reducerad rörelse. */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );
}
