# SEO knowledge base (patent research agent)

Running knowledge base for rentersmarthome.us, best-tripod.com and best-safe.com. Written by
`.claude/agents/patent-research-agent.md`; studied patents live in `data/patents.json`, the rest in
`data/patent-queue.json`. First run: 2026-10-23 (5 patents studied, 39 queued).

**Evidence levels.** confirmed = Google docs, the 2024 API leak or DOJ trial evidence back it. likely = several
patents/experts agree and it fits Google's guidance. speculative = one patent only. A patent shows what Google
invented, not proof it runs today. Proposals below are only for confirmed/likely findings; "owner" = needs the
owner's decision (cost, owner-rule conflict or site-wide design). Nothing here has been applied yet.

Primary sources opened this run:
- Google ranking systems guide: https://developers.google.com/search/docs/appearance/ranking-systems-guide
- Creating helpful, reliable, people-first content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Write high quality reviews: https://developers.google.com/search/docs/specialty/ecommerce/write-high-quality-reviews
- Spam policies (thin affiliation): https://developers.google.com/search/docs/essentials/spam-policies
- DOJ trial exhibit PXR0357, Pandu Nayak call notes: https://www.justice.gov/atr/media/1398866/dl
- 2024 Content Warehouse leak analysis (used to locate attributes, not as proof alone): https://ipullrank.com/google-algo-leak

---

## Why our posts sit at positions 20-50 (2026-10-23 snapshot)

Search Console, last 30 days (data/dashboard/gsc.json):

| Site | Query rows | Impr. | Clicks | Median pos. | Rows at 1-10 | Rows at 21-50 | Rows 51+ |
|---|---|---|---|---|---|---|---|
| rentersmarthome.us | 187 | 325 | 1 | 42 | 28 | 79 | 68 |
| best-tripod.com | 81 | 149 | 2 | 23 | 21 | 32 | 14 |
| best-safe.com | 46 | 67 | 1 | 51 | 1 | 19 | 24 |

Pattern: long-tail, low-competition queries already reach 1-10 ("best stud finder for plaster walls" 1,
"zigbee vs thread range" 1, "tripod height for 6 feet" 6.8, "best monopod for wildlife photography" 7), while
contested "best X" head terms sit at 40-60 ("best fireproof safe" page avg 53.5, "best handgun safe" 61, "best
dehumidifier for small apartment" page avg 44). No branded queries exist for any site.

The three biggest reasons, from evidence:
1. **Site-level authority is at its floor (likely).** Patents US8682892B1 and US9031929B1 scale every page of a
   site by independent links and brand/navigational queries; Google says site-wide signals contribute; the DOJ
   exhibit says PageRank still feeds quality signals; the leak shows siteAuthority, homepage PageRank on every
   document and hostAge used "to sandbox fresh spam". Our sites are days old in Search Console, have DR 0
   (rentersmarthome: 53 spam nofollow domains, 0 editorial links) and zero branded queries. Relevance is enough
   for long-tail queries with weak competitors, not for SERPs held by DR 75-95 publishers.
2. **Low information gain and no first-hand evidence on review queries (confirmed principle).** product-agent
   only picks products 2+ top-10 pages already recommend, and the live posts say "the pick most top review sites
   agree on" and "We did not test these products ourselves". Google's reviews guidance asks for "first-hand
   supporting evidence" and "original research"; its helpful-content checklist flags "mainly summarizing what
   others have to say". For "best X" queries the top 10 has hands-on testers, so a careful summary of them adds
   little (US11354342B2 describes scoring exactly that difference).
3. **No click history yet (confirmed).** NavBoost uses 13 months of query-document click data (DOJ exhibit);
   US8661029B1 scores long clicks vs all clicks. At positions 20-50 we get ~1 impression per day per page and
   almost no clicks (4 clicks across all three sites in 30 days), so there is nothing to promote us with. This
   part is partly just time; it is fastest to fix by winning page-1 long-tail queries first and making those
   visits long.

Honest caveat: the sites are 1-2 weeks into Search Console, so positions will move without any change. The
reasons above say why head terms will not reach the top 10 on content alone.

---

## information-gain

**What Google likely rewards:** pages that add information the searcher has not already seen in the other
results: original analysis, new comparisons, decision help, real experience.

**Evidence:**
- US11354342B2 Contextual estimation of link information gain (Google, granted 2022): score = "quantity of new
  information" in a new document beyond documents already seen, ML over semantic vectors. Claims are about an
  assistant and a user's own history: mechanism speculative for web ranking.
- Confirmed principle: helpful-content questions ("original information, reporting, research, or analysis",
  "beyond the obvious", "avoid simply copying or rewriting those sources"), rater attribute Originality ("not
  already available on other websites"), leak attribute OriginalContentScore.
- Queue: US7536408B2 phrase-based indexing (information gain between phrases), US8108412B2 duplicate detection.

**What we already do:** brief `ourGain` (3-5 points with sources), `commonPoints` kept short, pain points, sourced
stats, concise targetWords.

**What we miss:** nothing checks an ourGain point is actually absent from the top results; product selection is
consensus-only; posts justify picks with other publishers' picks.

**Proposals:** brief-agent ourGain types + `absentFrom` (high); writer/QA no publisher names in first 150 words,
picks justified by spec/calculation/owner fact (high); product-agent one non-consensus pick allowed (owner).
Wording in data/patents.json.

## product-reviews

**What Google likely rewards (confirmed, reviews system):** "insightful analysis and original research", written
by "experts or enthusiasts"; quantitative measurements; what sets a product apart; benefits/drawbacks from your
own research; evidence of experience; ranked lists that stand on their own. Thin affiliation = descriptions
copied from the merchant with no added value; good affiliate pages offer "original product reviews, rigorous
testing and ratings ... product comparisons".

**Evidence:** Google docs above. Queue: US8417713B1 sentiment as ranking signal, US9201928B2 review quality
(assignee unconfirmed), US8645396B2 reputation scoring of an author.

**What we already do:** verified specs, comparison tables, owner praise/complaints with source, scores from a
published rubric, honest "we did not test" statements, no fake experience (owner rule; keep it).

**What we miss:** quantitative analysis of our own (calculations from specs), named reviewer, and any real
first-hand evidence. Real hands-on evidence (owner photos, measurements, `data/stories.json`) is the strongest
lever Google names, but it costs owner time: owner decision.

## site-quality

**What Google likely rewards:** sites people seek out by name and link to independently; site-wide signals lift
or cap all pages (Google: "Site-wide signals and classifiers are also used").

**Evidence:** US9031929B1 Site quality score (brand/navigational queries ÷ queries that land on the site), leak
siteAuthority (applied in Qstar), DOJ Q* quality signal. Exact-match domains get less credit (Google EMD system;
leak lists an EMD demotion), relevant to best-tripod.com and best-safe.com. Queue: US9767157B2 predicting site
quality for new sites, US9195944B1, US9659064B1, US20190155948A1, US8442984B1, US9183499B1.

**What we already do:** About, editorial policy, how-we-research, how-we-score, author page (Organization),
checklists as brand tools.

**What we miss:** zero branded queries; anonymous "Editorial Team" byline (Google: "Do bylines lead to further
information about the author"; never fabricate one).

**Proposals:** branded-query KPI (medium); brand-name mentions in white-hat outreach (owner); real named reviewer
(owner).

## links/authority

**What Google likely rewards:** independent, editorial links; PageRank is still core (ranking guide; DOJ
exhibit). Links from related or duplicate sources do not count as independent (US8682892B1).

**Evidence:** US8682892B1 (Panda: independent links ÷ reference queries as a site-wide factor; expired), leak
homepagePagerankNs and siteAuthority. Queue: US7716225B1 reasonable surfer (link value by placement), US9165040B1
seed-distance ranking, US9002832B1 low-quality sites by linking sites, US8959093B1 anchors, US8818995B1 trust,
US8244722B1 rank-modifying spam, US6285999B1 PageRank.

**What we already do:** white-hat-only owner rule, off-page prompt, internal links from 2-3 related posts in
improve-agent, ROUTINE prefers keywords where low-DR sites or forums rank.

**What we miss:** a hard keyword gate while authority is ~0, and a measurable link-earning target.

**Proposals:** keyword gate (2+ weak results in top 10, park DR>=60-only head terms) (high); 3-5 editorial
referring domains per site per month, never cross-linking our own sites as a scheme (owner).

## user-signals

**What Google does (confirmed):** NavBoost counts clicks per query-document pair over 13 months (DOJ exhibit);
Google also says it "avoids simply 'predicting clicks' because clicks are easily manipulated". Leak: goodClicks,
badClicks, lastLongestClicks.

**Evidence:** US8661029B1 long clicks / all clicks. Queue: US8938463B1 presentation bias, US8615514B1 site-level
feedback, US9092510B1 temporal clicks, US8909655B1 time based ranking, US9514194B1 visit duration.

**What we already do:** click-earning seoTitle rules, first screen delivers the promise, improve-agent rewrites
titles for CTR.

**What we miss:** an explicit "decide without going back" block; improve-agent priority on queries closest to
page 1. Never try to fake clicks (spam).

**Proposals:** chooser block in every roundup + QA warn (medium); improve-agent picks positions 4-15 first
(medium).

## on-page/titles

**What Google likely rewards:** titles that match the query (leak titlematchScore), and passages under clear
headings that answer the question directly (passage ranking system, confirmed).

**Evidence:** US9940367B1 scoring candidate answer passages: query terms, answer terms common across top
results, expected entity type, site quality, penalties for passages that span two sections or start with a
discourse boundary term. Queue: US9959315B1 heading context, US10019513B1 weighted answer terms, US8145617B1
snippets.

**What we already do:** exact keyword in title and seoTitle, titles from the live SERP pattern, bold direct answer
under every H2, FAQs.

**What we miss:** rules for self-contained answer sentences and answer type.

**Proposals:** answer-sentence rule + QA first-word warn (medium); brief `answerType`/`answerTerms` (low).

## entities/semantic

**Status:** not studied yet. Briefs already carry centralEntity, entities, attributes, ngrams. Queue:
WO2014089776A1 entity metrics, US8452758B2 related queries, US7536408B2 phrase-based indexing.

## content-quality

**What Google says (confirmed):** effort, originality, talent/skill, accuracy; no preferred word count; mass
production "spread across a large network of sites" is a warning sign. Thin affiliation includes "cookie-cutter
sites or templates with the same or similar content replicated ... across multiple domains or languages".

**Note for the owner:** three sites share one template and boilerplate blocks, and rentersmarthome.us has 111
translations for 54 English posts. Content differs by niche, so this is not thin affiliation as written, but
translations should stay fully reviewed (they are paused under LIGHT MODE). Queue: US9996624B2 in-depth articles,
US8108412B2 duplicates.

## freshness

**What Google does (confirmed):** "query deserves freshness" systems for queries where fresh content is expected;
Google warns against changing dates without substantial change. Our updatedDate is only set when content changes
(ROUTINE), which matches. Queue: US8549014B2, US7346839B2, US20100325114A1, US9002867B1.

## technical/crawl

**Status:** not studied yet. Google: page experience rewarded overall. Queue: US9229989B1 load times (check
Amazon image weight), US8417686B2 sitemaps, US8666964B1 crawl schedule.

---

## Rule conflicts noticed during the gap check (for the parent, not patent findings)

- ROUTINE.md step 4 (all 3 repos) says `targetWords` 10-20% above avgWords; brief-agent.md and the owner's
  "concise" rule say at most 10% above. One of them should be corrected.
- ROUTINE.md voice section (rentersmarthome line ~339, best-tripod ~343, best-safe ~352) says "I/my/me appears only
  inside a quoted, named story", which conflicts with the owner rule of 2026-10-23 (first person in every product
  write-up).

## Changelog
- 2026-10-23: first run. Inventory of 44 patents (5 studied, 39 pending). Studied US11354342B2, US9031929B1,
  US8682892B1, US8661029B1, US9940367B1.
