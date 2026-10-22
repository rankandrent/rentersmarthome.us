// Old-post improvement picks from Search Console (owner rule 2026-10-22: improve old posts from GSC data,
// never change a URL). Reads the newest data/gsc/<domain>/<date>.json and <date>.queries.json in this repo
// (gsc-snapshot.yml) and ranks live English posts of <site-repo> by what the data says to fix:
//   ctr        - many impressions, few clicks for the position: rewrite seoTitle/description only
//   striking   - average position 8-25 with impressions: strengthen the content for the queries it ranks for
//   gaps       - queries with impressions whose words the post never uses: answer them in the post
// Posts improved in the last 14 days (<site-repo>/data/improved.json) and posts younger than 5 days are skipped.
//   node scripts/gsc-opportunities.mjs <site-repo-dir> <domain> [n]
//   node scripts/gsc-opportunities.mjs <site-repo-dir> <domain> --mark <slug> "<what changed>"
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const [repo, domain, ...rest] = process.argv.slice(2);
if (!repo || !domain) throw new Error('usage: node scripts/gsc-opportunities.mjs <site-repo-dir> <domain> [n | --mark <slug> "<notes>"]');
const logFile = path.join(repo, 'data/improved.json');
const log = fs.existsSync(logFile) ? JSON.parse(fs.readFileSync(logFile, 'utf8')) : [];

if (rest[0] === '--mark') {
  const [, slug, notes = ''] = rest;
  log.push({ slug, date: new Date().toISOString(), notes });
  fs.writeFileSync(logFile, JSON.stringify(log, null, 2) + '\n');
  console.log(JSON.stringify({ marked: slug }));
  process.exit(0);
}
const n = Number(rest[0] ?? 2);

const dir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'data/gsc', domain);
const files = fs.existsSync(dir) ? fs.readdirSync(dir).sort() : [];
const pagesFile = files.filter((f) => /^\d{4}-\d\d-\d\d\.json$/.test(f)).at(-1);
const queriesFile = files.filter((f) => f.endsWith('.queries.json')).at(-1);
if (!pagesFile) throw new Error(`no Search Console snapshot in ${dir}: run gsc-snapshot.yml`);
const pages = JSON.parse(fs.readFileSync(path.join(dir, pagesFile), 'utf8'));
const queries = queriesFile ? JSON.parse(fs.readFileSync(path.join(dir, queriesFile), 'utf8')).rows : [];

const slugOf = (url) => new URL(url).pathname.match(/^\/blog\/([^/]+)\/?$/)?.[1];
const recent = new Set(log.filter((e) => Date.now() - Date.parse(e.date) < 14 * 86400000).map((e) => e.slug));
const blog = path.join(repo, 'src/content/blog');
const words = (s) => String(s).toLowerCase().match(/[a-z0-9]+/g) ?? [];
const STOP = new Set(['a', 'an', 'the', 'for', 'to', 'of', 'in', 'on', 'and', 'or', 'is', 'are', 'my', 'with', 'vs', 'do', 'does', 'can', 'how', 'what', 'best', 'i']);

// Expected CTR by position (rough industry curve); a page far under it has a title/snippet problem.
const expected = (pos) => (pos <= 1.5 ? 0.25 : pos <= 3 ? 0.12 : pos <= 5 ? 0.06 : pos <= 10 ? 0.025 : 0.008);

const out = [];
for (const row of pages.rows) {
  const slug = slugOf(row.page);
  const file = slug && path.join(blog, `${slug}.md`);
  if (!file || !fs.existsSync(file) || recent.has(slug)) continue;
  const { data, content } = matter(fs.readFileSync(file, 'utf8'));
  if (data.draft || Date.now() - Date.parse(data.pubDate) < 5 * 86400000) continue;
  const text = new Set(words(`${data.title} ${data.description} ${content}`));
  const qs = queries.filter((q) => slugOf(q.page) === slug).sort((a, b) => b.impressions - a.impressions);
  const gaps = qs
    .filter((q) => q.impressions >= 3 && words(q.query).filter((w) => !STOP.has(w) && !text.has(w)).length > 0)
    .slice(0, 8)
    .map((q) => ({ query: q.query, impressions: q.impressions, position: q.position, missing: words(q.query).filter((w) => !STOP.has(w) && !text.has(w)) }));
  const reasons = [];
  let score = 0;
  if (row.impressions >= 30 && row.ctr < expected(row.position) / 2) {
    reasons.push(`ctr: ${row.impressions} impressions, CTR ${(row.ctr * 100).toFixed(1)}% at position ${row.position}`);
    score += row.impressions;
  }
  if (row.position >= 8 && row.position <= 25 && row.impressions >= 20) {
    reasons.push(`striking: average position ${row.position} with ${row.impressions} impressions`);
    score += row.impressions * 0.8;
  }
  if (gaps.length) {
    reasons.push(`gaps: ${gaps.length} queries use words the post never mentions`);
    score += gaps.reduce((s, g) => s + g.impressions, 0) * 0.5;
  }
  if (!reasons.length) continue;
  out.push({
    slug, url: row.page, score: Math.round(score), clicks: row.clicks, impressions: row.impressions,
    ctr: row.ctr, position: row.position, reasons,
    topQueries: qs.slice(0, 10).map((q) => ({ query: q.query, impressions: q.impressions, clicks: q.clicks, position: q.position })),
    gaps,
  });
}
out.sort((a, b) => b.score - a.score);
console.log(JSON.stringify({ domain, window: `${pages.startDate}..${pages.endDate}`, picks: out.slice(0, n), more: Math.max(0, out.length - n) }, null, 2));
