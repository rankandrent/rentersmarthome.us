// Did trimming help? Compares Search Console numbers of each trimmed post (data/trimmed.json in the
// site repo) before the trim and 4+ weeks after it, against the untrimmed posts of the same site over
// the same two snapshots (the control group). Snapshots come from data/gsc/<domain>/ (gsc-snapshot.mjs).
//   node scripts/trim-report.mjs <site-repo-dir> <domain>
//   e.g. node scripts/trim-report.mjs ../best-tripod.com best-tripod.com
import fs from 'node:fs';
import path from 'node:path';
import { DATA_DIR } from '../agents/lib/config.mjs';

const [repo = '.', domain] = process.argv.slice(2);
if (!domain) throw new Error('usage: node scripts/trim-report.mjs <site-repo-dir> <domain>');
const readJson = (f, fallback) => { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch { return fallback; } };
const trimmed = readJson(path.join(repo, 'data', 'trimmed.json'), {});
const dir = path.join(DATA_DIR, 'gsc', domain);
const snaps = (fs.existsSync(dir) ? fs.readdirSync(dir) : []).filter((f) => f.endsWith('.json')).sort()
  .map((f) => readJson(path.join(dir, f)));
if (!snaps.length) {
  console.log(JSON.stringify({ domain, note: 'no Search Console snapshots yet (GSC_SERVICE_ACCOUNT_JSON secret + weekly gsc-snapshot workflow)' }, null, 2));
  process.exit(0);
}
const slugOf = (url) => (new URL(url).pathname.match(/^\/blog\/([^/]+)\/?$/) ?? [])[1];
const bySlug = (snap) => new Map(snap.rows.map((r) => [slugOf(r.page), r]).filter(([s]) => s));
const DAY = 86400000;
const delta = (a, b) => ({
  clicks: (b?.clicks ?? 0) - (a?.clicks ?? 0),
  impressions: (b?.impressions ?? 0) - (a?.impressions ?? 0),
  ctr: +(((b?.ctr ?? 0) - (a?.ctr ?? 0)) * 100).toFixed(2),
  // Lower is better; positive = moved up.
  positionGain: a?.position && b?.position ? +(a.position - b.position).toFixed(1) : null,
});
const median = (xs) => { const v = xs.filter((x) => x != null).sort((a, b) => a - b); return v.length ? v[Math.floor(v.length / 2)] : null; };

const posts = Object.entries(trimmed).map(([slug, t]) => {
  const at = Date.parse(t.at);
  // Before = last window that ended before the trim; after = first full 28-day window after it.
  const before = [...snaps].reverse().find((s) => Date.parse(s.endDate) <= at);
  const after = snaps.find((s) => Date.parse(s.startDate) >= at) ?? null;
  if (!before) return { slug, trimmedAt: t.at, note: t.note, status: 'no snapshot from before the trim' };
  if (!after) return { slug, trimmedAt: t.at, note: t.note, status: `waiting: first full window after the trim ends ${new Date(at + 31 * DAY).toISOString().slice(0, 10)}`, before: bySlug(before).get(slug) ?? null };
  const [b, a] = [bySlug(before), bySlug(after)];
  const control = [...new Set([...b.keys(), ...a.keys()])].filter((s) => !trimmed[s]).map((s) => delta(b.get(s), a.get(s)));
  return {
    slug, trimmedAt: t.at, note: t.note, windows: [`${before.startDate}..${before.endDate}`, `${after.startDate}..${after.endDate}`],
    before: b.get(slug) ?? null, after: a.get(slug) ?? null, change: delta(b.get(slug), a.get(slug)),
    controlMedian: { clicks: median(control.map((c) => c.clicks)), impressions: median(control.map((c) => c.impressions)), positionGain: median(control.map((c) => c.positionGain)), posts: control.length },
  };
});
console.log(JSON.stringify({ domain, snapshots: snaps.map((x) => x.endDate), posts }, null, 2));
