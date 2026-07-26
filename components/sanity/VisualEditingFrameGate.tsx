"use client";

import { useSyncExternalStore } from "react";
import { VisualEditing } from "next-sanity/visual-editing";

/** Om vi står i en iframe ändras inte under sidans livstid. */
function subscribe() {
  return () => {};
}

/**
 * Visual Editing should run only inside the Studio preview iframe.
 * If draft mode cookie remains active in a normal tab, this avoids
 * the noisy "Unable to connect to visual editing" runtime error.
 */
export function VisualEditingFrameGate() {
  const isInFrame = useSyncExternalStore(
    subscribe,
    () => window.self !== window.top,
    () => false,
  );

  if (!isInFrame) return null;

  return <VisualEditing />;
}
