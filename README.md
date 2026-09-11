# Seedha Hisab

Pakistan-focused calculators and practical guides, prepared for deployment from GitHub to Hostinger as a standard Next.js application.

## Local development

Requirements: Node.js 22.13 or newer and pnpm 11.

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Quality checks

```bash
pnpm test
pnpm lint
pnpm build
```

## Environment variables

Set this variable in Hostinger before the production deployment:

```text
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Optional integrations are documented in `.env.example`.

## Hostinger deployment

Follow [HOSTINGER_DEPLOYMENT.md](./HOSTINGER_DEPLOYMENT.md). The repository is configured with:

- Build command: `pnpm build`
- Start command: `pnpm start`
- Runtime: Node.js 22
- Listening host: `0.0.0.0`

## Updating legal or tax data

Statutory formulas live in `lib/calculations.ts`; explanatory source details live in `lib/tool-content.ts`. Verify any change against the final enacted law or official circular, update the effective period and tests, and run all quality checks before publishing.
