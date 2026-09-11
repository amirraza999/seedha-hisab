# Deploy Seedha Hisab from GitHub to Hostinger

## 1. Create the GitHub repository

1. Create a new empty GitHub repository, for example `seedha-hisab`.
2. Extract the supplied ZIP on your computer.
3. Upload the **contents inside the extracted folder** to the repository root. `package.json`, `app`, `components`, `lib`, and `public` must appear at the top level.
4. Commit the files to the `main` branch.

Do not upload `node_modules`, `.next`, `dist`, or any secret `.env` file.

## 2. Import it in Hostinger

1. In hPanel choose **Websites → Add website → Deploy Web App**.
2. Connect GitHub and authorize access to the new repository.
3. Select the repository and the `main` branch.
4. Choose Node.js **22**.
5. Use these commands if Hostinger asks for them:
   - Install: `pnpm install --frozen-lockfile`
   - Build: `pnpm build`
   - Start: `pnpm start`
6. Add the environment variable:
   - Name: `NEXT_PUBLIC_SITE_URL`
   - Value: `https://your-domain.com`
7. Deploy the application.

## 3. Connect the domain

Attach the intended domain in Hostinger, enable SSL, and set `NEXT_PUBLIC_SITE_URL` to the exact HTTPS origin without a trailing slash. Redeploy once after changing this value so canonical URLs, sitemap entries, social cards, and structured data use the final domain.

## 4. Verify after deployment

Open and test:

- `/`
- `/tools`
- `/guides`
- `/robots.txt`
- `/sitemap.xml`
- at least one calculator and one guide

Also test the mobile menu, search, calculator inputs, copy/share controls, and all footer policy links.

## Optional GA4 / Search Console verification

Set `NEXT_PUBLIC_GA_ID` (e.g. `G-XXXXXXX`) to enable the GA4 tag in `app/layout.tsx`, and/or `NEXT_PUBLIC_GSC_VERIFICATION` to emit the Google `<meta name="google-site-verification">` tag. Leave both empty to keep analytics and verification disabled. Never commit real IDs to source control — set them only as Hostinger environment variables.

## Optional AdSense (not yet active)

No AdSense script or publisher ID is included in this codebase. To enable AdSense after approval:

1. Set `NEXT_PUBLIC_ADSENSE_ID` (e.g. `ca-pub-XXXXXXXXXXXXXXXX`) as a Hostinger environment variable — never hardcode it.
2. Add the AdSense loader script to `app/layout.tsx`, gated on `process.env.NEXT_PUBLIC_ADSENSE_ID` being set, following the same pattern used for the GA4 script.
3. Create `public/ads.txt` containing the exact line Google AdSense provides for the approved account (`google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0`). Do not publish this file with a placeholder ID.
4. Update the Privacy Policy page to describe AdSense cookies/consent before enabling ads in production.

## Claude Code handoff prompt

Use this prompt after opening the repository in Claude Code:

> This is a production Next.js 16 App Router website called Seedha Hisab. It has been converted from a Cloudflare/Vinext starter to standard Next.js for Hostinger Node.js hosting. Preserve all routes, calculator logic, SEO metadata, structured data, redirects, responsive styling, images, and tests. Use Node.js 22 and pnpm. Run `pnpm test`, `pnpm lint`, and `pnpm build` before committing. Do not replace the website with a new template. If Hostinger reports an error, diagnose the exact build or runtime log and make the smallest safe fix.
