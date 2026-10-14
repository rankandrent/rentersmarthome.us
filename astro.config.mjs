// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import siteConfig from './site.config.json' with { type: 'json' };
import { remarkAffiliateLinks } from './src/lib/remark-affiliate.mjs';
import { remarkProductFigures } from './src/lib/remark-product-figures.mjs';
import { rehypeSections } from './src/lib/rehype-sections.mjs';
import fs from 'node:fs';
import matter from 'gray-matter';

// Real last-modified dates for the sitemap: a post's updatedDate (set only when
// its content actually changes) or its pubDate. Crawlers use lastmod to decide
// what to re-fetch, so it must never be bumped without a real change.
const blogDir = new URL('./src/content/blog/', import.meta.url);
const lastmod = new Map(
  fs.readdirSync(blogDir).filter((f) => f.endsWith('.md')).map((f) => {
    const { data } = matter(fs.readFileSync(new URL(f, blogDir), 'utf8'));
    return [`${siteConfig.url}/blog/${f.replace(/\.md$/, '')}/`, new Date(data.updatedDate ?? data.pubDate)];
  }),
);
const newest = new Date(Math.max(...[...lastmod.values()].filter((d) => d <= new Date()).map(Number)));

export default defineConfig({
  site: siteConfig.url,
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/search/'),
      serialize(item) {
        const d = lastmod.get(item.url);
        if (d) item.lastmod = d.toISOString();
        else if (/\/(blog|category)\/|^https?:\/\/[^/]+\/$/.test(item.url)) item.lastmod = newest.toISOString();
        return item;
      },
    }),
  ],
  markdown: {
    remarkPlugins: [remarkProductFigures, remarkAffiliateLinks],
    rehypePlugins: [rehypeSections],
    shikiConfig: { theme: 'github-light' },
  },
});
