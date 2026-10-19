// Builds the "Site Agent Flow" dashboard documents from the three site repos.
// usage: node scripts/dashboard-sync.mjs <out-dir>
// Writes <out>/site-<domain>.json (stats, the 5-day plan from dashboard-plan.mjs, every post EN and translations) and <out>/agents/<domain>__<agent>.json.
// Then send them to the dashboard artifact's db with ArtifactData set (collections "sites" and "agents").
import fs from 'node:fs'; import path from 'node:path'; import { createRequire } from 'node:module'; import { execSync } from 'node:child_process';
const require = createRequire(import.meta.url);
const OUT = process.argv[2] || 'dashboard-out';
fs.mkdirSync(OUT, { recursive: true });
const matter = require('gray-matter');
const SITES = [
  { id: 'rentersmarthome', name: 'RenterSmartHome', dir: '/home/user/rentersmarthome.us', url: 'https://rentersmarthome.us' },
  { id: 'best-tripod', name: 'Best Tripod', dir: '/home/user/best-tripod.com', url: 'https://best-tripod.com' },
  { id: 'best-safe', name: 'Best Safe', dir: '/home/user/best-safe.com', url: 'https://best-safe.com' },
];
const now = Date.now(); const out = [];
for (const s of SITES) {
  const base = path.join(s.dir, 'src/content/blog');
  const files = [];
  for (const f of fs.readdirSync(base)) {
    const p = path.join(base, f);
    if (fs.statSync(p).isDirectory()) {
      for (const g of fs.readdirSync(p)) if (g.endsWith('.md')) files.push([f, g, path.join(p, g)]);
    } else if (f.endsWith('.md')) files.push(['en', f, p]);
  }
  for (const [lang, f, p] of files) {
    const { data: d } = matter(fs.readFileSync(p, 'utf8'));
    if (d.draft) continue;
    const slug = f.replace(/\.md$/, '');
    const qaP = path.join(s.dir, 'data/qa', lang === 'en' ? '' : lang, slug + '.json');
    let qa = null; try { qa = JSON.parse(fs.readFileSync(qaP, 'utf8')); } catch {}
    const pub = new Date(d.pubDate).toISOString();
    out.push({
      id: `${s.id}__${lang}__${slug}`.slice(0, 200), site: s.id, lang, slug,
      title: d.title, keyword: d.keyword ?? null, category: d.category ?? null,
      url: `${s.url}${lang === 'en' ? '' : '/' + lang}/blog/${slug}/`,
      pubDate: pub, status: Date.parse(pub) <= now ? 'live' : 'scheduled',
      picks: Array.isArray(d.products) ? d.products.length : null,
      translationOf: d.translationOf ?? null, reviewedBy: d.reviewedBy ?? null,
      qa: qa ? (qa.pass ? 'pass' : 'fail') : null, qaAt: qa?.checkedAt ?? null,
      warnings: qa?.warnings?.length ?? 0,
    });
  }
}
const posts = out;

// Next daily run (America/New_York wall time) as ISO.
function nextRun(h, m) {
  const now = new Date();
  for (let i = 0; i < 3; i++) {
    const day = new Date(now.getTime() + i * 86400000).toLocaleDateString('en-CA', { timeZone: 'America/New_York' });
    for (const off of [4, 5]) {
      const t = new Date(`${day}T${String(h + off).padStart(2, '0')}:${String(m).padStart(2, '0')}:00Z`);
      const ny = t.toLocaleTimeString('en-GB', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit' });
      if (ny === `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}` && t > now) return t.toISOString();
    }
  }
  return null;
}
const SEED = [
  { id: 'rentersmarthome', domain: 'rentersmarthome.us', name: 'RenterSmartHome', dir: '/home/user/rentersmarthome.us', nextRun: nextRun(8, 50), langs: ['de', 'es', 'nl'] },
  { id: 'best-tripod', domain: 'best-tripod.com', name: 'Best Tripod', dir: '/home/user/best-tripod.com', nextRun: nextRun(9, 17), langs: ['de', 'es', 'nl'] },
  { id: 'best-safe', domain: 'best-safe.com', name: 'Best Safe', dir: '/home/user/best-safe.com', nextRun: nextRun(9, 41), langs: [] },
];
const git = (dir, p) => { try { return execSync(`git -C ${dir} log -1 --format=%cI -- ${p}`).toString().trim() || null; } catch { return null; } };
const stamp = new Date().toISOString();
const agents = [];
for (const s of SEED) {
  const st = JSON.parse(execSync(`cd ${s.dir} && node scripts/routine.mjs status`).toString());
  const mine = posts.filter((p) => p.site === s.id).map(({ id, site, ...p }) => p).sort((a, b) => b.pubDate.localeCompare(a.pubDate));
  const en = mine.filter((p) => p.lang === 'en'); const tr = mine.filter((p) => p.lang !== 'en');
  let plan = [];
  try { plan = JSON.parse(execSync(`node ${path.join(path.dirname(new URL(import.meta.url).pathname), 'dashboard-plan.mjs')} ${s.dir} 5`).toString()); } catch (e) { console.error(`plan for ${s.domain} failed: ${e.message}`); }
  const doc = { plan, name: s.name, domain: s.domain, quotaToday: st.quotaToday, publishedToday: st.publishedToday, remainingToday: st.remainingToday,
    pendingKeywords: st.pendingKeywords, nextRun: s.nextRun, langs: s.langs, posts: mine, updatedAt: stamp };
  fs.writeFileSync(path.join(OUT, `site-${s.domain}.json`), JSON.stringify(doc));
  const lastQa = en.filter((p) => p.qaAt).sort((a, b) => b.qaAt.localeCompare(a.qaAt))[0];
  const a = (agent, model, lastAt, task, note) => agents.push({ op: 'set', collection: 'agents', doc_id: `${s.domain}__${agent}`,
    data: { site: s.domain, agent, model, state: 'idle', task: task ?? null, note: note ?? null, lastAt: lastAt ?? null, nextAt: s.nextRun, updatedAt: stamp } });
  a('keyword', 'sonnet', git(s.dir, 'data/keywords.json'), null, `${st.pendingKeywords} keywords queued`);
  let comp = null;
  try { comp = JSON.parse(fs.readFileSync(path.join(s.dir, 'data/competitors.json'), 'utf8')); } catch {}
  const compDomains = Object.entries(comp?.domains ?? {});
  const compAdded = compDomains.reduce((n, [, d]) => n + (d.keywordsAdded?.length ?? 0), 0);
  a('competitor', 'sonnet', git(s.dir, 'data/competitors.json'), null, comp ? `${compDomains.length} weak sites checked (DR ≤ 30), ${compAdded} keywords taken from them` : 'not run yet');
  let pains = 0, uncovered = 0;
  try { const pp = JSON.parse(fs.readFileSync(path.join(s.dir, 'data/pain-points.json'), 'utf8')); for (const list of Object.values(pp.categories ?? {})) { pains += list.length; uncovered += list.filter((x) => !(x.coveredBy ?? []).length).length; } } catch {}
  a('painpoint', 'sonnet', git(s.dir, 'data/pain-points.json'), null, pains ? `${pains} pain points stored, ${uncovered} not yet answered by a post` : 'no pain points collected yet');
  a('product', 'sonnet', git(s.dir, 'data/briefs'), en[0]?.slug, en[0] ? `${en[0].picks ?? '?'} products verified for the last post` : null);
  a('brief', 'sonnet', git(s.dir, 'data/briefs'), en[0]?.slug, 'SERP structure + SERP titles');
  a('writer', 'opus', en[0]?.pubDate, en[0]?.slug, en[0]?.title);
  a('qa', 'sonnet', lastQa?.qaAt, lastQa?.slug, lastQa ? `QA ${lastQa.qa} · ${lastQa.warnings} warnings` : null);
  a('publisher', 'haiku', en[0]?.pubDate, en[0]?.slug, en[0] ? 'live: ' + en[0].url : null);
  if (s.langs.length) a('translator', 'opus', tr[0]?.pubDate, tr[0]?.slug, tr[0] ? `${tr[0].lang.toUpperCase()}: ${tr[0].title}` : null);
  else agents.push({ op: 'set', collection: 'agents', doc_id: `${s.domain}__translator`, data: { site: s.domain, agent: 'translator', model: 'opus', state: 'off', task: null,
    note: 'Off until the English posts are indexed and earning', lastAt: null, nextAt: null, updatedAt: stamp } });
}
fs.mkdirSync(path.join(OUT, 'agents'), { recursive: true });
for (const x of agents) fs.writeFileSync(path.join(OUT, 'agents', x.doc_id + '.json'), JSON.stringify(x.data));
console.log(`wrote ${OUT}: 3 site docs (${posts.length} posts) and ${agents.length} agent docs`);
