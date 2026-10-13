// ORCHESTRATOR — the "agentic AI" coordinator.
// goal (today's publishing quota) → keyword agent (keeps the queue full)
//   → product agent → semantic writer → SEO/internal-linking agent → shipped.
//
// Usage:
//   node agents/orchestrator.mjs              publish whatever is due right now
//   node agents/orchestrator.mjs --dry-run    show the plan, call no agents
//   node agents/orchestrator.mjs --force 2    publish 2 posts now, ignoring the schedule
import { fileURLToPath } from 'node:url';
import { SITE, log } from './lib/config.mjs';
import { loadQueue, saveQueue, loadState, saveState, listPosts, postExists, writePost, saveReport } from './lib/store.mjs';
import { localNow, dueNow } from './lib/schedule.mjs';
import { readingTime } from './lib/nlp.mjs';
import { runKeywordAgent } from './keyword-agent.mjs';
import { runProductAgent } from './product-agent.mjs';
import { buildBrief, writeDraft } from './writer-agent.mjs';
import { runSeoAgent, pickLinkTargets, addBacklinks } from './seo-agent.mjs';

const AGENT = 'orchestrator';
const MIN_QUEUE = 10;

function parseArgs(argv) {
  const args = { dryRun: argv.includes('--dry-run'), force: null };
  const i = argv.indexOf('--force');
  if (i !== -1) args.force = Number(argv[i + 1] || 1);
  return args;
}

/** Deduplicated citation list from the product agent's research (E-E-A-T). */
function collectSources(products) {
  const seen = new Set();
  const out = [];
  for (const url of products.flatMap((p) => p.sources || [])) {
    let u;
    try {
      u = new URL(url);
    } catch {
      continue;
    }
    if (!/^https?:$/.test(u.protocol) || /amazon\./.test(u.hostname) || seen.has(u.href)) continue;
    seen.add(u.href);
    out.push({ title: u.hostname.replace(/^www\./, '') + (u.pathname.length > 1 ? u.pathname.replace(/\/$/, '') : ''), url: u.href });
  }
  return out.slice(0, 8);
}

/** Highest priority first, but rotate categories so the site grows evenly. */
function nextKeyword(queue, state) {
  const recent = state.published.slice(-6).map((p) => p.category);
  const pending = queue.filter((q) => q.status === 'pending');
  // Ahrefs data nudges the order: more volume and lower KD rank higher.
  const score = (k) =>
    k.priority -
    recent.filter((c) => c === k.category).length * 1.5 +
    (k.ahrefs ? Math.log10((k.ahrefs.volume || 0) + 1) - (k.ahrefs.kd ?? 20) / 20 : 0);
  pending.sort((a, b) => score(b) - score(a));
  return pending[0];
}

async function publishOne(item) {
  const posts = listPosts();
  log(AGENT, `▶ "${item.keyword}" (${item.articleType}, ${item.category})`);

  const products = await runProductAgent(item);
  log(AGENT, `products: ${products.map((p) => p.name).join(' | ')}`);

  const brief = await buildBrief(item);
  log(AGENT, `brief: central entity "${brief.centralEntity}", ${brief.entities.length} entities, ${brief.ngrams.length} n-grams`);

  const linkTargets = pickLinkTargets(item, posts);
  const draft = await writeDraft({ item, brief, products, linkTargets, year: new Date().getFullYear() });
  const { meta, body, report } = await runSeoAgent({ item, brief, draft, products, linkTargets });

  let slug = item.slug;
  if (postExists(slug)) slug = `${slug}-${Date.now().toString(36).slice(-4)}`;

  writePost(
    slug,
    {
      title: meta.title,
      seoTitle: meta.seoTitle,
      description: meta.description,
      pubDate: new Date().toISOString(),
      category: item.category,
      keyword: item.keyword,
      secondaryKeywords: item.secondaryKeywords,
      entities: meta.entities,
      tags: meta.tags,
      articleType: item.articleType,
      readingTime: readingTime(body),
      tldr: meta.tldr,
      products: products.map(({ facts, sources, ...p }) => p),
      faqs: meta.faqs,
      author: 'editorial-team',
      reviewedDate: new Date().toISOString().slice(0, 10),
      sources: collectSources(products),
    },
    body,
  );
  const backlinks = addBacklinks({ newSlug: slug, item, meta, posts });
  saveReport(slug, { keyword: item.keyword, createdAt: new Date().toISOString(), brief, products, seo: report, backlinks });
  log(AGENT, `✔ published /blog/${slug}/ (SEO score ${report.score})`);
  return slug;
}

export async function main(argv = process.argv.slice(2)) {
  const args = parseArgs(argv);
  const state = loadState();
  const now = localNow();
  if (!state.startDate) {
    state.startDate = now.date;
    log(AGENT, `schedule starts today: ${state.startDate}`);
    if (!args.dryRun) saveState(state);
  }

  const plan = dueNow(now, state.startDate);
  const publishedToday = state.published.filter((p) => p.date === now.date).length;
  const maxPerRun = SITE.schedule.maxPostsPerRun;
  const toPublish = args.force ?? Math.max(0, Math.min(plan.due - publishedToday, maxPerRun));
  log(AGENT, `day ${plan.day + 1} (week ${plan.week}, ${plan.phase}): quota ${plan.quota}, due by ${now.hour}:00 → ${plan.due}, already ${publishedToday}, publishing ${toPublish}`);
  if (args.dryRun || toPublish <= 0) return;

  let queue = loadQueue();
  if (queue.filter((q) => q.status === 'pending').length < MIN_QUEUE) {
    try {
      await runKeywordAgent();
    } catch (e) {
      log(AGENT, `keyword agent failed: ${e.message}`);
    }
    queue = loadQueue();
  }

  let done = 0;
  let guard = 0;
  while (done < toPublish && guard++ < toPublish + 3) {
    const item = nextKeyword(queue, state);
    if (!item) {
      log(AGENT, 'queue empty');
      break;
    }
    try {
      const slug = await publishOne(item);
      item.status = 'published';
      item.slug = slug;
      item.publishedAt = new Date().toISOString();
      state.published.push({ date: now.date, slug, keyword: item.keyword, category: item.category });
      done++;
    } catch (e) {
      item.attempts = (item.attempts || 0) + 1;
      item.lastError = String(e.message).slice(0, 300);
      if (item.attempts >= 2) item.status = 'failed';
      log(AGENT, `✖ "${item.keyword}" failed: ${e.message}`);
    }
    saveQueue(queue);
    saveState(state);
  }
  log(AGENT, `done: ${done}/${toPublish} published`);
  if (done === 0 && toPublish > 0) process.exitCode = 1;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
