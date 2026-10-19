// After each deploy: tell search engines about new/updated posts.
// 1. IndexNow (Bing, Yandex, Seznam, Naver…): submits recently published or
//    updated post URLs. No account needed; the key file lives in /public.
// 2. Google Search Console API: resubmits the sitemap so Google picks up new
//    URLs quickly. Needs GSC_SERVICE_ACCOUNT_JSON (a service account added as
//    an Owner of the Search Console property). Google's Indexing API is NOT
//    used: Google only permits it for job-posting and livestream pages.
// Failures are logged, never fatal: indexing pings must not break deploys.
import { SITE } from '../agents/lib/config.mjs';
import { listPosts, listTranslations } from '../agents/lib/store.mjs';
import { googleAccessToken } from '../agents/lib/google.mjs';

const { indexNowKey, gscSiteUrl, recentDays } = SITE.indexing;
const host = new URL(SITE.url).host;

function recentUrls() {
  const cutoff = Date.now() - recentDays * 86400000;
  const urls = listPosts()
    .filter((p) => !p.data.draft && Date.parse(p.data.pubDate) <= Date.now())
    .filter((p) => Math.max(Date.parse(p.data.pubDate), Date.parse(p.data.updatedDate ?? 0) || 0, Date.parse(p.data.reviewedDate ?? 0) || 0) >= cutoff)
    .map((p) => `${SITE.url}/blog/${p.slug}/`);
  // Translated posts live at /<lang>/blog/<slug>/ and need their own ping.
  const translated = listTranslations()
    .filter((p) => !p.data.draft && Date.parse(p.data.pubDate) <= Date.now())
    .filter((p) => Math.max(Date.parse(p.data.pubDate), Date.parse(p.data.updatedDate ?? 0) || 0) >= cutoff)
    .map((p) => `${SITE.url}/${p.lang}/blog/${p.slug}/`);
  return [...new Set([`${SITE.url}/`, `${SITE.url}/blog/`, ...urls, ...translated])];
}

async function indexNow(urlList) {
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host, key: indexNowKey, keyLocation: `${SITE.url}/${indexNowKey}.txt`, urlList }),
    signal: AbortSignal.timeout(20000),
  });
  console.log(`IndexNow: HTTP ${res.status} for ${urlList.length} URLs`);
}

async function submitSitemap() {
  const raw = process.env.GSC_SERVICE_ACCOUNT_JSON;
  if (!raw) return console.log('Search Console: GSC_SERVICE_ACCOUNT_JSON not set; skipping sitemap submit.');
  const sa = JSON.parse(raw);
  const token = await googleAccessToken(sa);
  const sitemap = `${SITE.url}/sitemap-index.xml`;
  const url = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(gscSiteUrl)}/sitemaps/${encodeURIComponent(sitemap)}`;
  const res = await fetch(url, { method: 'PUT', headers: { Authorization: `Bearer ${token}` } });
  console.log(`Search Console sitemap submit (${gscSiteUrl}): HTTP ${res.status} ${res.ok ? '' : (await res.text()).slice(0, 300)}`);
}

const urls = recentUrls();
console.log('Recent URLs:', urls.join(' '));
for (const [name, fn] of [['IndexNow', () => indexNow(urls)], ['Search Console', submitSitemap]]) {
  try {
    await fn();
  } catch (e) {
    console.log(`${name} failed (non-fatal): ${e.message}`);
  }
}
