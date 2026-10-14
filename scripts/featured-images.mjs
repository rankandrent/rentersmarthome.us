// Generates a branded 1200×630 featured image for every post that lacks one,
// and records it in the post's frontmatter (`heroImage`, `heroAlt`).
// Used as the article hero, the card thumbnail, og:image and schema image.
//
//   node scripts/featured-images.mjs            # only missing images
//   node scripts/featured-images.mjs --force    # regenerate all
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { ROOT, SITE } from '../agents/lib/config.mjs';
import { listPosts, writePost } from '../agents/lib/store.mjs';

const OUT_DIR = path.join(ROOT, 'public/images/featured');
const font = (pkg, file) => fs.readFileSync(path.join(ROOT, 'node_modules/@fontsource', pkg, 'files', file));
const FONTS = [
  { name: 'Bricolage', data: font('bricolage-grotesque', 'bricolage-grotesque-latin-800-normal.woff'), weight: 800, style: 'normal' },
  { name: 'Bricolage', data: font('bricolage-grotesque', 'bricolage-grotesque-latin-700-normal.woff'), weight: 700, style: 'normal' },
  { name: 'Serif', data: font('source-serif-4', 'source-serif-4-latin-400-normal.woff'), weight: 400, style: 'normal' },
];

const C = { drywall: '#f3f4f1', paper: '#ffffff', ink: '#1b2430', slate: '#56606e', rule: '#d8dcd6', tape: '#2f7bd8', tapeInk: '#174a8b' };

// Same line icons as src/components/Icon.astro.
const ICONS = {
  lock: '<rect x="5" y="10" width="14" height="10" rx="2.5"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/><circle cx="12" cy="15" r="1.4" fill="currentColor"/>',
  camera: '<path d="M4 7h11a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z"/><path d="M17 11l5-3v8l-5-3"/><circle cx="9.5" cy="12" r="2.2"/>',
  thermo: '<path d="M10 14.5V5a2 2 0 1 1 4 0v9.5a4 4 0 1 1-4 0z"/><path d="M12 9v7"/><circle cx="12" cy="17.5" r="1.3" fill="currentColor"/>',
  bulb: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1 2V16h5.2v-.2c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z"/>',
  plug: '<path d="M9 2v5M15 2v5"/><path d="M6 7h12v4a6 6 0 0 1-12 0V7z"/><path d="M12 17v5"/>',
  hub: '<circle cx="12" cy="12" r="3"/><path d="M6.3 6.3a8 8 0 0 0 0 11.4M17.7 6.3a8 8 0 0 1 0 11.4M3.5 3.5a12 12 0 0 0 0 17M20.5 3.5a12 12 0 0 1 0 17"/>',
  home: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-5h4v5"/>',
  shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/><path d="M9 12l2 2 4-4"/>',
  drop: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
  box: '<path d="M3 7l9-4 9 4v10l-9 4-9-4V7z"/><path d="M3 7l9 4 9-4M12 11v10"/>',
  desk: '<rect x="3" y="4" width="18" height="11" rx="1.5"/><path d="M8 20h8M12 15v5"/>',
  paw: '<circle cx="7" cy="10" r="1.8"/><circle cx="11" cy="6.5" r="1.8"/><circle cx="16" cy="7.5" r="1.8"/><circle cx="18.5" cy="12" r="1.8"/><path d="M8 17.5c0-2.5 2-4.5 4.5-4.5s4 2 4 4c0 1.7-1.3 2.5-2.8 2.5-1 0-1.4-.5-2.2-.5s-1.3.5-2.3.5C9.2 19.5 8 18.8 8 17.5z"/>',
  check: '<path d="M20 6L9 17l-5-5"/>',
};
const CATEGORY_ICON = {
  'smart-locks': 'lock', security: 'camera', climate: 'thermo', lighting: 'bulb', 'plugs-power': 'plug', 'hubs-voice': 'hub', guides: 'home',
  'baby-proofing': 'shield', 'kitchen-bath': 'drop', 'storage-decor': 'box', 'home-office': 'desk', pets: 'paw',
};
const TYPE_LABEL = { roundup: 'Buying guide', review: 'Review', comparison: 'Comparison', 'how-to': 'How-to', guide: 'Renter guide' };

const svgUri = (inner, color, stroke = 1.6) =>
  `data:image/svg+xml;base64,${Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${color}" color="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`,
  ).toString('base64')}`;
const LOGO = `data:image/svg+xml;base64,${Buffer.from(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="6" fill="#1b2430"/><path d="M9 19.5L20 11l11 8.5" stroke="#f3f4f1" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.5 18v11h15V18" stroke="#f3f4f1" stroke-width="2.6" fill="none" stroke-linejoin="round"/><rect x="6" y="30.5" width="28" height="5" fill="#2f7bd8" transform="rotate(-3 20 33)"/></svg>',
).toString('base64')}`;

const h = (type, style, children) => ({ type, props: { style: { display: 'flex', ...style }, children } });
const img = (src, w, ht, style = {}) => ({ type: 'img', props: { src, width: w, height: ht, style } });

function hash(s) {
  let x = 0;
  for (const ch of s) x = (x * 31 + ch.charCodeAt(0)) >>> 0;
  return x;
}

function layout({ title, category, articleType, slug, kicker, label, iconName }) {
  const catName = kicker ?? SITE.categories.find((c) => c.slug === category)?.name ?? 'Renter guides';
  const icon = ICONS[iconName ?? CATEGORY_ICON[category]] ?? ICONS.home;
  const tilt = (hash(slug) % 2 ? 1 : -1) * (2 + (hash(slug) % 3));
  const size = title.length > 64 ? 52 : title.length > 46 ? 58 : 66;
  const text = (t, style = {}) => h('div', style, t);

  return h('div', { width: 1200, height: 630, background: C.drywall, fontFamily: 'Bricolage', position: 'relative' }, [
    // Left: text column
    h('div', { position: 'absolute', left: 72, top: 60, width: 660, height: 510, flexDirection: 'column', justifyContent: 'space-between' }, [
      h('div', { alignItems: 'center', color: C.tapeInk, fontSize: 26, fontWeight: 700 }, [img(svgUri(icon, C.tapeInk, 2), 34, 34, { marginRight: 12 }), text(catName)]),
      text(title, { fontSize: size, fontWeight: 800, color: C.ink, lineHeight: 1.06, letterSpacing: '-0.03em' }),
      h('div', { alignItems: 'center', fontSize: 26, fontWeight: 700, color: C.ink }, [
        img(LOGO, 44, 44, { marginRight: 14 }),
        text('RenterSmartHome'),
        text(SITE.domain, { fontFamily: 'Serif', fontWeight: 400, color: C.slate, fontSize: 24, marginLeft: 16 }),
      ]),
    ]),
    // Right: lease-paper card with the category drawing and a tape strip
    h('div', { position: 'absolute', left: 820, top: 110, width: 300, height: 400, background: C.paper, border: `2px solid ${C.rule}`, transform: `rotate(${tilt}deg)`, flexDirection: 'column', padding: '58px 26px 26px' }, [
      h('div', { justifyContent: 'space-between', fontFamily: 'Serif', fontSize: 17, color: C.slate, borderBottom: `2px solid ${C.rule}`, paddingBottom: 10, width: 248 }, [text('Renter-approved'), text('No drilling')]),
      h('div', { flexGrow: 1, alignItems: 'center', justifyContent: 'center' }, [img(svgUri(icon, C.ink, 1.3), 190, 190)]),
    ]),
    text(label ?? TYPE_LABEL[articleType] ?? 'Guide', { position: 'absolute', left: 860, top: 86, background: C.tape, color: '#fff', fontSize: 26, fontWeight: 700, padding: '12px 26px', transform: `rotate(${-tilt - 1}deg)` }),
  ]);
}

export async function renderFeatured(post, { dir = OUT_DIR, urlBase = '/images/featured' } = {}) {
  const svg = await satori(layout(post), { width: 1200, height: 630, fonts: FONTS });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, `${post.slug}.png`), png);
  return `${urlBase}/${post.slug}.png`;
}

/** Share images for non-article pages (home, categories, tools). */
export async function renderPageImages() {
  const dir = path.join(ROOT, 'public/images/og');
  const pages = [
    { slug: 'home', title: 'Smart home gear your lease already allows', kicker: SITE.tagline ? 'Renter-friendly smart home' : 'RenterSmartHome', label: 'No drilling', iconName: 'home' },
    { slug: 'renter-checklist', title: `The ${SITE.name} Checklist: smart home setup for renters`, kicker: 'Free renter tool', label: 'Checklist', iconName: 'check' },
    { slug: 'blog', title: 'Every renter-friendly smart home guide', kicker: 'All guides', label: 'Guides', iconName: 'home' },
    ...SITE.categories.map((c) => ({ slug: `category-${c.slug}`, title: `${c.name} for renters`, kicker: c.name, category: c.slug, label: 'Category' })),
  ];
  for (const p of pages) await renderFeatured(p, { dir, urlBase: '/images/og' });
  return pages.length;
}

/** Generate (if missing) and attach the featured image to a post's frontmatter. */
export async function ensureFeatured({ slug, file, data, content }, { force = false } = {}) {
  const target = path.join(OUT_DIR, `${slug}.png`);
  if (!force && fs.existsSync(target) && data.heroImage) return false;
  const url = await renderFeatured({ slug, title: data.title, category: data.category, articleType: data.articleType });
  writePost(slug, { ...data, heroImage: url, heroAlt: `${data.title}: RenterSmartHome ${TYPE_LABEL[data.articleType]?.toLowerCase() ?? 'guide'}` }, content);
  return true;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const force = process.argv.includes('--force');
  let n = 0;
  for (const post of listPosts()) if (await ensureFeatured(post, { force })) n++;
  console.log(`featured images: ${n} generated`);
  if (process.argv.includes('--pages')) console.log(`page share images: ${await renderPageImages()}`);
}
