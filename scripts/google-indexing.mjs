// Google indexing helper for the three sites (owner request 2026-10-22). Google has no API for the
// Search Console "Request indexing" button, and its Indexing API is only allowed for job-posting and
// livestream pages, so this uses the allowed routes:
//   --submit   resubmit the sitemap in Search Console + WebSub ping for the RSS feed (after every deploy)
//   --check    URL Inspection API, only for the posts the owner names (owner rule 2026-10-22: never the whole
//              site): TARGETS = comma-separated keywords, slugs or URLs, matched against the sitemap's blog
//              URLs. Writes data/index/<domain>.json and prints each page's status with a Search Console
//              link to press "Request indexing".
//   --notify   Google Indexing API (owner decision 2026-10-23, after being told Google only allows it for job and
//              livestream pages and may ignore it or revoke access): URL_UPDATED for TARGETS (same matching as --check)
//              TARGETS="*" = every blog URL of the site (English first, then translations), skipping URLs sent in
//              the last 7 days (data/index/notified.json); stops at 190 URLs per run (daily quota 200), rerun next day
//   --notify-recent  the same for every blog URL whose sitemap lastmod is in the last 26 hours (runs after each deploy)
//              Needs the Web Search Indexing API enabled in the Google Cloud project and the service account
//              added as an Owner of each Search Console property. Default quota: 200 URLs per day.
// Needs GSC_SERVICE_ACCOUNT_JSON (service account with Full access to each property).
//   node scripts/google-indexing.mjs --submit best-tripod.com
//   TARGETS="best travel safe, https://best-tripod.com/blog/ball-head-tripod/" node scripts/google-indexing.mjs --check best-safe.com best-tripod.com
import fs from 'node:fs';
import path from 'node:path';
import { DATA_DIR } from '../agents/lib/config.mjs';
import { googleAccessToken } from '../agents/lib/google.mjs';

const [mode, ...domains] = process.argv.slice(2);
if (!['--submit', '--check', '--notify', '--notify-recent'].includes(mode) || !domains.length) throw new Error('usage: node scripts/google-indexing.mjs --submit|--check|--notify|--notify-recent <domain>...');
const raw = process.env.GSC_SERVICE_ACCOUNT_JSON;
if (!raw) {
  console.log('GSC_SERVICE_ACCOUNT_JSON not set; nothing done.');
  process.exit(0);
}
const notifying = mode.startsWith('--notify');
const token = await googleAccessToken(JSON.parse(raw), notifying ? 'https://www.googleapis.com/auth/indexing' : undefined);
const auth = { Authorization: `Bearer ${token}` };

// Domain property first, then URL-prefix (rentersmarthome.us is https://rentersmarthome.us/).
async function propertyFor(domain) {
  const res = await fetch('https://www.googleapis.com/webmasters/v3/sites', { headers: auth });
  const sites = res.ok ? ((await res.json()).siteEntry ?? []).map((s) => s.siteUrl) : [];
  return [`sc-domain:${domain}`, `https://${domain}/`, `https://www.${domain}/`].find((s) => sites.includes(s)) ?? `sc-domain:${domain}`;
}

async function sitemapEntries(domain) {
  const get = async (u) => (await fetch(u, { signal: AbortSignal.timeout(20000) })).text();
  const locs = (xml) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  const index = await get(`https://${domain}/sitemap-index.xml`);
  const out = [];
  for (const sm of locs(index)) {
    for (const m of (await get(sm)).matchAll(/<url>([\s\S]*?)<\/url>/g)) {
      const loc = m[1].match(/<loc>([^<]+)<\/loc>/)?.[1]?.trim();
      if (loc && /\/blog\/[^/]+\/$/.test(new URL(loc).pathname)) out.push({ url: loc, lastmod: m[1].match(/<lastmod>([^<]+)<\/lastmod>/)?.[1] });
    }
  }
  return out;
}
const sitemapUrls = async (domain) => (await sitemapEntries(domain)).map((e) => e.url);

function matchTargets(urls) {
  const targets = String(process.env.TARGETS ?? '').split(',').map((s) => s.trim().toLowerCase()).filter(Boolean);
  const slugOf = (u) => new URL(u).pathname.split('/').filter(Boolean).at(-1);
  return urls.filter((u) => targets.some((t) =>
    t.startsWith('http') ? u === t || u === `${t.replace(/\/$/, '')}/` : slugOf(u) === t.replace(/\s+/g, '-') || slugOf(u) === t));
}

const sentFile = path.join(DATA_DIR, 'index', 'notified.json');
const sent = fs.existsSync(sentFile) ? JSON.parse(fs.readFileSync(sentFile, 'utf8')) : {};
let budget = 190;
let pass = 0; // with TARGETS="*": pass 0 = English posts of every site, pass 1 = translations

async function notify(domain, recent) {
  // The Indexing API needs the service account as an Owner of the property, not a Full user.
  const sitesRes = await fetch('https://www.googleapis.com/webmasters/v3/sites', { headers: { Authorization: `Bearer ${await googleAccessToken(JSON.parse(raw))}` } });
  const entries = sitesRes.ok ? (await sitesRes.json()).siteEntry ?? [] : [];
  const mine = entries.filter((e) => e.siteUrl.includes(domain)).map((e) => `${e.siteUrl}=${e.permissionLevel}`);
  console.log(`${domain}: Search Console permission ${mine.join(', ') || 'none'} (Indexing API needs siteOwner)`);
  const all = String(process.env.TARGETS ?? '').trim() === '*';
  let urls = recent
    ? (await sitemapEntries(domain)).filter((e) => e.lastmod && Date.now() - Date.parse(e.lastmod) < 26 * 3600000).map((e) => e.url)
    : all ? await sitemapUrls(domain) : matchTargets(await sitemapUrls(domain));
  if (all) {
    const lang = (u) => (/^\/[a-z]{2}\/blog\//.test(new URL(u).pathname) ? 1 : 0);
    urls = urls.filter((u) => lang(u) === pass && !(Date.now() - Date.parse(sent[u] ?? 0) < 7 * 86400000));
    console.log(`${domain}: ${urls.length} URLs not sent in the last 7 days`);
  }
  if (!urls.length) return console.log(`${domain}: no URLs to send to the Indexing API`);
  for (const url of urls) {
    if (budget <= 0) return console.log(`  daily budget used up; run again tomorrow for the rest of ${domain}`);
    const res = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
      method: 'POST',
      headers: { ...auth, 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, type: 'URL_UPDATED' }),
    });
    if (res.ok) { budget--; sent[url] = new Date().toISOString(); }
    console.log(`  Indexing API ${res.ok ? 'SENT  ' : 'FAILED'} HTTP ${res.status}  ${url}${res.ok ? '' : `  ${(await res.text()).replace(/\s+/g, ' ').slice(0, 220)}`}`);
    if (res.status === 429 || res.status === 403) break; // quota, API disabled or not an Owner: the rest would fail the same way
  }
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
  if (!String(process.env.TARGETS ?? '').trim()) return console.log(`${domain}: no TARGETS given; nothing checked (the whole site is never checked).`);
  const urls = matchTargets(await sitemapUrls(domain));
  if (!urls.length) return console.log(`${domain}: none of the targets match a blog URL`);
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
  for (const r of results) {
    const link = `https://search.google.com/search-console/inspect?resource_id=${encodeURIComponent(site)}&id=${encodeURIComponent(r.url)}`;
    console.log(`  ${r.verdict === 'PASS' ? 'INDEXED    ' : 'NOT INDEXED'}  ${r.url}  [${r.coverage ?? r.error}]  last crawl ${r.lastCrawl ?? 'never'}  ${r.verdict === 'PASS' ? '' : link}`);
  }
}

const passes = mode === '--notify' && String(process.env.TARGETS ?? '').trim() === '*' ? [0, 1] : [0];
for (pass of passes) for (const domain of domains) {
  try {
    await (mode === '--submit' ? submit(domain) : notifying ? notify(domain, mode === '--notify-recent') : check(domain));
  } catch (e) {
    console.log(`${domain}: ${mode} failed (non-fatal): ${e.message}`);
  }
}
if (notifying) {
  fs.mkdirSync(path.dirname(sentFile), { recursive: true });
  fs.writeFileSync(sentFile, JSON.stringify(sent, null, 1) + '\n');
}
