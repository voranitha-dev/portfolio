# Voranitha Changduong — Portfolio

Personal portfolio for a Lead Frontend & Full-Stack AI Engineer: 10+ high-traffic news sites (Nation Group), real-time awards voting, production LLM workflows, and STAR-format case studies.

- **Live:** https://voranitha-dev.github.io/portfolio/
- **Stack:** React 19, TypeScript, Emotion (CSS-in-JS), Motion, Vite

## Develop

```bash
npm install
npm run dev              # http://localhost:3000
npm run lint             # type check
npm run build:gh-pages   # production build under /portfolio/
npm run preview:gh-pages # serve that build at http://localhost:4173/portfolio/
```

Node 22 is required (`vite` 8).

## Project layout

All source files use camelCase names.

```
src/
  app.tsx                 page composition
  styles/                 theme tokens, global styles, shared Emotion primitives
  components/             one file per section (heroSection, platformsSection, …)
  data/portfolioData.ts   profile, STAR case studies, experience, skills, gallery
  data/truehitsData.json  generated Truehits snapshot (do not edit by hand)
  hooks/ utils/
scripts/fetchTruehits.mjs Truehits sync script
public/assets/            logos, screenshots, resume PDF (camelCase file names)
```

## Truehits traffic data

Truehits.net does not allow cross-origin requests, so the browser can't fetch it live. Instead:

- `npm run truehits:update` pulls the latest **daily** ranking and the last 6 **monthly** reports for the 11 tracked sites and rewrites `src/data/truehitsData.json`.
- The GitHub Actions deploy runs the same script before every build, and a daily cron (09:00 Bangkok time) rebuilds the site, so the live page always shows the newest published numbers.
- Scheduled runs also commit the refreshed `truehitsData.json` back to `main`, so the repo stays current and GitHub never auto-disables the schedule (it pauses cron workflows after 60 days without repo activity).
- If Truehits is unreachable, or returns fewer brands than the stored snapshot, the script keeps the previous data and the deploy continues.

To track another site, add it to `TRACKED_DOMAINS` in `scripts/fetchTruehits.mjs` and to `NATION_BRAND_PLATFORMS` in `src/data/portfolioData.ts`.

## Updating content

- Resume: replace `public/assets/resume/voranithaChangduongResume.pdf`.
- Case studies: edit `CASE_STUDIES` in `src/data/portfolioData.ts` (`situation`, `task`, `actions`, `results`, `metrics`).
- Social preview image: `public/ogImage.png` (1200 × 630).

## SEO

`index.html` carries the title, description, canonical URL, Open Graph / Twitter tags, JSON-LD (`Person`, `ProfilePage`, `WebSite`) and a `<noscript>` summary. The page uses one `h1` and an `h2` per section. Submit `https://voranitha-dev.github.io/portfolio/sitemap.xml` in Google Search Console.

## Deploy

Push to `main`. `.github/workflows/deploy.yml` type-checks, refreshes Truehits, builds with `GITHUB_PAGES=true` and publishes to GitHub Pages (Settings → Pages → Source: GitHub Actions).
