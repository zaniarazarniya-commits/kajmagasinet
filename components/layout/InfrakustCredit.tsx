/**
 * Mörkt band längst ned: "Byggd av Infrakust", länkat till infrakust.se.
 * Infrakusts nya stil (3 nov 2026): I-märket, Schibsted Grotesk, inget guld.
 */
export function InfrakustCredit() {
  return (
    <a
      className="credit"
      href="https://www.infrakust.se"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hemsida byggd av Infrakust — besök infrakust.se (öppnas i ny flik)"
    >
      <svg className="credit-mark" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <rect width="32" height="32" rx="7" fill="#fff" />
        <path
          transform="translate(10.241 25.500) scale(0.013194 -0.013194)"
          fill="#15181a"
          d="M82.68 0V254.8H282.08V1185.2H82.68V1440H790.28V1185.2H590.88V254.8H790.28V0Z"
        />
      </svg>
      <span>
        <span className="label">Byggd av</span> <span className="wordmark">Infrakust</span>
      </span>
    </a>
  );
}
