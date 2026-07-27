"use client";

import { useEffect, useRef } from "react";

/**
 * Speglar ett elements höjd till en CSS-variabel på `<html>`.
 *
 * Sticky-lagren på menysidan behöver veta hur högt det ligger ovanför dem.
 * Headern byter höjd med skärmbredd och språk, så måttet kan inte stå
 * hårdkodat i CSS — då hamnar navigeringen bakom headern eller lämnar ett
 * glapp, och ankarhopp landar på fel ställe.
 */
export function useElementHeightVar<T extends HTMLElement>(variable: string) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const apply = () => {
      const height = Math.round(el.getBoundingClientRect().height);
      document.documentElement.style.setProperty(variable, `${height}px`);
    };

    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(el);

    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty(variable);
    };
  }, [variable]);

  return ref;
}
