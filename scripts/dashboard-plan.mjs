// Forecast of the next days' posts for one site repo, for the "Site Agent Flow" dashboard.
// usage: node scripts/dashboard-plan.mjs <site-repo-dir> [days=5]
// Uses the site's own rules: the date-seeded daily quota and release times (agents/lib/schedule.mjs)
// and the keyword picker (nextKeyword in agents/orchestrator.mjs), run on a copy of the queue.
// It is a forecast: a keyword whose research turns out too weak is skipped on the day and the next one moves up.
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const dir = path.resolve(process.argv[2] || '.');
const days = Number(process.argv[3] || 5);
const imp = (p) => import(pathToFileURL(path.join(dir, p)).href);
const { localNow, quotaFor, releaseTimes } = await imp('agents/lib/schedule.mjs');
const { loadQueue, loadState } = await imp('agents/lib/store.mjs');
const { nextKeyword } = await imp('agents/orchestrator.mjs');
const { funnelOf } = await imp('agents/lib/funnel.mjs');

const queue = structuredClone(loadQueue());
const state = structuredClone(loadState());
const now = localNow();
const start = state.startDate ?? now.date;
const plan = [];
for (let i = 0; i < days; i++) {
  const date = new Date(Date.parse(`${now.date}T12:00:00Z`) + i * 86400000).toISOString().slice(0, 10);
  const q = quotaFor(date, start);
  const done = state.published.filter((p) => p.date === date).length;
  const times = releaseTimes(date, q.quota).map((t) => new Date(t).toISOString());
  const day = { date, quota: q.quota, published: done, posts: [] };
  for (let n = done; n < q.quota; n++) {
    const item = nextKeyword(queue, state);
    if (!item) break;
    item.status = 'planned';
    state.published.push({ date, slug: item.slug, keyword: item.keyword, category: item.category, funnel: funnelOf(item) });
    const a = item.ahrefs ?? {};
    day.posts.push({
      time: times[n] ?? null, keyword: item.keyword, title: item.workingTitle ?? null, slug: item.slug,
      volume: typeof a.volume === 'number' ? a.volume : null, kd: typeof a.kd === 'number' ? a.kd : null,
      trafficPotential: a.trafficPotential ?? null, notInAhrefs: a.notInDatabase === true, proxy: a.proxy ? { keyword: a.proxy.keyword ?? null, volume: a.proxy.volume ?? null } : null,
      category: item.category ?? null, articleType: item.articleType ?? null, intent: item.intent ?? null, funnel: funnelOf(item),
      secondary: (item.secondaryKeywords ?? []).length, source: item.source === 'user' ? 'owner' : (item.source ?? 'research'), painPoints: item.painPoints ?? [], competitor: item.competitor?.domain ?? null,
    });
  }
  plan.push(day);
}
console.log(JSON.stringify(plan));
