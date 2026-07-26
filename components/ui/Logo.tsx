/**
 * Logotyp-lockup: ordbild i två rader med ankaret inskjutet på övre radens
 * högerkant och en linje mellan raderna.
 *
 *   kaj      ⚓
 *   ─────────────
 *   magasinet
 *
 * Allt är satt i `em`, så hela lockupen skalar med `fontSize`.
 *
 * Obs: detta är en återskapning i CSS + SVG, inte kundens vektorfil —
 * originalet var inbäddat i ett foto. Byt ut när en riktig SVG finns.
 */
export function Logo({ fontSize }: { fontSize?: number }) {
  return (
    <span className="lock" style={fontSize ? { fontSize } : undefined}>
      <span className="lock-top">
        <span className="lock-kaj">kaj</span>
        <svg
          className="lock-anchor"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="4.6" r="2.1" />
          <path d="M12 6.7V21M5 12.6c0 4.3 3.1 7.6 7 7.6s7-3.3 7-7.6M5 12.6H3l1.5-2M19 12.6h2l-1.5-2M8.6 8.4h6.8" />
        </svg>
      </span>
      <span className="lock-bot">magasinet</span>
    </span>
  );
}
