import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { ArrowRight, CalendarCheck, ExternalLink, Info } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CalculatorClient } from "@/components/calculator-client";
import { categorySlug, getTool, tools, type ToolSlug } from "@/lib/tools";
import { toolContent } from "@/lib/tool-content";
import { getGuidesByTool } from "@/lib/guides";
import { toolRedirects } from "@/lib/redirects";
import { categoryImage, SITE_URL, toolSeo } from "@/lib/seo";

export function generateStaticParams() {
  return [...tools.map((t) => t.slug), ...Object.keys(toolRedirects)].map(
    (slug) => ({ slug }),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return {};
  const seo = toolSeo[tool.slug];
  const image = categoryImage(tool.category);
  return {
    title: { absolute: `${seo.title} | Seedha Hisab` },
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical: "/tools/" + tool.slug },
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: "website",
      url: `${SITE_URL}/tools/${tool.slug}`,
      images: [{ url: image, alt: tool.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [image],
    },
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const canonicalSlug = toolRedirects[slug];
  if (canonicalSlug) permanentRedirect(`/tools/${canonicalSlug}`);
  const tool = getTool(slug);
  if (!tool) notFound();
  const d = toolContent[slug as ToolSlug];
  const related = tools
    .filter((t) => t.category === tool.category && t.slug !== tool.slug)
    .slice(0, 3);
  const relatedGuides = getGuidesByTool(slug as ToolSlug);
  const seo = toolSeo[slug as ToolSlug];
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/tools/${tool.slug}#webpage`,
        url: `${SITE_URL}/tools/${tool.slug}`,
        name: seo.title,
        description: seo.description,
        inLanguage: "en-PK",
      },
      {
        "@type": "WebApplication",
        "@id": `${SITE_URL}/tools/${tool.slug}#calculator`,
        name: tool.name,
        applicationCategory: "FinanceApplication",
        operatingSystem: "Any",
        isAccessibleForFree: true,
        description: seo.description,
        url: `${SITE_URL}/tools/${tool.slug}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Calculators",
            item: `${SITE_URL}/tools`,
          },
          { "@type": "ListItem", position: 3, name: tool.name },
        ],
      },
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-8">
        <nav className="text-xs text-slate-500 sm:text-sm" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span className="mx-2">/</span>
          <Link href={`/tools#${categorySlug(tool.category)}`}>
            {tool.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800">{tool.name}</span>
        </nav>
        <div className="mt-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-2xl font-black tracking-[-.03em] text-[#102a43] sm:text-4xl">
              {tool.name}
            </h1>
            <p className="mt-1 text-sm leading-6 text-slate-600 sm:text-base">
              <span className="font-urdu text-slate-500" dir="auto">
                {tool.urdu}
              </span>
              <span className="mx-2 text-slate-300">·</span>
              {tool.description}
            </p>
          </div>
          <div className="flex w-fit shrink-0 items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-900">
            <CalendarCheck size={14} /> Verified {d.verified}
          </div>
        </div>
        <nav
          aria-label="Switch calculator"
          className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0"
        >
          {tools.map((t) => (
            <Link
              key={t.slug}
              href={`/tools/${t.slug}`}
              aria-current={t.slug === tool.slug ? "page" : undefined}
              className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-bold ${
                t.slug === tool.slug
                  ? "border-[#102a43] bg-[#102a43] text-white"
                  : "border-slate-200 bg-white text-[#102a43] hover:border-emerald-400 hover:text-[#087f5b]"
              }`}
            >
              {t.name.replace(" Calculator Pakistan", "").replace(" Calculator", "")}
            </Link>
          ))}
        </nav>
        <section className="py-5 sm:py-6">
          <CalculatorClient slug={slug as ToolSlug} />
        </section>
        <section className="border-t border-slate-200 pt-10">
          <p className="eyebrow">The short answer</p>
          <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-600">
            {d.answer}
          </p>
        </section>
        <section className="grid gap-6 py-10 lg:grid-cols-3">
          <div className="info-card">
            <h2>How it works</h2>
            <p>{d.formula}</p>
          </div>
          <div className="info-card">
            <h2>Worked example</h2>
            <p>{d.example}</p>
          </div>
          <div className="info-card">
            <h2>Important assumptions</h2>
            <ul>
              {d.assumptions.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        </section>
        <section className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <Info className="mt-1 shrink-0 text-[#087f5b]" />
            <div>
              <p className="eyebrow">Sources & verification</p>
              <h2 className="mt-2 text-xl font-black text-[#102a43]">
                {d.period}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Primary source: {d.source}
              </p>
              {d.sourceUrl && (
                <a
                  className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#087f5b]"
                  href={d.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open source <ExternalLink size={15} />
                </a>
              )}
              <p className="mt-4 text-xs leading-5 text-slate-500">
                Found a possible error?{" "}
                <Link
                  href="/corrections-policy"
                  className="font-bold text-[#087f5b] hover:underline"
                >
                  Use the corrections page
                </Link>
                . Financial and tax results are informational estimates.
              </p>
            </div>
          </div>
        </section>
        {relatedGuides.length > 0 && (
          <section className="py-12">
            <p className="eyebrow">Understand the calculation</p>
            <h2 className="mt-2 text-2xl font-black text-[#102a43]">
              Related Guides
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {relatedGuides.map((guide) => (
                <Link
                  href={`/guides/${guide.slug}`}
                  key={guide.slug}
                  className="group rounded-xl border border-slate-200 p-5 hover:border-emerald-300"
                >
                  <p className="font-extrabold text-[#102a43]">{guide.title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {guide.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#087f5b]">
                    Read guide{" "}
                    <ArrowRight
                      size={15}
                      className="transition group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
        {related.length > 0 && (
          <section className="py-14">
            <p className="eyebrow">Related calculators</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {related.map((t) => (
                <Link
                  href={"/tools/" + t.slug}
                  key={t.slug}
                  className="group rounded-xl border border-slate-200 p-5 font-extrabold text-[#102a43] hover:border-emerald-300"
                >
                  {t.name}
                  <ArrowRight
                    className="mt-4 text-[#087f5b] transition group-hover:translate-x-1"
                    size={18}
                  />
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
