// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import siteConfig from './site.config.json' with { type: 'json' };
import { remarkAffiliateLinks } from './src/lib/remark-affiliate.mjs';
import { remarkProductFigures } from './src/lib/remark-product-figures.mjs';
import { remarkPhotos } from './src/lib/remark-photos.mjs';
import { rehypeSections } from './src/lib/rehype-sections.mjs';
import fs from 'node:fs';
import matter from 'gray-matter';

// Real last-modified dates for the sitemap: a post's updatedDate (set only when
// its content actually changes) or its pubDate. Crawlers use lastmod to decide
// what to re-fetch, so it must never be bumped without a real change.
const blogDir = new URL('./src/content/blog/', import.meta.url);
const qaDir = new URL('./data/qa/', import.meta.url);
const locales = siteConfig.locales;
const otherLangs = Object.keys(locales).filter((l) => l !== 'en');
const readPosts = (lang) => {
  const dir = lang === 'en' ? blogDir : new URL(`${lang}/`, blogDir);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith('.md')).map((f) => {
    const slug = f.replace(/\.md$/, '');
    const id = lang === 'en' ? slug : `${lang}/${slug}`;
    const { data } = matter(fs.readFileSync(new URL(f, dir), 'utf8'));
    const path = lang === 'en' ? `/blog/${slug}/` : `/${locales[lang].path}/blog/${slug}/`;
    return { lang, id, data, url: `${siteConfig.url}${path}` };
  });
};
const qaPass = (id) => {
  try { return JSON.parse(fs.readFileSync(new URL(`${id}.json`, qaDir), 'utf8')).pass === true; } catch { return false; }
};
// Same rule as src/lib/posts.ts: not a draft, pubDate passed, QA passed, in its language's folder.
const isLive = (p) => !p.data.draft && new Date(p.data.pubDate) <= new Date() && qaPass(p.id) && (p.data.lang ?? 'en') === p.lang;
const enPosts = readPosts('en');
const translated = otherLangs.flatMap(readPosts);
const lastmod = new Map(
  [...enPosts, ...translated].map((p) => [p.url, new Date(p.data.updatedDate ?? p.data.pubDate)]),
);
const newest = new Date(Math.max(...[...lastmod.values()].filter((d) => d <= new Date()).map(Number)));

// hreflang alternates for the sitemap: every live language version of an English
// post (English included) lists all of them, plus x-default = English.
const liveEn = new Map(enPosts.filter(isLive).map((p) => [p.id, p]));
const alternates = new Map();
for (const [enId, en] of liveEn) {
  const versions = translated.filter((p) => p.data.translationOf === enId && isLive(p));
  if (!versions.length) continue;
  const links = [en, ...versions].map((p) => ({ lang: locales[p.lang].hreflang, url: p.url }));
  links.push({ lang: 'x-default', url: en.url });
  for (const p of [en, ...versions]) alternates.set(p.url, links);
}
// Language homes and listings stay out of the sitemap (noindex) until that language has a live post.
const emptyLangs = otherLangs.filter((l) => !translated.some((p) => p.lang === l && isLive(p)));
const isEmptyLangPage = (page) => emptyLangs.some((l) => new RegExp(`^https?://[^/]+/${locales[l].path}/(blog/)?$`).test(page));

export default defineConfig({
  site: siteConfig.url,
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/search/') && !isEmptyLangPage(page),
      serialize(item) {
        const links = alternates.get(item.url);
        if (links) item.links = links;
        const d = lastmod.get(item.url);
        if (d) item.lastmod = d.toISOString();
        else if (/\/(blog|category)\/|^https?:\/\/[^/]+\/$/.test(item.url)) item.lastmod = newest.toISOString();
        return item;
      },
    }),
  ],
  markdown: {
    remarkPlugins: [remarkProductFigures, remarkPhotos, remarkAffiliateLinks],
    rehypePlugins: [rehypeSections],
    shikiConfig: { theme: 'github-light' },
  },
});
