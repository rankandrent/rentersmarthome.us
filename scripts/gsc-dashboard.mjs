// Search Console numbers for the "Search Performance" dashboard (owner request 2026-10-22).
// Writes data/dashboard/gsc.json: per site, daily totals for the last 90 days and per-query
// clicks/impressions/position for the last day, 7 days and 30 days plus the period before each.
// Uses dataState "all" so the newest (still provisional) day is included.
//   node scripts/gsc-dashboard.mjs rentersmarthome.us best-tripod.com best-safe.com
import fs from 'node:fs';
import path from 'node:path';
import { DATA_DIR } from '../agents/lib/config.mjs';
import { googleAccessToken } from '../agents/lib/google.mjs';

const domains = process.argv.slice(2);
const raw = process.env.GSC_SERVICE_ACCOUNT_JSON;
if (!raw) {
  console.log('GSC_SERVICE_ACCOUNT_JSON not set; nothing done.');
  process.exit(0);
}
const auth = { Authorization: `Bearer ${await googleAccessToken(JSON.parse(raw), 'https://www.googleapis.com/auth/webmasters.readonly')}` };
const iso = (d) => d.toISOString().slice(0, 10);
const shift = (day, n) => iso(new Date(Date.parse(day) + n * 86400000));

async function property(domain) {
  const res = await fetch('https://www.googleapis.com/webmasters/v3/sites', { headers: auth });
  const sites = res.ok ? ((await res.json()).siteEntry ?? []).map((s) => s.siteUrl) : [];
  return [`sc-domain:${domain}`, `https://${domain}/`, `https://www.${domain}/`].find((s) => sites.includes(s));
}

async function query(site, body) {
  const res = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(site)}/searchAnalytics/query`, {
    method: 'POST',
    headers: { ...auth, 'Content-Type': 'application/json' },
    body: JSON.stringify({ dataState: 'all', ...body }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${(await res.text()).slice(0, 200)}`);
  return (await res.json()).rows ?? [];
}

const out = { generatedAt: new Date().toISOString(), sites: {} };
for (const domain of domains) {
  const site = await property(domain);
  if (!site) { console.log(`${domain}: no Search Console access`); continue; }
  const today = iso(new Date());
  const daily = (await query(site, { startDate: shift(today, -92), endDate: today, dimensions: ['date'], rowLimit: 200 }))
    .map((r) => ({ date: r.keys[0], clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position }));
  const last = daily.at(-1)?.date ?? shift(today, -3);
  const windows = {
    d1: [last, last], d1prev: [shift(last, -1), shift(last, -1)],
    d7: [shift(last, -6), last], d7prev: [shift(last, -13), shift(last, -7)],
    d30: [shift(last, -29), last], d30prev: [shift(last, -59), shift(last, -30)],
  };
  const queries = {};
  for (const [name, [startDate, endDate]] of Object.entries(windows)) {
    for (const r of await query(site, { startDate, endDate, dimensions: ['query', 'page'], rowLimit: 5000 })) {
      const q = (queries[r.keys[0]] ??= { query: r.keys[0], page: r.keys[1] });
      const w = (q[name] ??= { clicks: 0, impressions: 0, posSum: 0 });
      w.clicks += r.clicks;
      w.impressions += r.impressions;
      w.posSum += r.position * r.impressions;
      if (name === 'd30' && r.impressions >= (q.pageImpr ?? 0)) Object.assign(q, { page: r.keys[1], pageImpr: r.impressions });
    }
  }
  for (const q of Object.values(queries)) {
    for (const name of Object.keys(windows)) {
      const w = q[name];
      if (w) { w.position = +(w.posSum / w.impressions).toFixed(1); delete w.posSum; }
    }
    delete q.pageImpr;
  }
  out.sites[domain] = { property: site, lastDate: last, windows, daily, queries: Object.values(queries) };
  console.log(`${domain}: ${daily.length} days to ${last}, ${Object.keys(queries).length} queries`);
}
const dir = path.join(DATA_DIR, 'dashboard');
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'gsc.json'), JSON.stringify(out) + '\n');
