// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import siteConfig from './site.config.json' with { type: 'json' };
import { remarkAffiliateLinks } from './src/lib/remark-affiliate.mjs';
import { remarkProductFigures } from './src/lib/remark-product-figures.mjs';
import { rehypeSections } from './src/lib/rehype-sections.mjs';

export default defineConfig({
  site: siteConfig.url,
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],
  markdown: {
    remarkPlugins: [remarkProductFigures, remarkAffiliateLinks],
    rehypePlugins: [rehypeSections],
    shikiConfig: { theme: 'github-light' },
  },
});
