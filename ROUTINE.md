# Daily publishing routine (Claude Routine playbook)

A scheduled Claude Code session runs this playbook once a day. It does the work of
the four agents in `agents/` itself (no Anthropic API key needed), then pushes,
which triggers the Cloudflare deploy and the Amazon image refresh.

**Rules that always apply**
- Never invent product names, specs, prices, star ratings, review counts or testing
  claims. Only state what your web research supports. No prices at all.
- Never write secrets, API keys or tokens into any file.
- Never push a failing build. If something breaks and you can't fix it, stop and
  leave the repo unchanged (no commit).
- Work on the repository's default branch; push to it directly.

## 0. Setup
```bash
DEFAULT=$(git remote show origin | sed -n 's/.*HEAD branch: //p')
git fetch origin "$DEFAULT" && git checkout -B "$DEFAULT" "origin/$DEFAULT"
npm ci
node scripts/routine.mjs status
```
If `remainingToday` is 0, stop here (no commit). Otherwise publish that many posts
(steps 2–8 per post).

## 1. Keyword research (only if `pendingKeywords` < 10)
Follow the rules in the `SYSTEM` prompt of `agents/keyword-agent.mjs`.
- Use the **Ahrefs** connector: `keywords-explorer-matching-terms` (country `us`,
  `terms: all`, filter volume ≥ 30 and difficulty ≤ 20, order by volume) with 5–10
  seeds from `data/seeds.json` for categories that have the fewest posts.
  Read the Ahrefs `doc` tool first for the exact input schema.
- Pick ~10 winnable, renter-relevant keywords that do not duplicate existing posts
  or queued keywords (same intent = duplicate). Merge variants that share a parent
  topic into `secondaryKeywords`.
- Write them to a temp JSON file as an array of
  `{keyword, category, articleType, intent, secondaryKeywords, questions, workingTitle, cluster, priority, rationale, ahrefs:{volume, kd, trafficPotential}}`
  and run `node scripts/routine.mjs add-keywords <file>`.
- If Ahrefs is unavailable, use web search for keyword ideas instead.

## 2. Pick the keyword
`node scripts/routine.mjs next` → use this item. Its `slug` is the post slug.

## 3. Product research
Follow the `SYSTEM` prompt and `COUNT` table in `agents/product-agent.mjs`, using
web search. For each product: `name` (exact model), `brand`, `query` (what a
shopper types on Amazon), `badge`, `summary`, `renterNote`, `pros`, `cons`, and
the source URLs you used. Leave `asin` out: the Amazon refresh workflow adds the
real ASIN and product photo after you push.

## 4. Semantic brief
Follow `BRIEF_SYSTEM` in `agents/writer-agent.mjs` (search the live SERP for the
keyword). Save it as `data/briefs/<slug>.json` with exactly these fields:
`centralEntity, entityVariants[], entities[{name,type,relation}], attributes[],
ngrams[], skipgrams[] ("word1…word2"), nlpTerms[], questions[], contentGaps[],
outline[{h2,intent,h3[]}], targetWords`.

## 5. Internal links
`node scripts/routine.mjs links <slug>` → choose the 3–5 that genuinely fit.

## 6. Write the post
Follow **every** rule in `WRITE_SYSTEM` in `agents/writer-agent.mjs` (semantic SEO,
layout-aware, E-E-A-T, factual, format). Save to `src/content/blog/<slug>.md`.
Frontmatter (copy the shape of an existing post, e.g.
`src/content/blog/best-matter-smart-plugs.md`):

```yaml
title, seoTitle (≤60), description (140–160), pubDate (current UTC time minus a few minutes — future dates are hidden until then),
category, keyword, secondaryKeywords, entities, tags, articleType, readingTime,
tldr (2–4), products [name, brand, query, badge, summary, renterNote, pros, cons],
sources [{title, url}] (manufacturer/standards pages you used, no Amazon URLs),
reviewedDate (today), faqs [{q, a}] (4–6), author: editorial-team
```
Body: intro paragraph, `##` sections each opening with a **bold** direct answer,
`### <exact product name>: <role>` per product in roundups, at least one list,
a comparison table for roundups/comparisons (with a lead-in sentence), product
links as `[Name](amzn:Product+Query)`, internal links as `/blog/<slug>/`.
No H1 and no FAQ section in the body.

## 7. Audit and fix
`node scripts/routine.mjs audit <slug>` → fix every issue it lists and re-run until
`score` ≥ 85 (at most 3 rounds).

## 8. Finalize
```bash
node scripts/routine.mjs finalize <slug>   # featured image, backlinks, queue/state, report
```

## 9. Validate and publish
```bash
npm run check:content && npm run build
git add -A src/content data public/images
git commit -m "content: <post title>"
git push origin HEAD:"$DEFAULT"
```
The push triggers **Deploy to Cloudflare Pages** (site + IndexNow) and
**Amazon product refresh** (real ASINs + product photos, then redeploy).

Finish with a short summary: posts published (title + URL
`https://rentersmarthome.us/blog/<slug>/`), audit scores, anything skipped and why.
