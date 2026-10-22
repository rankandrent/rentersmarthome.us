// Weekly Search Console snapshot per page (clicks, impressions, CTR, position) for the trim tracking
// (owner rule: concise and new). Writes data/gsc/<domain>/<end-date>.json for a 28-day window that ends
// 3 days ago (Search Console data lags). Needs GSC_SERVICE_ACCOUNT_JSON with access to each property.
//   node scripts/gsc-snapshot.mjs rentersmarthome.us best-tripod.com best-safe.com
import fs from 'node:fs';
import path from 'node:path';
import { DATA_DIR } from '../agents/lib/config.mjs';
import { googleAccessToken } from '../agents/lib/google.mjs';

const domains = process.argv.slice(2);
const raw = process.env.GSC_SERVICE_ACCOUNT_JSON;
if (!raw) {
  console.log('GSC_SERVICE_ACCOUNT_JSON not set; no snapshot taken.');
  process.exit(0);
}
const token = await googleAccessToken(JSON.parse(raw), 'https://www.googleapis.com/auth/webmasters.readonly');
const day = (d) => new Date(Date.now() - d * 86400000).toISOString().slice(0, 10);
const [startDate, endDate] = [day(30), day(3)];

let failed = 0;
for (const domain of domains) {
  // Domain property first, then the URL-prefix properties (rentersmarthome.us is https://rentersmarthome.us/).
  let res;
  for (const site of [`sc-domain:${domain}`, `https://${domain}/`, `https://www.${domain}/`]) {
    res = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(site)}/searchAnalytics/query`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ startDate, endDate, dimensions: ['page'], rowLimit: 5000, dataState: 'final' }),
    });
    if (res.status !== 403) break;
  }
  if (!res.ok) {
    failed++;
    console.log(`${domain}: HTTP ${res.status} ${(await res.text()).slice(0, 300)}`);
    continue;
  }
  const rows = ((await res.json()).rows ?? []).map((r) => ({
    page: r.keys[0],
    clicks: r.clicks,
    impressions: r.impressions,
    ctr: +r.ctr.toFixed(4),
    position: +r.position.toFixed(1),
  }));
  const dir = path.join(DATA_DIR, 'gsc', domain);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, `${endDate}.json`), JSON.stringify({ domain, startDate, endDate, rows }, null, 1) + '\n');
  console.log(`${domain}: ${rows.length} pages, ${startDate}..${endDate}`);
}
if (failed === domains.length && domains.length) process.exit(1);
