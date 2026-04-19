This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Sanity (CMS)

**Du behöver inte köra `sanity init` igen** – Studio ligger redan i appen på `/studio`.

### Så får du det att fungera (lokalt)

1. Skapa filen `.env.local` i projektroten (kopiera från mallen):
   ```bash
   cp .env.example .env.local
   ```
2. I `.env.local` ska det stå ditt **Project ID** (`NEXT_PUBLIC_SANITY_PROJECT_ID`) och dataset (oftast `production`). Mallen i repot är redan ifylld för Kajmagasinet.
3. **CORS** (så `/studio` får anropa API:t): antingen lägg till `http://localhost:3000` manuellt under **API → CORS origins**, eller kör efter inloggning:
   ```bash
   npx sanity login
   npm run sanity:cors
   ```
4. Starta om: `npm run dev` → öppna [http://localhost:3000/studio](http://localhost:3000/studio).

### På Vercel

Lägg samma variabler under **Settings → Environment Variables** (minst `NEXT_PUBLIC_SANITY_PROJECT_ID` och `NEXT_PUBLIC_SANITY_DATASET`) och deploya om.

**Studio på https://www.kajmagasinet.se/studio**

1. Sätt **`NEXT_PUBLIC_SITE_URL=https://www.kajmagasinet.se`** i Vercel (så Presentation/preview pekar rätt).
2. Under [sanity.io/manage](https://www.sanity.io/manage) → **Kajmagasinet** → **API** → **CORS origins**, lägg till:
   - `https://www.kajmagasinet.se`
   - `https://kajmagasinet.se`  
   (samma som du gjort för `http://localhost:3000` — annars kan Studio på produktion inte prata med API:t.)
3. Deploya om efter env-ändringar.

   Efter `npx sanity login` kan du även köra **`npm run sanity:cors:prod`** lokalt för att lägga till båda domänerna via CLI.

### API-token på skärmen

- **Deploy Studio**-token räcker för att deploya Studio separat – **inte** det du klistrar in i `.env` för den här Next-appen.
- För **utkast/preview** i webben behövs en separat token med **läsrättigheter** → sätt som `SANITY_API_READ_TOKEN` (valfritt).

The app builds without env vars; `/studio` shows setup instructions until **Project ID** is set.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Studio: [http://localhost:3000/studio](http://localhost:3000/studio) (kräver `.env.local` med `NEXT_PUBLIC_SANITY_PROJECT_ID`).

### Sanity Presentation visar "Invalid secret"

Det betyder att **preview-läget** inte kan validera mot Next.js. Gör så här:

1. Öppna [sanity.io/manage](https://www.sanity.io/manage) → **Kajmagasinet** → **API** → **Tokens** → **Add API token**.
2. Ge token **Viewer** eller **Editor** (läs + ev. skriv) — **inte** bara *Deploy Studio*.
3. Kopiera token till **`.env.local`** (skapa från `.env.example` om du saknar filen):

   ```bash
   SANITY_API_READ_TOKEN=din-token-här
   ```

4. **Starta om** utvecklingsservern (`Ctrl+C`, sedan `npm run dev`).

Utan denna token fungerar **Structure** och redigering i Studio, men **Presentation**-förhandsgranskning mot `/api/draft-mode/enable` ger `Invalid secret`.

### Öppettider (kunden redigerar i Studio)

1. Öppna **Studio** → **Webbplats** (singleton).
2. Under **Öppettider**: ändra rader (Dagar / Tider), lägg till eller ta bort rader.
3. Klicka **Publicera** så syns ändringen på sajten (efter nästa build/deploy om ni kör statisk hosting, eller direkt vid dev).

Om dokumentet **Webbplats** inte finns än: skapa det genom att öppna posten i listan — standardrader fylls i automatiskt. Tills dess används värden från `lib/constants.ts` som reserv.

### Drinkar (Baren)

1. **Studio** → **Drinkar (Baren)**.
2. Fyll i **Rubrik**, **Ingress** (valfritt — annars standardtext) och lista **Drinkar** (namn, beskrivning/ingredienser, bild).
3. **Publicera**. Utan dokument eller tom lista används placeholder-drinkar från koden.

### Bildspel / karuseller (Om oss, Servering, Kväll)

1. **Studio** → **Bildspel (startsida)**.
2. Tre listor: **Om oss**, **Servering**, **Från middag till häng** — för varje rad: **Rubrik**, **Kort text**, **Bild** (ladda upp). Upp till 12 bilder per sektion.
3. **Publicera**. Saknas dokumentet eller en rad är tom används placeholder-bilder från koden (`lib/constants.ts`) tills ni laddat upp egna bilder.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
