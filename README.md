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
