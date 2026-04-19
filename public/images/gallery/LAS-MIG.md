# Bilder till karusellerna (Om oss, Servering, Huset)

Karusellerna visar **bara bilder** — ingen rubrik eller undertext på korten. (I Sanity kan du fortfarande fylla i **alternativtext** på bilden för skärmläsare; den visas inte som text på sajten.)

**Tomma platser:** Om en sektion har färre än 10 bilder kan resterande kort visas som **streckade rutor** med texten «Tom plats». Det styrs i `lib/constants.ts` med `{ id: "…", empty: true }`.

## Var mapparna finns

| Sektion på sajten | Mapp på disk |
|-------------------|--------------|
| **Om oss** | `public/images/gallery/om-oss/` |
| **Servering** | `public/images/gallery/servering/` |
| **Huset** | `public/images/gallery/huset/` |

Filer under `public/` når du på webben som **`/images/...`** (t.ex. `/images/gallery/om-oss/min-bild.png`).

## Ordning och filnamn

- **Spelar ingen roll** vad filerna heter (`01.png`, `sommar.webp`, …) — det viktiga är att **sökvägarna i `lib/constants.ts`** stämmer med dina filer.
- **Visningsordning** i karusellen = ordningen på raderna i respektive array (`HERITAGE_GALLERY_TILES`, `MENU_GALLERY_TILES`, `VIBE_GALLERY_TILES`), eller ordningen du **drar bilderna i Sanity** (pageGalleries).
- Byt ordning genom att flytta rader i `constants.ts` eller genom att ändra ordning i Sanity — inte genom att “tänka” att `01` måste vara först.

## Sanity

Bilder i **Sanity → Bildspel (startsida)** används i första hand; lokala filer i mapparna är fallback om en rad saknar bild i CMS.

## Git

`git add public/images/gallery/` och pusha så att bilderna följer med till produktion.
