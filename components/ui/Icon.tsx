import type { ReactNode, SVGProps } from "react";

/**
 * Ikonsystemet — en enhetlig outline-familj, alla på viewBox 0 0 24 24 med
 * `stroke="currentColor"`.
 *
 * Ikonerna är inte dekoration: varje navpost, knapp, formulärlabel och
 * menysektion bär en, så gränssnittet läses även av gäster som inte läser
 * svenska. Storleken sätts i CSS per kontext (15–22 px).
 */

type IconDef = { strokeWidth: number; body: ReactNode };

const ICONS = {
  anchor: {
    strokeWidth: 1.5,
    body: (
      <>
        <circle cx="12" cy="5" r="2" />
        <path d="M12 7v14M5 13a7 7 0 0 0 14 0M5 13H3l1.5-2M19 13h2l-1.5-2" />
      </>
    ),
  },
  plate: {
    strokeWidth: 1.6,
    body: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4.5" />
      </>
    ),
  },
  glass: {
    strokeWidth: 1.6,
    body: <path d="M5 4h14l-6 8v6M11 18h4M9 22h6" />,
  },
  bottle: {
    strokeWidth: 1.6,
    body: (
      <>
        <path d="M10 2h4v4l2 3v13H8V9l2-3z" />
        <path d="M8 13h8" />
      </>
    ),
  },
  spirit: {
    strokeWidth: 1.6,
    body: (
      <>
        <path d="M7 3h10l-1 6v12H8V9z" />
        <path d="M8 11h8" />
      </>
    ),
  },
  people: {
    strokeWidth: 1.6,
    body: (
      <>
        <circle cx="9" cy="8" r="3.2" />
        <path d="M3 21a6 6 0 0 1 12 0M16.5 5.4a3.2 3.2 0 0 1 0 5.9M18 21a6 6 0 0 0-2.2-4.6" />
      </>
    ),
  },
  pin: {
    strokeWidth: 1.6,
    body: (
      <>
        <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
  },
  phone: {
    strokeWidth: 1.6,
    body: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.56 2.81.69A2 2 0 0 1 22 16.92z" />
    ),
  },
  clock: {
    strokeWidth: 1.6,
    body: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  },
  mail: {
    strokeWidth: 1.6,
    body: (
      <>
        <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
        <path d="m3 6 9 6.5L21 6" />
      </>
    ),
  },
  cal: {
    strokeWidth: 1.6,
    body: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M3 10h18M8 3v4M16 3v4" />
      </>
    ),
  },
  user: {
    strokeWidth: 1.6,
    body: (
      <>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
      </>
    ),
  },
  note: {
    strokeWidth: 1.6,
    body: (
      <>
        <path d="M4 4h16v12l-4 4H4z" />
        <path d="M8 9h8M8 13h5" />
      </>
    ),
  },
  insta: {
    strokeWidth: 1.6,
    body: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </>
    ),
  },
  nav: {
    strokeWidth: 1.6,
    body: <path d="m3 11 18-8-8 18-2-8z" />,
  },
  info: {
    strokeWidth: 1.6,
    body: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v5M12 7.6v.4" />
      </>
    ),
  },
  ball: {
    strokeWidth: 1.6,
    body: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3v18M3 12h18" />
      </>
    ),
  },
  target: {
    strokeWidth: 1.6,
    body: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.4" fill="currentColor" />
      </>
    ),
  },
  music: {
    strokeWidth: 1.6,
    body: (
      <>
        <circle cx="7" cy="18" r="3" />
        <circle cx="18" cy="15.5" r="3" />
        <path d="M10 18V6l11-2.5v12" />
      </>
    ),
  },
  spark: {
    strokeWidth: 1.6,
    body: (
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
    ),
  },
  arrowL: {
    strokeWidth: 1.7,
    body: <path d="m14 6-6 6 6 6" />,
  },
  arrowR: {
    strokeWidth: 1.7,
    body: <path d="m10 6 6 6-6 6" />,
  },
  burger: {
    strokeWidth: 1.7,
    body: <path d="M4 7h16M4 12h16M4 17h16" />,
  },
  back: {
    strokeWidth: 1.7,
    body: <path d="m14 6-6 6 6 6" />,
  },
  starter: {
    strokeWidth: 1.6,
    body: (
      <>
        <path d="M3 13h18a9 9 0 0 1-18 0z" />
        <path d="M12 4v5M10 6h4M2 21h20" />
      </>
    ),
  },
  main: {
    strokeWidth: 1.6,
    body: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M6 6.5 18 17.5" />
      </>
    ),
  },
  kid: {
    strokeWidth: 1.6,
    body: (
      <>
        <circle cx="12" cy="7" r="3.4" />
        <path d="M6 21a6 6 0 0 1 12 0" />
      </>
    ),
  },
  cake: {
    strokeWidth: 1.6,
    body: (
      <>
        <path d="M4 20h16v-6a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4z" />
        <path d="M12 6V3M9 10c0-2 6-2 6 0" />
      </>
    ),
  },
  water: {
    strokeWidth: 1.6,
    body: <path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z" />,
  },
  apple: {
    strokeWidth: 1.6,
    body: (
      <>
        <path d="M12 8c-4 0-6 3-6 6.5S9 21 12 21s6-2 6-6.5S16 8 12 8z" />
        <path d="M12 8V5c2 0 3-1 3-3" />
      </>
    ),
  },
  honey: {
    strokeWidth: 1.6,
    body: (
      <>
        <path d="m12 3 7 4v10l-7 4-7-4V7z" />
        <path d="M12 9v6" />
      </>
    ),
  },
  beer: {
    strokeWidth: 1.6,
    body: (
      <>
        <path d="M5 8h11v13H5z" />
        <path d="M16 11h3v6h-3M5 8a3 3 0 0 1 11 0" />
      </>
    ),
  },
  sparkle: {
    strokeWidth: 1.6,
    body: (
      <>
        <path d="M9 3h6l-1 6 2 3v9H8v-9l2-3z" />
        <path d="M11 15h2M11 18h2" />
      </>
    ),
  },
} satisfies Record<string, IconDef>;

export type IconName = keyof typeof ICONS;

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  name: IconName;
  /** Sätt en etikett när ikonen bär betydelse på egen hand. */
  title?: string;
};

export function Icon({ name, title, ...props }: IconProps) {
  const icon = ICONS[name];

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={icon.strokeWidth}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {icon.body}
    </svg>
  );
}
