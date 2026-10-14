# Daily publishing routine (Claude Routine playbook)

A scheduled Claude Code session runs this playbook once a day. It does the work of
the four agents in `agents/` itself (no Anthropic API key needed), then pushes,
which triggers the Cloudflare deploy and the Amazon image refresh.

**Voice and personal story (every post):** first person throughout (I, my, me, we, our, us; at least 10 uses),
plus one `> **From our notes:**` story block (60-120 words). Use a real owner story from `data/stories.json` if one
fits, otherwise a true research story (how we compared the products, what stood out in the manuals and specs), or a
clearly framed scenario ("Picture a renter who…"). Never claim we bought, owned, installed or tested a product unless
`data/stories.json` says so (then set `ownerStory: true` in the frontmatter). The QA agent checks both.

**Old-URL recovery:** queue items with `restoresOldUrl` replace pages Google indexed on the old site.
Keep their `slug` exactly as queued; `data/redirects.json` 301s the old URLs to `/blog/<slug>/` as soon as the
post is live and passes QA (until then they 302 to the closest page).

**Owner-supplied keywords:** queue items with `source: "user"` came from the site owner. Write them as given:
they skip the volume cap and the cannibalization check, and `next` serves them first. Items marked
`duplicateOf` share intent with a live post, so they're queued last; give them a distinct angle from that post.

**Rules that always apply**
- Keep it natural, with something genuinely new for crawlers every day: a new post on most days
  (random times, quota 0-2), plus the daily QA backlog re-check of one older post. When the re-check
  changes the post's content, set `updatedDate` to now and `reviewedDate` to today; if nothing changed,
  set only `reviewedDate`. Never bump dates, reorder text or make cosmetic edits just to look fresh.
- Posts go live at random times of day: always use the `slots` times as pubDate, never the current time.
- Never publish more than the day's quota (`remainingToday`, at most 2 posts per day). The site owner does not want
  batches of posts going live at once, so never publish 5 (or several) posts in one go, even if asked by a scheduled prompt.
- Long-tail only: target keywords with ≤ 250 searches/month (Ahrefs). Never target short-tail head terms.
- No keyword cannibalization: before writing, run `node scripts/routine.mjs cannibal "<keyword>"`. If it reports
  a conflict, do not write a new post; add the keyword to that post's `secondaryKeywords` instead.
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
node scripts/qa.mjs --failing
```
If `--failing` lists posts, fix them first (they are blocked from going live). Then, as
QA backlog work, fact-check **one** older post whose QA report has a `LIVE POST, FIX` or
`facts not verified` warning: verify it against its sources, fix it, and run `factcheck` and `qa` for it.
If `remainingToday` is 0, stop here (no commit). Otherwise publish that many posts
(steps 2–8 per post).

## 1. Keyword research (only if `pendingKeywords` < 10)
Follow the rules in the `SYSTEM` prompt of `agents/keyword-agent.mjs`.
- Use **KGR-style long-tail** research (Keyword Golden Ratio). With the **Ahrefs**
  connector: `keywords-explorer-matching-terms` (country `us`, `terms: all`) with seeds
  like apartment, renters, renter, dorm, no drill, landlord and a `where` filter of
  `word_count ≥ 4`, `volume 10–250`, `difficulty ≤ 10`, `serp_domain_rating_top10_min ≤ 30`,
  excluding "rental" and "near me". Read the Ahrefs `doc` tool first for the schema.
- For the best 3–5 candidates run `serp-overview` (top 10 organic): count how many
  titles contain the exact phrase and note the weakest DR. Prefer keywords where few
  or no titles match exactly and low-DR sites, forums or Reddit rank (KGR-style win).
  Skip keywords where every result is a DR 70+ publisher.
- Pick ~10 winnable, renter-relevant keywords, each tagged `funnel: tofu|mofu|bofu` (see the funnel rule in the keyword agent prompt), that do not duplicate existing posts
  or queued keywords (same intent = duplicate). Merge variants that share a parent
  topic into `secondaryKeywords`.
- Write them to a temp JSON file as an array of
  `{keyword, category, articleType, intent, funnel, secondaryKeywords, questions, workingTitle, cluster, priority, rationale, ahrefs:{volume, kd, trafficPotential}}`
  and run `node scripts/routine.mjs add-keywords <file>`.
- If Ahrefs is unavailable, use web search for keyword ideas instead.

## 2. Pick the keyword
`node scripts/routine.mjs next` → use this item (it automatically parks keywords over 250 searches/month
and merges any keyword that would cannibalize an existing post). Its `slug` is the post slug. It already balances the
funnel (≈30% TOFU, 30% MOFU, 40% BOFU); follow the FUNNEL RULES in `WRITE_SYSTEM` for its `funnel` stage
and put `funnel: <stage>` in the frontmatter.

## 3. Product research
Feature exactly `productCount` products (from `next`; a random number per post: roundups 3-18,
comparisons 2-6, guides 1-6), never the same count every day. Give every product its own
`### Product name: role` section (about 120-180 words each), so long lists make long, useful posts; set the
brief's `targetWords` to roughly 700 + 150 x productCount. Follow the `SYSTEM` prompt in `agents/product-agent.mjs`, using
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
title, seoTitle (≤60), description (140–160), pubDate (take the next unused time from `node scripts/routine.mjs slots`; posts go live at random times and the hourly Scheduled release workflow publishes each one when its time comes),
category, keyword, secondaryKeywords, entities, tags, articleType, readingTime,
tldr (2–4), productCount (from `next`), products [exactly productCount items: name, brand, query, badge, summary, renterNote, pros, cons],
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

## 7b. QA agent (must pass before the post can go live)
The site only publishes posts with a passing QA report (`data/qa/<slug>.json`).
1. **Fact check (you do this):** open every source and the manufacturer pages and verify each
   product name, model, spec, compatibility claim and safety statement in the post. Fix or
   remove anything you can't confirm. Then record it:
   `node scripts/routine.mjs factcheck <slug> "<what you verified, against which sources>"`
2. **Automatic checks:** `node scripts/routine.mjs qa <slug>` → it checks prices/star
   ratings/review counts/testing claims, required fields and lengths, FAQs, Amazon links for
   every product, product photo vs Amazon listing, internal links (must already be live),
   sources (https, not Amazon), SEO audit ≥ 85 and cannibalization.
   Fix every error (`✗`) and re-run until it says `"pass": true`. Warnings (`!`) are advisory.
   "No Amazon photo yet" is expected before the push; the Amazon refresh adds it and CI re-runs QA.
If QA can't pass after fixes, don't publish that post: leave it out of the commit.

## 8. Finalize
```bash
node scripts/routine.mjs finalize <slug>   # featured image, backlinks, queue/state, report
```

## 9. Validate and publish
```bash
npm run check:content && npm run build
git add -A src/content data public/images  # includes data/qa
git commit -m "content: <post title>"
git push origin HEAD:"$DEFAULT"
```
The push triggers **Deploy to Cloudflare Pages** (site + IndexNow) and
**Amazon product refresh** (real ASINs + product photos, then redeploy).

Finish with a short summary: posts published (title + URL
`https://rentersmarthome.us/blog/<slug>/`), audit scores, anything skipped and why.
