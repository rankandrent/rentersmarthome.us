// Builds the three data files of the "Search Performance" dashboard from data/dashboard/gsc.json
// (gsc-dashboard.mjs, run daily by gsc-snapshot.yml) and each site's keyword queue and SERP records.
//   node scripts/dashboard-search-data.mjs <out-dir>
// Writes <out>/daily.json (site, date, clicks, impressions, ctr, position),
//        <out>/keywords.json (one row per site + keyword: queue status, volume, KD, intent, our page,
//                             clicks/impressions/position for 1, 7 and 30 days and the period before),
//        <out>/serps.json (site, keyword, rank, url, domain).
import fs from 'node:fs';
import path from 'node:path';

const OUT = process.argv[2] || 'dashboard-search';
fs.mkdirSync(OUT, { recursive: true });
const SITES = [
  { domain: 'rentersmarthome.us', dir: '/home/user/rentersmarthome.us' },
  { domain: 'best-tripod.com', dir: '/home/user/best-tripod.com' },
  { domain: 'best-safe.com', dir: '/home/user/best-safe.com' },
];
const gsc = JSON.parse(fs.readFileSync(path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'data/dashboard/gsc.json'), 'utf8'));
const read = (f, d) => (fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : d);
const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const STATUS = { published: 'Published', pending: 'Queued', deferred: 'Deferred', merged: 'Merged', rejected: 'Rejected' };

const daily = [], keywords = [], serps = [];
for (const { domain, dir } of SITES) {
  const g = gsc.sites[domain];
  for (const d of g?.daily ?? []) daily.push({ site: domain, date: d.date, clicks: d.clicks, impressions: d.impressions, ctr: +d.ctr.toFixed(4), position: +d.position.toFixed(1) });

  const qmap = new Map((g?.queries ?? []).map((q) => [norm(q.query), q]));
  const used = new Set();
  const metrics = (q) => {
    const m = {};
    for (const w of ['d1', 'd1prev', 'd7', 'd7prev', 'd30', 'd30prev']) {
      m[`${w}_clicks`] = q?.[w]?.clicks ?? 0;
      m[`${w}_impr`] = q?.[w]?.impressions ?? 0;
      m[`${w}_pos`] = q?.[w]?.position ?? null;
    }
    return m;
  };
  let queue = read(path.join(dir, 'data/keywords.json'), []);
  if (!Array.isArray(queue)) queue = queue.keywords ?? [];
  for (const k of queue) {
    if (k.status === 'merged' || k.status === 'rejected') continue;
    const q = qmap.get(norm(k.keyword));
    if (q) used.add(norm(k.keyword));
    const a = k.ahrefs ?? {};
    keywords.push({
      site: domain, keyword: k.keyword, status: STATUS[k.status] ?? k.status,
      volume: a.volume ?? k.volume ?? null, kd: a.kd ?? k.kd ?? null,
      intent: k.intent ?? null, page: q?.page ?? (k.status === 'published' && k.slug ? `https://${domain}/blog/${k.slug}/` : null),
      ...metrics(q),
    });
  }
  // Queries people already find us for that are not in the queue.
  for (const q of g?.queries ?? []) {
    if (used.has(norm(q.query)) || (q.d30?.impressions ?? 0) < 2) continue;
    keywords.push({ site: domain, keyword: q.query, status: 'Search Console', volume: null, kd: null, intent: null, page: q.page, ...metrics(q) });
  }
  for (const [kw, s] of Object.entries(read(path.join(dir, 'data/serps.json'), {}))) {
    (s.urls ?? []).slice(0, 10).forEach((u, i) => {
      let host = '';
      try { host = new URL(u).hostname.replace(/^www\./, ''); } catch {}
      serps.push({ site: domain, keyword: kw, rank: i + 1, url: u, domain: host, checked: s.date ?? null });
    });
  }
}
const meta = { generatedAt: gsc.generatedAt, lastDate: Object.fromEntries(Object.entries(gsc.sites).map(([d, s]) => [d, s.lastDate])) };
fs.writeFileSync(path.join(OUT, 'daily.json'), JSON.stringify({ meta, rows: daily }));
fs.writeFileSync(path.join(OUT, 'keywords.json'), JSON.stringify({ meta, rows: keywords }));
fs.writeFileSync(path.join(OUT, 'serps.json'), JSON.stringify({ rows: serps }));
console.log(`daily ${daily.length}, keywords ${keywords.length}, serps ${serps.length} rows -> ${OUT}`);
