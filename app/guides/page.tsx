import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenCheck } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { GuideSearch } from "@/components/guide-search";
import { guideCategories, guides, getGuidesByCategory } from "@/lib/guides";
import { coreKeywords, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Pakistan Tax, Salary & Money Guides",
  description:
    "Read source-aware Pakistan guides for salary tax, freelancers, filer status, COD profit, bills, land conversion, Zakat and discounts.",
  keywords: [...coreKeywords, "Pakistan tax guides", "Pakistan finance guides"],
  alternates: { canonical: "/guides" },
};

export default function GuidesPage() {
  const featured = guides.filter((guide) => guide.featured);
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Pakistan Tax, Salary & Money Guides",
    description:
      "Source-aware guides supporting transparent Pakistan calculators.",
    url: `${SITE_URL}/guides`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: guides.length,
      itemListElement: guides.map((guide, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: guide.title,
        url: `${SITE_URL}/guides/${guide.slug}`,
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
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
            <div className="flex max-w-3xl items-center gap-3 text-[#087f5b]">
              <BookOpenCheck size={26} />
              <p className="eyebrow">Guides · The knowledge layer</p>
            </div>
            <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-[-.04em] text-[#102a43] sm:text-6xl">
              Pakistan tax, salary and money guides
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              Understand FBR salary tax, freelancer withholding, filer status,
              COD profit, electricity bills, land conversion, Zakat and
              discounts through clear formulas, examples and sources.
            </p>
            <nav
              className="mt-8 flex flex-wrap gap-2"
              aria-label="Guide categories"
            >
              {guideCategories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/guides/${category.slug}`}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-[#102a43] hover:border-emerald-400 hover:text-[#087f5b]"
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <p className="eyebrow">Featured references</p>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {featured.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group rounded-2xl bg-[#102a43] p-6 text-white shadow-lg"
              >
                <p className="text-xs font-extrabold uppercase tracking-[.14em] text-emerald-300">
                  {guide.category}
                </p>
                <h2 className="mt-4 text-2xl font-black leading-8">
                  {guide.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {guide.directAnswer}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-emerald-300">
                  Open reference{" "}
                  <ArrowRight
                    size={16}
                    className="transition group-hover:translate-x-1"
                  />
                </span>
              </Link>
            ))}
          </div>
        </section>
        <section className="border-y border-slate-200 bg-[#f6f9fc]">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
            <p className="eyebrow">Find an answer</p>
            <h2 className="section-title">Search all Guides</h2>
            <div className="mt-7">
              <GuideSearch guides={guides} />
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <p className="eyebrow">Browse by need</p>
          <h2 className="section-title">Focused topic clusters</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {guideCategories.map((category) => {
              const count = getGuidesByCategory(category.name).length;
              return (
                <Link
                  href={`/guides/${category.slug}`}
                  key={category.slug}
                  className="group rounded-2xl border border-slate-200 p-5 hover:border-emerald-300"
                >
                  <h3 className="font-black text-[#102a43]">{category.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {category.description}
                  </p>
                  <p className="mt-5 text-sm font-bold text-[#087f5b]">
                    {count} {count === 1 ? "guide" : "guides"}{" "}
                    <ArrowRight className="ml-1 inline" size={15} />
                  </p>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
