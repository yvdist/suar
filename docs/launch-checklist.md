# Launch checklist — suar

Status at code freeze (3 Nov 2026). Code side is done; the data gate
below is the real publish gate. Nothing here ships until every data
item is checked.

## Code — done

- [x] `npm run build` clean, no warnings (9 pages)
- [x] `astro check` 0 errors / 0 warnings / 0 hints
- [x] Custom 404 with emergency strip + backlink (`src/pages/404.astro`)
- [x] Dev test page removed (`src/pages/test.astro` deleted)
- [x] `public/_headers` with Cloudflare security headers + CSP
- [x] Sitemap, robots, canonical, JSON-LD `MedicalClinic`
- [x] Home-only Open Graph tags; no OG on detail pages
- [x] Focus trap in filter dialog, reduced-motion respected
- [x] JS ~12.1KB gzip, CSS ~4.8KB gzip, zero third-party fetches

## Audit status — honest note

`npm run audit` on 3 Nov 2026 reports 1 stale (Hotline Contoh,
292 days), 1 aging (Puskesmas Uji Coba, 125 days), 1 fresh.
This will never go green with the current entries, and it should
not: all three are fictitious sample data, not publish data.

Do not chase a green audit on fictitious entries. Replace them with
8+ real, manually verified entries first — the audit will follow.

## Data gate — must all pass before publish

- [ ] Every entry verified manually, not copied from an article
- [ ] Every `last_verified` reflects a real check date
- [ ] Every contact tested: phone rings, WhatsApp delivers, site opens
- [ ] No guessed prices
- [ ] All 3 fictitious entries deleted (`src/content/services/*.json`)
- [ ] Emergency numbers re-verified within the last 7 days
- [ ] Minimum 8 free or BPJS entries

## Deploy — Cloudflare Pages

- [ ] Connect repo, Astro preset, build `npm run build`, output `dist`
- [ ] Node 20+
- [ ] Set `SITE_URL` in `astro.config.mjs` to the final domain
      (currently placeholder `https://suar.web.id`)
- [ ] HTTPS enforced, HSTS on
- [ ] Test the report mailto (`contact@yvdist.com`) end to end

## First week / month

- [ ] Re-check all links in production
- [ ] Test from real cellular data, not wifi
- [ ] 2–3 people try it; watch where they stumble
- [ ] Run `npm run audit` monthly; follow up on incoming reports
