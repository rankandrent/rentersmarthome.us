import { amazonUrl, AFFILIATE_REL } from './affiliate.mjs';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const textOf = (node) => (node.value ?? '') + (node.children ?? []).map(textOf).join('');

/**
 * Image–text alignment: when a "### Product name" heading in the body matches a
 * product from frontmatter that has an Amazon image, insert that product's photo
 * with a descriptive caption directly under the heading, so each image sits in
 * the same block as the text that describes it.
 */
export function remarkProductFigures() {
  return (tree, file) => {
    const products = file.data?.astro?.frontmatter?.products ?? [];
    const withImg = products.filter((p) => p.image?.url);
    if (!withImg.length) return;
    const used = new Set();
    for (let i = 0; i < tree.children.length; i++) {
      const node = tree.children[i];
      if (node.type !== 'heading' || node.depth !== 3) continue;
      const heading = textOf(node).toLowerCase();
      const p = withImg.find((x) => !used.has(x.name) && heading.includes(x.name.toLowerCase()));
      if (!p) continue;
      used.add(p.name);
      const href = amazonUrl({ asin: p.asin, query: p.query });
      tree.children.splice(i + 1, 0, {
        type: 'html',
        value:
          `<figure class="product-figure"><a href="${esc(href)}" rel="${AFFILIATE_REL}" target="_blank">` +
          `<img src="${esc(p.image.url)}" alt="${esc(p.name)}" width="${p.image.width ?? 500}" height="${p.image.height ?? 500}" loading="lazy" decoding="async" /></a>` +
          `<figcaption>${esc(p.name)}: ${esc(p.badge)}. ${esc(p.renterNote)}</figcaption></figure>`,
      });
      i++;
    }
  };
}
