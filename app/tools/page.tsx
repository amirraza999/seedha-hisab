import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ToolsByCategory } from "@/components/tools-by-category";
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
      <main className="mx-auto min-h-[65vh] max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        <h1 className="text-3xl font-black tracking-[-.035em] text-[#102a43] sm:text-4xl">
          All Pakistan calculators
        </h1>
        <p className="mt-2 mb-6 max-w-3xl leading-7 text-slate-600">
          Pick what you need — every tool shows its formula, assumptions and
          source.
        </p>
        <ToolsByCategory />
      </main>
      <SiteFooter />
    </>
  );
}
