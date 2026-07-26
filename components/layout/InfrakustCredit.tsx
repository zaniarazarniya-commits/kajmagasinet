/** Svart band längst ned: "Powered by Infrakust", länkat till infrakust.se. */
export function InfrakustCredit() {
  return (
    <a
      className="credit"
      href="https://www.infrakust.se"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hemsida skapad av Infrakust — besök infrakust.se (öppnas i ny flik)"
    >
      <span className="line" aria-hidden="true" />
      <span className="label">Powered by</span>
      <span className="wordmark">Infrakust</span>
      <span className="arrow" aria-hidden="true">
        →
      </span>
      <span className="line" aria-hidden="true" />
    </a>
  );
}
