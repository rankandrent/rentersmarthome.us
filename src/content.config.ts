import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const product = z.object({
  name: z.string(),
  brand: z.string().optional(),
  query: z.string(),
  asin: z.string().optional(),
  badge: z.string(),
  summary: z.string(),
  renterNote: z.string(),
  pros: z.array(z.string()).default([]),
  cons: z.array(z.string()).default([]),
  specs: z.record(z.string()).optional(),
  image: z.object({ url: z.string().url(), width: z.number().optional(), height: z.number().optional() }).optional(),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().max(70),
    seoTitle: z.string().max(65).optional(),
    description: z.string().min(80).max(170),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.string(),
    keyword: z.string(),
    secondaryKeywords: z.array(z.string()).default([]),
    entities: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    articleType: z.enum(['roundup', 'review', 'comparison', 'how-to', 'guide']).default('guide'),
    funnel: z.enum(['tofu', 'mofu', 'bofu']).optional(),
    readingTime: z.number().optional(),
    tldr: z.array(z.string()).default([]),
    products: z.array(product).default([]),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    related: z.array(z.string()).default([]),
    author: z.string().default('editorial-team'),
    reviewedDate: z.coerce.date().optional(),
    sources: z.array(z.object({ title: z.string(), url: z.string().url() })).default([]),
    draft: z.boolean().default(false),
    heroImage: z.string().optional(),
    heroAlt: z.string().optional(),
  }),
});

export const collections = { blog };
