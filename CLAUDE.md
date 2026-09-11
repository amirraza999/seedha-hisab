# Claude Code instructions

## Project

Seedha Hisab is a production Next.js 16 App Router website for Pakistan-focused calculators and practical guides. It is configured for Hostinger Node.js hosting.

## Required runtime

- Node.js 22.13 or newer
- pnpm 11
- Install: `pnpm install --frozen-lockfile`
- Development: `pnpm dev`
- Production build: `pnpm build`
- Production start: `pnpm start`

## Before every commit

Run:

```bash
pnpm test
pnpm lint
pnpm build
```

All three commands must pass.

## Guardrails

- Preserve all calculator formulas, tests, routes, redirects, SEO metadata, schema markup, images, and responsive behavior unless the requested change explicitly requires an update.
- Do not replace the project with a template or migrate it back to Vinext, Wrangler, or Cloudflare Workers.
- Keep canonical URLs based on `NEXT_PUBLIC_SITE_URL`.
- Never commit `.env`, credentials, API keys, `.next`, `node_modules`, or build output.
- Tax and statutory data must be verified against enacted official sources before changing calculations or dates.
- Diagnose Hostinger failures from the exact build/runtime log and make the smallest safe fix.

## Important paths

- Routes: `app/`
- Calculator UI: `components/calculator-client.tsx`
- Formulas: `lib/calculations.ts`
- Tools: `lib/tools.ts`
- Guides: `lib/guides.ts`
- SEO configuration: `lib/seo.ts`
- Images and favicon: `public/`
- Hostinger instructions: `HOSTINGER_DEPLOYMENT.md`
