"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Scroll-reveal. Observern kopplas bort efter första träffen — elementet
 * animerar en gång, inte vid varje scroll.
 *
 * Utan JS ligger `.reveal` kvar på opacity 0, så layouten har en
 * `<noscript>`-regel som gör den synlig.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

type RevealProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
} & Record<string, unknown>;

export function Reveal({ as: Tag = "div", className, children, ...rest }: RevealProps) {
  const ref = useReveal<HTMLElement>();
  return (
    <Tag ref={ref} className={cn("reveal", className)} {...rest}>
      {children}
    </Tag>
  );
}
