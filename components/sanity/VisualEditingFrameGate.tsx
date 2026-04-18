"use client";

import { useEffect, useState } from "react";
import { VisualEditing } from "next-sanity/visual-editing";

/**
 * Visual Editing should run only inside the Studio preview iframe.
 * If draft mode cookie remains active in a normal tab, this avoids
 * the noisy "Unable to connect to visual editing" runtime error.
 */
export function VisualEditingFrameGate() {
  const [isInFrame, setIsInFrame] = useState(false);

  useEffect(() => {
    setIsInFrame(window.self !== window.top);
  }, []);

  if (!isInFrame) return null;

  return <VisualEditing />;
}
