/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck2,
  FileText,
  ShieldCheck,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ToolCard } from "@/components/tool-card";
import { HomeSearch } from "@/components/home-search";
import { categories, tools } from "@/lib/tools";
import { guides } from "@/lib/guides";
import { coreKeywords, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Pakistan Calculators for Tax, Salary & Business | Seedha Hisab",
  },
  description:
    "Use free Pakistan calculators for salary tax, net salary, freelancer tax, COD profit, electricity bills, marla conversion, Zakat and discounts.",
  keywords: coreKeywords,
  alternates: { canonical: "/" },
};

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Seedha Hisab",
        url: SITE_URL,
        logo: `${SITE_URL}/favicon.svg`,
        description:
          "Independent Pakistan calculators with visible formulas, assumptions and sources.",
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: "Seedha Hisab",
        url: SITE_URL,
        inLanguage: "en-PK",
        publisher: { "@id": `${SITE_URL}/#organization` },
        description:
          "Free Pakistan tax, salary, business, bill, property and personal-finance calculators.",
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
      <main>
        <section className="relative overflow-hidden border-b border-slate-200 bg-[#f6f9fc]">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#087f5b] via-[#1ea97c] to-[#102a43]" />
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[.88fr_1.12fr] lg:gap-14 lg:py-24">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-extrabold text-emerald-800">
                <BadgeCheck size={15} /> Transparent formulas. Visible sources.
              </div>
              <h1 className="mt-6 text-4xl font-black tracking-[-.04em] text-[#102a43] sm:text-5xl lg:text-6xl">
                Pakistan’s smarter money calculators.
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg lg:mx-0">
                Calculate tax, salary, COD profit, bills and property
                figures—then see exactly how the answer was worked out.
              </p>
              <HomeSearch />
              <p className="mt-4 text-xs font-semibold text-slate-500">
                Free to use · No registration · Your calculator inputs stay on
                your device
              </p>
            </div>
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white bg-white shadow-[0_28px_70px_rgba(15,42,67,.16)] ring-1 ring-slate-200/70">
              {/* Native images avoid a Vinext hydration mismatch while preserving intrinsic sizing. */}
              <img
                src="/images/pakistan-money-calculators-hero.webp"
                alt="Calculator with tax, salary, delivery, electricity and property planning tools"
                width={1200}
                height={800}
                fetchPriority="high"
                decoding="async"
                className="h-auto w-full"
              />
              <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/80 bg-white/90 px-4 py-3 text-left shadow-lg backdrop-blur-sm sm:inset-x-auto sm:bottom-5 sm:left-5 sm:max-w-xs">
                <p className="text-xs font-extrabold uppercase tracking-[.12em] text-[#087f5b]">
                  One clear toolkit
                </p>
                <p className="mt-1 text-sm font-bold leading-5 text-[#102a43]">
                  Tax, salary, business, bills and property—without hidden
                  formulas.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Start here</p>
              <h2 className="section-title">Popular calculators</h2>
            </div>
            <Link
              href="/tools"
              className="hidden items-center gap-2 text-sm font-bold text-[#087f5b] sm:flex"
            >
              View all tools <ArrowRight size={17} />
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tools
              .filter((t) => t.featured)
              .map((t) => (
                <ToolCard key={t.slug} tool={t} />
              ))}
          </div>
        </section>

        <section className="border-y border-slate-200 bg-[#f6f9fc]">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
            <p className="eyebrow">Made for real decisions</p>
            <h2 className="section-title">See the complete money picture</h2>
            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_16px_45px_rgba(15,42,67,.08)]">
                <div className="aspect-[3/2] overflow-hidden bg-white">
                  <img
                    src="/images/cod-ecommerce-profit-tools.webp"
                    alt="COD e-commerce parcel, order screen, calculator and profit chart"
                    width={1100}
                    height={734}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-6 sm:p-7">
                  <p className="eyebrow">For online sellers</p>
                  <h3 className="mt-2 text-2xl font-black tracking-tight text-[#102a43]">
                    Know the profit after delivery failures and real costs.
                  </h3>
                  <p className="mt-3 leading-7 text-slate-600">
                    Model COD orders, courier charges, returns, advertising,
                    margins and break-even performance.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      href="/tools/cod-profit-calculator"
                      className="inline-flex items-center gap-2 rounded-xl bg-[#102a43] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#163b5e]"
                    >
                      COD profit <ArrowRight size={16} />
                    </Link>
                    <Link
                      href="/tools/profit-margin-calculator"
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold text-[#102a43] hover:border-emerald-400"
                    >
                      Margin & markup
                    </Link>
                  </div>
                </div>
              </article>
              <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_16px_45px_rgba(15,42,67,.08)]">
                <div className="aspect-[3/2] overflow-hidden bg-white">
                  <img
                    src="/images/property-bills-personal-finance.webp"
                    alt="Property plot, electricity meter, calculator and household savings tools"
                    width={1100}
                    height={620}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-6 sm:p-7">
                  <p className="eyebrow">For home and property</p>
                  <h3 className="mt-2 text-2xl font-black tracking-tight text-[#102a43]">
                    Measure land, estimate bills and plan personal finances.
                  </h3>
                  <p className="mt-3 leading-7 text-slate-600">
                    Choose the correct marla standard, enter your applicable
                    electricity tariff and calculate zakat transparently.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      href="/tools/marla-to-square-feet-calculator"
                      className="inline-flex items-center gap-2 rounded-xl bg-[#102a43] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#163b5e]"
                    >
                      Land calculator <ArrowRight size={16} />
                    </Link>
                    <Link
                      href="/tools/electricity-bill-calculator-pakistan"
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold text-[#102a43] hover:border-emerald-400"
                    >
                      Bill estimator
                    </Link>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="eyebrow">Built for trust</p>
              <h2 className="section-title">
                An answer is only useful when you can check it.
              </h2>
              <p className="mt-4 max-w-xl leading-7 text-slate-600">
                Changing rules are stored separately from formulas. Relevant
                tools show the applicable period, last verification date,
                calculation method and original source.
              </p>
              <Link
                href="/methodology"
                className="mt-6 inline-flex items-center gap-2 font-bold text-[#087f5b]"
              >
                Read our methodology <ArrowRight size={17} />
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                [
                  FileText,
                  "Formula shown",
                  "Understand every result instead of trusting a black box.",
                ],
                [
                  CalendarCheck2,
                  "Date verified",
                  "See which tax year or tariff period applies.",
                ],
                [
                  ShieldCheck,
                  "Primary sources",
                  "Official law and regulator documents come first.",
                ],
                [
                  BadgeCheck,
                  "No fake claims",
                  "No invented experts, reviews, traffic or government links.",
                ],
              ].map(([Icon, title, text]) => {
                const I = Icon as typeof FileText;
                return (
                  <div
                    className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-5"
                    key={String(title)}
                  >
                    <I className="text-[#087f5b]" size={22} />
                    <h3 className="mt-5 font-extrabold text-[#102a43]">
                      {String(title)}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {String(text)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-[#f6f9fc]">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="eyebrow">Guides</p>
                <h2 className="section-title">
                  Understand what sits behind the answer
                </h2>
              </div>
              <Link
                href="/guides"
                className="hidden items-center gap-2 text-sm font-bold text-[#087f5b] sm:flex"
              >
                View all Guides <ArrowRight size={17} />
              </Link>
            </div>
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {guides
                .filter((guide) => guide.featured)
                .slice(0, 3)
                .map((guide) => (
                  <Link
                    href={`/guides/${guide.slug}`}
                    key={guide.slug}
                    className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,42,67,.05)] hover:border-emerald-300"
                  >
                    <p className="eyebrow">{guide.category}</p>
                    <h3 className="mt-4 text-xl font-black leading-7 text-[#102a43]">
                      {guide.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {guide.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#087f5b]">
                      Read guide{" "}
                      <ArrowRight
                        size={15}
                        className="transition group-hover:translate-x-1"
                      />
                    </span>
                  </Link>
                ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <p className="eyebrow">Browse by need</p>
          <h2 className="section-title">
            One focused toolkit for real Pakistani decisions
          </h2>
          <div className="mt-8 space-y-12">
            {categories.map((category) => (
              <div key={category}>
                <div className="mb-4 flex items-center gap-3">
                  <h3 className="text-xl font-black text-[#102a43]">
                    {category}
                  </h3>
                  <span className="h-px flex-1 bg-slate-200" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {tools
                    .filter((t) => t.category === category)
                    .map((t) => (
                      <ToolCard key={t.slug} tool={t} />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
