# RenterSmartHome.us

Renter-friendly smart home affiliate site (Astro, static) with an agentic content
pipeline that researches keywords, finds products, writes semantic-SEO articles,
optimizes them and interlinks them on a ramping schedule.

```
goal (today's quota) ──► Orchestrator
                           ├─► 1. Keyword Agent   Ahrefs API (volume, KD, traffic potential) → clusters → queue
                           ├─► 2. Product Agent   live web search → real products, renter install notes, sources
                           ├─► 3. Writer Agent    SERP-based semantic brief (entities, n-grams, skip-grams, NLP terms)
                           │                      → entity-salient, E-E-A-T article with affiliate + internal links
                           └─► 4. SEO Agent       on-page audit + score, optimization pass, internal links both ways
                                                  → shipped (commit → Cloudflare Pages rebuild)
```

## Publishing schedule

Set in `site.config.json → schedule` (time zone America/New_York):

| Week | Posts per day |
| --- | --- |
| 1 | 1 |
| 2 | 2 |
| 3 | 3 |
| 4 | 5 |
| 5 | 6 |
| 6–7 | 7 |
| 8 onward | random 0–6 (some days nothing) |

Posts are spread through the day (7am–9pm ET). The start date is set automatically
on the first real run. Preview the calendar: `npm run agents:schedule`.

## Setup checklist

1. **Amazon tag** – set `affiliate.amazonTag` in `site.config.json` (or the
   `AMAZON_TAG` env var on Cloudflare and as a GitHub Actions *variable*).
2. **GitHub secrets** (Settings → Secrets and variables → Actions):
   - `ANTHROPIC_API_KEY` – runs the agents (required)
   - `AHREFS_API_KEY` – keyword research (recommended; falls back to Google Autocomplete)
   - `AMAZON_CREATORS_CREDENTIAL_ID` / `AMAZON_CREATORS_CREDENTIAL_SECRET` – Amazon
     Creators API (real ASINs + product photos; refreshed daily by
     `.github/workflows/amazon-refresh.yml`). Optional variable `AMAZON_CREATORS_VERSION`
     (default `3.1`). Product photos only appear once these and the Amazon tag are set.
3. **Default branch** – the workflow in `.github/workflows/publish.yml` runs on the
   default branch every hour; merge this branch into `main`.
4. **Cloudflare Pages** – connect the repo, build command `npm run build`, output
   directory `dist`, env `NODE_VERSION=22`, add custom domain `rentersmarthome.us`.
5. **E-E-A-T** – replace the placeholder author in `site.config.json → authors`
   with a real person (name, photo in `/public`, bio, LinkedIn/X in `sameAs`) and
   add social profiles to `organization.sameAs`. Never invent credentials.
6. Submit `https://rentersmarthome.us/sitemap-index.xml` in Google Search Console
   and Bing Webmaster Tools.

## Commands

```bash
npm run dev               # local site
npm run build             # production build to dist/
npm run agents:dry        # show what the orchestrator would publish now
npm run agents:run        # publish whatever is due (needs ANTHROPIC_API_KEY)
node agents/orchestrator.mjs --force 1   # publish 1 post right now
npm run agents:keywords   # refill the keyword queue
npm run check:content     # validate internal + affiliate links
npm run images            # generate missing featured images (public/images/featured)
npm run amazon:refresh    # refresh ASINs + product photos from Amazon
```

## Files

- `site.config.json` – brand, categories, authors, affiliate tag, schedule
- `data/keywords.json` – keyword queue (with Ahrefs metrics), `data/state.json` – publish log,
  `data/reports/*.json` – per-post SEO reports (brief, coverage, salience, score)
- `src/content/blog/*.md` – articles; products/FAQs/sources live in frontmatter
- Affiliate links in markdown: `[Product](amzn:Product+Name)` or `[Product](amzn:B0XXXXXXXX)`
