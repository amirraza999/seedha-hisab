import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import {
  ArrowRight,
  CalendarCheck,
  ExternalLink,
  FileCheck2,
  Lightbulb,
  ShieldCheck,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getTool } from "@/lib/tools";
import {
  getGuide,
  getGuideCategory,
  getGuidesByCategory,
  guideCategories,
  guides,
} from "@/lib/guides";
import { guideRedirects } from "@/lib/redirects";
import { categoryImage, categorySeo, guideKeywords, SITE_URL } from "@/lib/seo";

export function generateStaticParams() {
  return [
    ...guides.map((guide) => guide.slug),
    ...guideCategories.map((category) => category.slug),
    ...Object.keys(guideRedirects),
  ].map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  const category = getGuideCategory(slug);
  if (guide) {
    const categorySlug = guideCategories.find(
      (item) => item.name === guide.category,
    )?.slug;
    const image = categoryImage(guide.category);
    return {
      title: guide.title,
      description: guide.description,
      keywords: guideKeywords(guide.title, guide.category, categorySlug),
      alternates: { canonical: `/guides/${guide.slug}` },
      openGraph: {
        title: guide.title,
        description: guide.description,
        type: "article",
        url: `${SITE_URL}/guides/${guide.slug}`,
        images: [{ url: image, alt: guide.title }],
      },
      twitter: {
        card: "summary_large_image",
        title: guide.title,
        description: guide.description,
        images: [image],
      },
    };
  }
  if (category) {
    const seo = categorySeo[category.slug];
    return {
      title: seo.title,
      description: seo.description,
      keywords: seo.keywords,
      alternates: { canonical: `/guides/${category.slug}` },
    };
  }
  return {};
}

function CategoryPage({ slug }: { slug: string }) {
  const category = getGuideCategory(slug);
  if (!category) notFound();
  const items = getGuidesByCategory(category.name);
  const toolSlugs = [...new Set(items.map((item) => item.calculatorSlug))];
  const seo = categorySeo[category.slug];
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: seo.title,
    description: seo.description,
    url: `${SITE_URL}/guides/${category.slug}`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Guides",
          item: `${SITE_URL}/guides`,
        },
        { "@type": "ListItem", position: 3, name: category.name },
      ],
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.title,
        url: `${SITE_URL}/guides/${item.slug}`,
      })),
    },
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <SiteHeader />
      <main>
        <section className="border-b border-slate-200 bg-[#f6f9fc]">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
            <nav className="text-sm text-slate-500" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/guides">Guides</Link>
              <span className="mx-2">/</span>
              <span className="text-slate-800">{category.name}</span>
            </nav>
            <p className="eyebrow mt-9">Guide category</p>
            <h1 className="mt-3 text-4xl font-black tracking-[-.04em] text-[#102a43] sm:text-6xl">
              {category.name} Guides
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              {category.description}
            </p>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <div className="grid gap-5 md:grid-cols-2">
            {items.map((item) => (
              <Link
                href={`/guides/${item.slug}`}
                key={item.slug}
                className="group rounded-2xl border border-slate-200 p-6 hover:border-emerald-300"
              >
                <p className="eyebrow">{item.period}</p>
                <h2 className="mt-4 text-2xl font-black text-[#102a43]">
                  {item.title}
                </h2>
                <p className="mt-3 leading-7 text-slate-600">
                  {item.directAnswer}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[#087f5b]">
                  Read guide{" "}
                  <ArrowRight
                    size={16}
                    className="transition group-hover:translate-x-1"
                  />
                </span>
              </Link>
            ))}
          </div>
        </section>
        <section className="border-t border-slate-200 bg-[#f6f9fc]">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
            <p className="eyebrow">Related tools</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {toolSlugs.map((slug) => {
                const tool = getTool(slug);
                return tool ? (
                  <Link
                    key={slug}
                    href={`/tools/${slug}`}
                    className="rounded-xl bg-[#102a43] px-4 py-3 text-sm font-bold text-white hover:bg-[#163b5e]"
                  >
                    {tool.name}
                  </Link>
                ) : null;
              })}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function GuidePage({ slug }: { slug: string }) {
  const guide = getGuide(slug);
  if (!guide) notFound();
  const related = guides
    .filter(
      (item) => item.category === guide.category && item.slug !== guide.slug,
    )
    .slice(0, 3);
  const maxValue = Math.max(
    ...(guide.visual?.values.map((item) => item.value) || [1]),
  );
  const base = SITE_URL;
  const categorySlug = guideCategories.find(
    (c) => c.name === guide.category,
  )?.slug;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    image: `${base}${categoryImage(guide.category)}`,
    datePublished: "2026-09-10",
    dateModified: "2026-09-11",
    author: { "@type": "Organization", name: "Seedha Hisab Editorial" },
    publisher: { "@type": "Organization", name: "Seedha Hisab" },
    mainEntityOfPage: `${base}/guides/${guide.slug}`,
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: base },
      {
        "@type": "ListItem",
        position: 2,
        name: "Guides",
        item: `${base}/guides`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: guide.category,
        item: `${base}/guides/${categorySlug}`,
      },
      { "@type": "ListItem", position: 4, name: guide.title },
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SiteHeader />
      <main>
        <article>
          <header className="border-b border-slate-200 bg-[#f6f9fc]">
            <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-16">
              <nav className="text-sm text-slate-500" aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <span className="mx-2">/</span>
                <Link href="/guides">Guides</Link>
                <span className="mx-2">/</span>
                <Link href={`/guides/${categorySlug}`}>{guide.category}</Link>
              </nav>
              <p className="eyebrow mt-9">{guide.category}</p>
              <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-[-.045em] text-[#102a43] sm:text-6xl">
                {guide.title}
              </h1>
              <div className="mt-6 flex flex-wrap gap-3 text-xs font-bold">
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-emerald-900">
                  <CalendarCheck size={15} /> Verified {guide.verified}
                </span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-2 text-slate-600">
                  {guide.period}
                </span>
              </div>
              <div className="mt-8 rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm">
                <p className="eyebrow">Direct answer</p>
                <p className="mt-3 text-lg font-semibold leading-8 text-[#102a43]">
                  {guide.directAnswer}
                </p>
              </div>
            </div>
          </header>
          <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
            <section className="rounded-2xl bg-[#102a43] p-6 text-white sm:p-8">
              <div className="flex items-center gap-3 text-emerald-300">
                <Lightbulb size={22} />
                <h2 className="text-xl font-black">Key takeaways</h2>
              </div>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {guide.takeaways.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-6 text-slate-200"
                  >
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
            <div className="guide-prose mt-12">
              {guide.sections.map((section) => (
                <section key={section.heading}>
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.formula && (
                    <div className="formula-box">{section.formula}</div>
                  )}
                  {section.bullets && (
                    <ul>
                      {section.bullets.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
            {guide.table && (
              <section className="mt-12">
                <p className="eyebrow">Original reference table</p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-[#102a43]">
                  {guide.table.title}
                </h2>
                <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="min-w-full border-collapse text-left text-sm">
                    <caption className="border-b border-slate-200 bg-slate-50 px-5 py-4 text-left text-sm leading-6 text-slate-600">
                      {guide.table.caption}
                    </caption>
                    <thead className="bg-[#102a43] text-white">
                      <tr>
                        {guide.table.columns.map((column) => (
                          <th
                            key={column}
                            scope="col"
                            className="whitespace-nowrap px-5 py-4 font-extrabold"
                          >
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {guide.table.rows.map((row, index) => (
                        <tr
                          key={row.join("-")}
                          className={index % 2 ? "bg-slate-50" : "bg-white"}
                        >
                          {row.map((cell, cellIndex) => (
                            <td
                              key={cellIndex}
                              className={`px-5 py-4 leading-6 ${cellIndex === 0 ? "font-bold text-[#102a43]" : "text-slate-600"}`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}
            {guide.visual && (
              <figure className="mt-12 rounded-2xl border border-slate-200 bg-[#f6f9fc] p-6 sm:p-8">
                <p className="eyebrow">Original visual</p>
                <h2 className="mt-3 text-2xl font-black text-[#102a43]">
                  {guide.visual.title}
                </h2>
                <div className="mt-7 space-y-5">
                  {guide.visual.values.map((item) => (
                    <div key={item.label}>
                      <div className="mb-2 flex items-end justify-between gap-4 text-sm">
                        <span className="font-bold text-[#102a43]">
                          {item.label}
                        </span>
                        <span className="font-extrabold text-[#087f5b]">
                          {item.display}
                        </span>
                      </div>
                      <div className="h-4 overflow-hidden rounded-full bg-white ring-1 ring-slate-200">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#087f5b] to-[#34c89a]"
                          style={{
                            width: `${Math.max(3, (item.value / maxValue) * 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <figcaption className="mt-5 text-sm leading-6 text-slate-500">
                  {guide.visual.caption}
                </figcaption>
              </figure>
            )}
            <section className="mt-12 rounded-3xl border border-emerald-200 bg-emerald-50 p-6 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-8">
              <div>
                <p className="eyebrow">Want your own estimate?</p>
                <h2 className="mt-2 text-2xl font-black text-[#102a43]">
                  Use the transparent calculator
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Enter your figures and see the formula, assumptions and
                  result.
                </p>
              </div>
              <Link
                href={`/tools/${guide.calculatorSlug}`}
                className="mt-5 inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#102a43] px-5 py-3 text-sm font-extrabold text-white hover:bg-[#163b5e] sm:mt-0"
              >
                {guide.calculatorLabel}
                <ArrowRight size={17} />
              </Link>
            </section>
            {guide.faqs.length > 0 && (
              <section className="mt-12">
                <p className="eyebrow">Useful questions</p>
                <h2 className="mt-3 text-3xl font-black text-[#102a43]">
                  Quick answers
                </h2>
                <div className="mt-5 divide-y divide-slate-200 rounded-2xl border border-slate-200">
                  {guide.faqs.map((item) => (
                    <div className="p-6" key={item.question}>
                      <h3 className="font-black text-[#102a43]">
                        {item.question}
                      </h3>
                      <p className="mt-2 leading-7 text-slate-600">
                        {item.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
            <section className="mt-12 rounded-2xl border border-slate-200 bg-[#f8fafc] p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-[#087f5b]" />
                <div>
                  <p className="eyebrow">Sources & references</p>
                  <h2 className="mt-1 text-2xl font-black text-[#102a43]">
                    How this guide was checked
                  </h2>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                {guide.sources.map((source) => (
                  <div
                    key={`${source.organization}-${source.title}`}
                    className="rounded-xl bg-white p-5 ring-1 ring-slate-200"
                  >
                    <p className="text-sm font-extrabold text-[#102a43]">
                      {source.organization}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {source.title}
                    </p>
                    {source.note && (
                      <p className="mt-2 text-xs leading-5 text-slate-500">
                        {source.note}
                      </p>
                    )}
                    {source.url && (
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-[#087f5b]"
                      >
                        View official source <ExternalLink size={15} />
                      </a>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-start gap-3 border-t border-slate-200 pt-5 text-sm leading-6 text-slate-500">
                <FileCheck2 className="mt-1 shrink-0" size={18} />
                <p>
                  Found outdated information?{" "}
                  <Link
                    href="/corrections-policy"
                    className="font-bold text-[#087f5b]"
                  >
                    Report a correction
                  </Link>
                  . Seedha Hisab publishes educational estimates, not
                  personalised tax, legal or religious advice.
                </p>
              </div>
            </section>
            {related.length > 0 && (
              <section className="mt-12">
                <p className="eyebrow">Continue learning</p>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  {related.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/guides/${item.slug}`}
                      className="group rounded-2xl border border-slate-200 p-5 hover:border-emerald-300"
                    >
                      <h3 className="font-black leading-6 text-[#102a43]">
                        {item.title}
                      </h3>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#087f5b]">
                        Read next{" "}
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
            <section className="mt-12 border-t border-slate-200 pt-8 text-sm leading-6 text-slate-500">
              <p>
                <strong className="text-[#102a43]">Editorial owner:</strong>{" "}
                Seedha Hisab Editorial. No invented expert reviewer or
                government affiliation.
              </p>
              <p className="mt-2">
                <strong className="text-[#102a43]">Update history:</strong>{" "}
                {guide.verified} — guide created or verified against the source
                and methodology shown above.
              </p>
            </section>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}

export default async function GuideOrCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const canonicalSlug = guideRedirects[slug];
  if (canonicalSlug) permanentRedirect(`/guides/${canonicalSlug}`);
  if (getGuideCategory(slug)) return <CategoryPage slug={slug} />;
  return <GuidePage slug={slug} />;
}
