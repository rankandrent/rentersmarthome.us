// AGENT 3 — Semantic SEO Content Writer
// Phase A (semantic brief): reads the live SERP for the keyword and builds an
//   entity map (central entity, related entities and attributes), target
//   n-grams, skip-grams, NLP/LSI terms, PAA questions, content gaps and outline.
// Phase B (draft): writes the article with entity-first semantic SEO: the
//   central entity is the grammatical subject early and often (high salience),
//   every important entity is defined by its attributes, headings follow the
//   query's sub-intents, and the brief's n-grams/skip-grams are used naturally.
import { z } from 'zod';
import { ask, askJson } from './lib/claude.mjs';
import { SITE } from './lib/config.mjs';

const AGENT = 'writer-agent';

export const BriefSchema = z.object({
  centralEntity: z.string(),
  entityVariants: z.array(z.string()).max(8),
  entities: z
    .array(z.object({ name: z.string(), type: z.string(), relation: z.string() }))
    .min(5)
    .max(40),
  attributes: z.array(z.string()).max(30),
  ngrams: z.array(z.string()).min(5).max(40),
  skipgrams: z.array(z.string()).max(30),
  nlpTerms: z.array(z.string()).min(5).max(60),
  questions: z.array(z.string()).max(12),
  contentGaps: z.array(z.string()).max(10),
  outline: z.array(z.object({ h2: z.string(), intent: z.string(), h3: z.array(z.string()).max(8) })).min(4).max(14),
  targetWords: z.number().min(900).max(4500),
});

const BRIEF_SYSTEM = `You are the semantic SEO strategist for ${SITE.domain} (renter-friendly smart home). You build content briefs grounded in what currently ranks, using entity-based SEO (Koray-style topical maps / semantic content networks).

Method:
1. Use web_search on the exact keyword and 1-2 variants. Read the top-ranking pages and People Also Ask.
2. Identify the CENTRAL ENTITY of the query (the thing the page must be "about") and its common variants/synonyms.
3. List related entities (brands, product types, protocols such as Matter/Thread/Z-Wave, standards, lease/legal concepts, rooms, hardware parts) with their type and relation to the central entity.
4. List the attributes users care about (e.g. install method, battery life, compatibility, subscription).
5. ngrams: the 2-4 word phrases that recur across top results (the query's lexical fingerprint).
6. skipgrams: important word pairs that co-occur within a few words, written as "word1…word2" (e.g. "deadbolt…thumbturn").
7. nlpTerms: single words and short terms an NLP model expects in a complete document on this topic.
8. contentGaps: things top pages miss that a RENTER needs (lease clauses, landlord approval, restoring originals, moving out).
9. outline: H2s that each satisfy a distinct sub-intent, ordered by search-journey logic; H3s beneath.
10. targetWords: 10-20% more than the average top result, capped by usefulness (roundups 2000-3500, how-tos 1300-2200).`;

const WRITE_SYSTEM = `You are the senior writer for ${SITE.domain}. Voice: a knowledgeable friend who rents too. Practical, specific, confident, never fluffy. US English.

SEMANTIC SEO RULES (follow all):
- Entity salience: the central entity is the grammatical SUBJECT of the first sentence and of many topic sentences; name it explicitly instead of "it/this" when starting paragraphs. Put it (or a variant) in the H1-style title, the first 100 words, and at least a third of H2s.
- Define each important related entity by its attributes the first time it appears (what it is, how it relates to the central entity).
- Use the brief's n-grams and skip-grams naturally (never stuffed; vary word order only where grammar requires). Weave in the nlpTerms.
- Each H2 answers one sub-intent. Start each H2 section with a direct 1-2 sentence answer (featured-snippet style), then expand.
- Information gain: include renter-specific details others miss: lease language to look for, how to ask a landlord, restoring the original hardware, what to do on move-out day.
- Use a short comparison table where it helps. Use numbered steps for processes.

LAYOUT-AWARE RULES (how search systems read a page as blocks: headers, paragraphs, lists, tables, images, and how neighbouring blocks relate):
- Logical block order: definition/answer → picks → how to choose → install/setup → landlord & move-out → verdict. Each block should only make sense in that position.
- Every ## section opens with a 1-2 sentence direct answer in **bold** (bold marks the most important sentence of the block). Use bold sparingly elsewhere.
- Mix block types: at least one bulleted or numbered list, and for roundups/comparisons at least one comparison table.
- Every table is introduced by a sentence directly above it that says what the table compares; every list follows a lead-in sentence.
- For roundups, give each product its own "### <exact product name>: <role>" heading using the exact product name from the research (the site places the product photo under that heading), followed by text that describes that product only.
- Keep each paragraph about one idea (3-4 sentences max) so blocks stay coherent.

FUNNEL RULES (the item's "funnel" field):
- tofu (awareness): answer the question fully and neutrally; recommend products only where they solve the problem; end with a clear next step linking to the relevant mofu comparison or bofu "best X" guide in the same cluster.
- mofu (evaluation): compare options on the criteria renters care about, with a comparison table and a clear "choose X if… / choose Y if…" verdict; link to bofu roundups and to the tofu explainer.
- bofu (buying): lead with the picks, give decisive product-by-product guidance and buying checklists; link back to the tofu/mofu guides for readers who need background.

E-E-A-T RULES (Experience, Expertise, Authoritativeness, Trust):
- Voice: write in a warm first-person editorial voice ("we", "our", "us", and "I" for the writer's perspective, e.g. "If I were setting this up in my apartment, I'd…"). Use first person for honest perspective, reasoning and advice, never to invent experiences.
- Experience: write like someone who has lived in rentals. Include concrete, practical detail a real renter would know: what the install actually involves step by step, where things go wrong (sticky deadbolts, thick doors, 2.4 GHz-only Wi-Fi, no C-wire), a ready-to-send landlord email, and what to do on move-out day. Never invent personal anecdotes or claim hands-on testing.
- Expertise: explain the "why" (how Matter/Thread, retrofit locks, IR controllers etc. actually work) in plain language; correct common misconceptions.
- Authoritativeness: reference primary sources by name where it helps (manufacturer documentation, the Connectivity Standards Alliance for Matter, the FTC, state tenant law in general terms), and add 1-3 outbound markdown links to authoritative non-retailer pages that appear in the product research sources.
- Trust: state limitations and downsides plainly, flag subscription costs, recommend asking the landlord in writing for anything touching locks, wiring or HVAC, and never give legal advice beyond "check your lease and local law".

FACTUAL RULES:
- Only state product facts present in the provided product research. No prices, no invented ratings, no fake testing claims ("we tested for 6 months"). You may say "based on manufacturer specs and owner reports".
- Products are linked with markdown links whose URL is "amzn:" + the product's query with spaces replaced by "+", e.g. [August Wi-Fi Smart Lock](amzn:August+Wi-Fi+Smart+Lock+4th+Gen). Link each product 1-2 times in the body, not more.
- Internal links: link 3-5 relevant pages from the provided list with descriptive anchor text, as /blog/<slug>/ links, placed where they help the reader. Never invent internal URLs.

FORMAT:
- Body starts with an intro paragraph (no heading). Use ## for H2 and ### for H3. Never output an H1. Do NOT include an FAQ section in the body (FAQs go in the metadata). Do not include the "top picks" summary box (the template renders it from product data); for roundups do write a detailed ### section per product.
- Output exactly two tagged blocks and nothing else:
<metadata>{json}</metadata>
<article>markdown body</article>`;

export async function buildBrief(item) {
  return askJson({
    agent: `${AGENT}:brief`,
    system: BRIEF_SYSTEM,
    effort: 'medium',
    webSearch: 6,
    schema: BriefSchema,
    prompt: `Keyword: "${item.keyword}"
Article type: ${item.articleType} · Intent: ${item.intent}
Secondary keywords: ${item.secondaryKeywords.join(', ')}
Seed questions: ${item.questions.join(' | ')}

Return ONLY a \`\`\`json block with: centralEntity, entityVariants[], entities[{name,type,relation}], attributes[], ngrams[], skipgrams[], nlpTerms[], questions[], contentGaps[], outline[{h2,intent,h3[]}], targetWords (number).`,
  });
}

const MetaSchema = z.object({
  title: z.string().min(20).max(70),
  seoTitle: z.string().min(20).max(65),
  description: z.string().min(120).max(165),
  tldr: z.array(z.string()).min(2).max(5),
  faqs: z.array(z.object({ q: z.string(), a: z.string() })).min(3).max(8),
  tags: z.array(z.string()).max(8),
  entities: z.array(z.string()).max(15),
});

export function parseDraft(text) {
  const meta = text.match(/<metadata>\s*([\s\S]*?)\s*<\/metadata>/);
  const body = text.match(/<article>\s*([\s\S]*?)\s*<\/article>/);
  if (!meta || !body) throw new Error('Writer output missing <metadata> or <article> block');
  const json = meta[1].replace(/^```(?:json)?\s*|\s*```$/g, '');
  return { meta: MetaSchema.parse(JSON.parse(json)), body: body[1].trim() };
}

export async function writeDraft({ item, brief, products, linkTargets, year }) {
  const prompt = `Write the article.

TARGET KEYWORD: ${item.keyword}
ARTICLE TYPE: ${item.articleType} · FUNNEL STAGE: ${item.funnel ?? 'derive from intent'} · WORKING TITLE: ${item.workingTitle}
SECONDARY KEYWORDS: ${item.secondaryKeywords.join(', ')}
CURRENT YEAR: ${year} (use it in the title only if it is a "best"/roundup article)

SEMANTIC BRIEF:
${JSON.stringify(brief, null, 1)}

PRODUCT RESEARCH (the only product facts you may use):
${JSON.stringify(products.map(({ sources, ...p }) => p), null, 1)}

INTERNAL LINK CANDIDATES (pick 3-5 that genuinely fit):
${linkTargets.map((t) => `- /blog/${t.slug}/ : ${t.title} (keyword: ${t.keyword})`).join('\n') || '(none yet: skip internal links)'}

LENGTH: about ${brief.targetWords} words in the body.

METADATA JSON fields: title (≤70 chars, contains the keyword naturally), seoTitle (≤60 chars, keyword near the start), description (140-160 chars, keyword + benefit + renter angle), tldr (2-4 one-line takeaways that directly answer the query), faqs (4-6 PAA-style Q&As, answers 2-3 sentences, entity-rich, no links), tags (3-6), entities (the 8-12 most important entities incl. the central entity).`;

  let lastErr;
  for (let attempt = 0; attempt < 2; attempt++) {
    const text = await ask({ agent: `${AGENT}:draft`, system: WRITE_SYSTEM, prompt, effort: 'high', maxTokens: 48000 });
    try {
      return parseDraft(text);
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr;
}
