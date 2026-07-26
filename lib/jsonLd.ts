/**
 * Serialiserar strukturerad data för ett `<script type="application/ld+json">`.
 *
 * `<`, `>` och `&` skrivs som unicode-escapes. Det är fortfarande giltig JSON,
 * men utdatan innehåller inga tecken som webbläsaren kan tolka som markup eller
 * som React skulle HTML-escapa — så skriptet kan renderas som ett vanligt
 * textbarn utan att gå runt Reacts escaping.
 */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}
