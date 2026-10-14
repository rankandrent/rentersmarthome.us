import { amazonUrl, AFFILIATE_REL } from './affiliate.mjs';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const textOf = (node) => (node.value ?? '') + (node.children ?? []).map(textOf).join('');
const tokens = (s) => new Set(s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').split(' ').filter(Boolean));

/** A heading matches a product if it contains the full name, or if every word of
 *  its subject (the part before ":") appears in the product name, e.g.
 *  "Tapo P125M: best budget" → "Tapo Mini Smart Wi-Fi Plug with Matter (P125M)". */
function matches(headingText, name) {
  const h = headingText.toLowerCase();
  if (h.includes(name.toLowerCase())) return true;
  const subject = [...tokens(h.split(':')[0])];
  const nameTokens = tokens(name);
  return subject.length >= 2 && subject.every((t) => nameTokens.has(t));
}

/** Credit line shown under every product photo. */
export function imageCredit(p) {
  const via = p.brand && !/^amazon$/i.test(p.brand) ? `${p.brand} via ` : '';
  return `Image: ${via}Amazon.com`;
}

/** Product block in the style of a magazine buying guide: gallery of official
 *  Amazon photos with a credit line, a buy button, and what we like / don't like. */
export function productBlockHtml(p, { badge = false } = {}) {
  const href = esc(amazonUrl({ asin: p.asin, query: p.query }));
  const imgs = [p.image, ...(p.gallery ?? [])].filter((x) => x?.url);
  const main = imgs[0];
  const thumbs = imgs.length > 1
    ? `<div class="pg-thumbs" role="list">${imgs.map((im, n) =>
        `<button type="button" role="listitem" class="pg-thumb${n === 0 ? ' is-on' : ''}" data-src="${esc(im.url)}" aria-label="Show photo ${n + 1} of ${esc(p.name)}">` +
        `<img src="${esc(im.url)}" alt="" width="64" height="64" loading="lazy" decoding="async" /></button>`).join('')}</div>`
    : '';
  const like = (p.pros ?? []).map((x) => `<li>${esc(x)}</li>`).join('');
  const dislike = (p.cons ?? []).map((x) => `<li>${esc(x)}</li>`).join('');
  return (
    `<div class="pblock">` +
    (badge ? `<p class="pblock-badge">${esc(p.badge)}</p>` : '') +
    (main
      ? `<figure class="pgallery"><a class="pg-main" href="${href}" rel="${AFFILIATE_REL}" target="_blank">` +
        `<img src="${esc(main.url)}" alt="${esc(p.name)}" width="${main.width ?? 500}" height="${main.height ?? 500}" loading="lazy" decoding="async" /></a>` +
        thumbs +
        `<figcaption>${esc(p.name)}. <span class="credit">${esc(imageCredit(p))}</span></figcaption></figure>`
      : '') +
    `<a class="btn btn-buy pblock-cta" href="${href}" rel="${AFFILIATE_REL}" target="_blank">Check price on Amazon</a>` +
    ((like || dislike)
      ? `<div class="likes"><div class="like"><p class="likes-h">What we like</p><ul>${like}</ul></div>` +
        `<div class="dislike"><p class="likes-h">What we don't like</p><ul>${dislike}</ul></div></div>`
      : '') +
    `<p class="pblock-renter"><b>Renter note:</b> ${esc(p.renterNote)}</p>` +
    `</div>`
  );
}

/**
 * Image–text alignment: when a "### Product name" heading in the body matches a
 * product from frontmatter, insert that product's block (photos, credit, buy
 * button, likes/dislikes) directly under the heading, so each image sits in the
 * same block as the text that describes it. The names placed in the body are
 * exposed as `productsInBody` so the page only renders cards for the rest.
 */
export function remarkProductFigures() {
  return (tree, file) => {
    const fm = file.data?.astro?.frontmatter;
    const products = fm?.products ?? [];
    const used = new Set();
    for (let i = 0; i < tree.children.length; i++) {
      const node = tree.children[i];
      if (node.type !== 'heading' || node.depth !== 3) continue;
      const heading = textOf(node);
      const p = products.find((x) => !used.has(x.name) && matches(heading, x.name));
      if (!p) continue;
      used.add(p.name);
      node.data = { ...node.data, hProperties: { ...(node.data?.hProperties ?? {}), id: `pick-${p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}` } };
      tree.children.splice(i + 1, 0, { type: 'html', value: productBlockHtml(p) });
      i++;
    }
    if (fm) fm.productsInBody = [...used];
  };
}
