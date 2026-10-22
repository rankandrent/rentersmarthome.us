// Google indexing helper for the three sites (owner request 2026-10-22). Google has no API for the
// Search Console "Request indexing" button, and its Indexing API is only allowed for job-posting and
// livestream pages, so this uses the allowed routes:
//   --submit   resubmit the sitemap in Search Console + WebSub ping for the RSS feed (after every deploy)
//   --check    URL Inspection API for every blog URL in the sitemap: writes data/index/<domain>.json and
//              prints the pages Google has not indexed yet, with a Search Console link to request indexing
// Needs GSC_SERVICE_ACCOUNT_JSON (service account with Full access to each property).
//   node scripts/google-indexing.mjs --submit best-tripod.com
//   node scripts/google-indexing.mjs --check rentersmarthome.us best-tripod.com best-safe.com
import fs from 'node:fs';
import path from 'node:path';
import { DATA_DIR } from '../agents/lib/config.mjs';
import { googleAccessToken } from '../agents/lib/google.mjs';

const [mode, ...domains] = process.argv.slice(2);
if (!['--submit', '--check'].includes(mode) || !domains.length) throw new Error('usage: node scripts/google-indexing.mjs --submit|--check <domain>...');
const raw = process.env.GSC_SERVICE_ACCOUNT_JSON;
if (!raw) {
  console.log('GSC_SERVICE_ACCOUNT_JSON not set; nothing done.');
  process.exit(0);
}
const token = await googleAccessToken(JSON.parse(raw));
const auth = { Authorization: `Bearer ${token}` };

// Domain property first, then URL-prefix (rentersmarthome.us is https://rentersmarthome.us/).
async function propertyFor(domain) {
  const res = await fetch('https://www.googleapis.com/webmasters/v3/sites', { headers: auth });
  const sites = res.ok ? ((await res.json()).siteEntry ?? []).map((s) => s.siteUrl) : [];
  return [`sc-domain:${domain}`, `https://${domain}/`, `https://www.${domain}/`].find((s) => sites.includes(s)) ?? `sc-domain:${domain}`;
}

async function sitemapUrls(domain) {
  const get = async (u) => (await fetch(u, { signal: AbortSignal.timeout(20000) })).text();
  const locs = (xml) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  const index = await get(`https://${domain}/sitemap-index.xml`);
  const urls = [];
  for (const sm of locs(index)) urls.push(...locs(await get(sm)));
  return urls.filter((u) => /\/blog\/[^/]+\/$/.test(new URL(u).pathname));
}

async function submit(domain) {
  const site = await propertyFor(domain);
  const sitemap = `https://${domain}/sitemap-index.xml`;
  const res = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(site)}/sitemaps/${encodeURIComponent(sitemap)}`, { method: 'PUT', headers: auth });
  console.log(`${domain}: sitemap submit (${site}) HTTP ${res.status} ${res.ok ? '' : (await res.text()).slice(0, 200)}`);
  const ws = await fetch('https://pubsubhubbub.appspot.com/', {
    method: 'POST',
    body: new URLSearchParams({ 'hub.mode': 'publish', 'hub.url': `https://${domain}/rss.xml` }),
  });
  console.log(`${domain}: WebSub ping HTTP ${ws.status}`);
}

async function check(domain) {
  const site = await propertyFor(domain);
  const urls = await sitemapUrls(domain);
  const results = [];
  for (const url of urls) {
    const res = await fetch('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', {
      method: 'POST',
      headers: { ...auth, 'Content-Type': 'application/json' },
      body: JSON.stringify({ inspectionUrl: url, siteUrl: site }),
    });
    if (!res.ok) {
      results.push({ url, error: `HTTP ${res.status}` });
      if (res.status === 429) break; // daily quota (2,000 per property)
      continue;
    }
    const r = (await res.json()).inspectionResult?.indexStatusResult ?? {};
    results.push({ url, verdict: r.verdict, coverage: r.coverageState, lastCrawl: r.lastCrawlTime ?? null, robots: r.robotsTxtState, fetch: r.pageFetchState });
  }
  const dir = path.join(DATA_DIR, 'index');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, `${domain}.json`), JSON.stringify({ domain, site, checkedAt: new Date().toISOString(), results }, null, 1) + '\n');
  const notIndexed = results.filter((r) => r.verdict !== 'PASS');
  console.log(`${domain}: ${results.length - notIndexed.length}/${results.length} blog URLs indexed`);
  for (const r of notIndexed) {
    const link = `https://search.google.com/search-console/inspect?resource_id=${encodeURIComponent(site)}&id=${encodeURIComponent(r.url)}`;
    console.log(`  NOT INDEXED  ${r.url}  [${r.coverage ?? r.error}]  ${link}`);
  }
}

for (const domain of domains) {
  try {
    await (mode === '--submit' ? submit(domain) : check(domain));
  } catch (e) {
    console.log(`${domain}: ${mode} failed (non-fatal): ${e.message}`);
  }
}
