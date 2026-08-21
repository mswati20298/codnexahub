# codnexahub
300 tools

Free, no-signup developer tools built with Astro + Tailwind + React islands.
**All 30 tools complete.** 24 static/client-side tools, 2 status/latency
tools using serverless API routes, and 4 BYOK (bring-your-own-key) AI tools
that proxy to Anthropic using your own API key.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:4321

## Build

```bash
npm run build
npm run preview   # preview the production build locally
```

## Rendering model

Most pages are static (prerendered at build time) — fast, free to host,
great for SEO. A few routes need a live server:

- `src/pages/api/model-status.js` — checks provider status pages (server-side, avoids CORS)
- `src/pages/api/latency-check.js` — measures latency to provider endpoints
- `src/pages/api/byok-proxy.js` — stateless proxy for BYOK AI tools; never logs or stores API keys

These use `export const prerender = false` to opt out of static generation
per-route, while every other page stays static. The `@astrojs/vercel`
adapter handles both static and server output in a single deploy.

## Full tool list (30/30)

**Cost & comparison calculators:** API Pricing, Context Window, Model
Comparison, Embedding Cost, Fine-Tuning Cost, Rate Limit, GPU Cost, Vector
DB Comparator

**Text/prompt tools:** Token Counter, Prompt Template Library,
Character/Word Limit Checker, Chain-of-Thought Formatter, Markdown
Formatter, Code Snippet to Prompt

**Developer utilities:** cURL Converter, .env Validator, Environment
Variable Checker, JSON Schema Generator, Webhook Generator, Mock Response
Generator, HTTP Status Lookup, UUID Generator, Hash Generator, Slug
Generator, API Doc Generator

**Live/status tools:** AI Model Status Tracker, Latency Comparison

**BYOK AI tools:** Commit Message Generator, README Generator, Changelog
Generator

## Before you deploy

1. Replace `https://example.com` in `astro.config.mjs` and `public/robots.txt`
   with your real domain.
2. Fill in real content in `privacy-policy.astro` and `contact.astro`
   (placeholders are marked).
3. Add a real favicon at `public/favicon.svg`.

## Adding a new static tool

1. Create `src/components/YourTool.jsx` — client-side logic only.
2. Create `src/pages/tools/your-tool.astro` using `ToolLayout`, same pattern
   as `api-pricing-calculator.astro`.
3. Add an entry to the `tools` array in `src/pages/index.astro`.
4. Write 300–400 words of explanation/FAQ content — this is what helps the
   page rank on Google, not just the tool itself.

## Deploy to Vercel (free tier)

Push to GitHub and import the repo in Vercel — it auto-detects the
`@astrojs/vercel` adapter and deploys static + server routes together on
every push. No extra config needed.

## Updating pricing/reference data

Static data lives in `src/data/` — `pricing.js`, `embeddings.js`,
`gpus.js`, `vectorDbs.js`, `promptTemplates.js`, `statusCodes.js`. Update
these periodically; they're snapshots, not live feeds.