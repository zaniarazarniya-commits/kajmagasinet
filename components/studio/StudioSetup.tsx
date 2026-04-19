/**
 * Shown at /studio when NEXT_PUBLIC_SANITY_PROJECT_ID is not set.
 * Studio kräver ett riktigt projekt-ID från sanity.io/manage.
 */
export function StudioSetup() {
  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-[#101112] text-[#e1e3e6] px-6 py-16">
      <div className="max-w-lg w-full rounded-md border border-white/10 bg-[#1c1d1f] p-8 shadow-xl">
        <h1 className="font-sans text-lg font-semibold tracking-tight mb-2">
          Sanity Studio behöver projekt-ID
        </h1>
        <p className="text-sm text-white/65 leading-relaxed mb-6">
          Lägg till ditt projekt från{" "}
          <a
            href="https://www.sanity.io/manage"
            className="text-[#a78bfa] hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            sanity.io/manage
          </a>{" "}
          i en <code className="text-[#86efac] text-xs">.env.local</code> (lokalt) och i Vercel →
          Environment Variables (deploy).
        </p>
        <pre className="text-xs bg-black/40 border border-white/10 rounded p-4 overflow-x-auto text-left leading-relaxed">
          {`NEXT_PUBLIC_SANITY_PROJECT_ID=ditt-projekt-id
NEXT_PUBLIC_SANITY_DATASET=production`}
        </pre>
        <p className="text-xs text-white/45 mt-4">
          Starta om dev-servern efter att du sparat filen. Kopiera <strong>Project ID</strong> under
          API i Sanity.
        </p>
      </div>
    </div>
  );
}
