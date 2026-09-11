import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ToolCard } from "@/components/tool-card";
import { tools } from "@/lib/tools";
import { coreKeywords, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Pakistan Calculators",
  description:
    "Explore free Pakistan calculators for salary tax, freelancers, COD profit, electricity bills, land conversion, Zakat, net salary and discounts.",
  keywords: coreKeywords,
  alternates: { canonical: "/tools" },
};

export default function ToolsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Pakistan Calculators",
    description:
      "Free Pakistan tax, salary, business, bill, property and personal-finance calculators.",
    url: `${SITE_URL}/tools`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: tools.length,
      itemListElement: tools.map((tool, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: tool.name,
        url: `${SITE_URL}/tools/${tool.slug}`,
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
      <main className="mx-auto min-h-[65vh] max-w-7xl px-4 py-14 sm:px-6">
        <p className="eyebrow">All tools</p>
        <h1 className="section-title">
          Pakistan calculators for tax, salary, business, bills and property
        </h1>
        <p className="mt-3 max-w-3xl leading-7 text-slate-600">
          Calculate salary tax, take-home pay, freelancer withholding, COD
          profit, electricity costs, land area, Zakat and discounts. Every tool
          shows its formula, assumptions and relevant source.
        </p>
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
