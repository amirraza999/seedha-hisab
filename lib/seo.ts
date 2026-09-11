import type { GuideCategory } from "@/lib/guides";
import type { ToolSlug } from "@/lib/tools";

export const SITE_NAME = "Seedha Hisab";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

type SeoCluster = {
  title: string;
  description: string;
  keywords: string[];
};

export const coreKeywords = [
  "Pakistan calculators",
  "online calculator Pakistan",
  "money calculator Pakistan",
  "tax calculator Pakistan",
  "salary calculator Pakistan",
  "business calculator Pakistan",
];

export const toolSeo: Record<ToolSlug, SeoCluster> = {
  "salary-tax-calculator-pakistan": {
    title: "Salary Tax Calculator Pakistan 2026-27",
    description:
      "Calculate monthly and annual salary tax in Pakistan for tax year 2026-27 using enacted FBR slabs, with the formula and assumptions shown.",
    keywords: [
      "salary tax calculator Pakistan",
      "income tax calculator Pakistan 2026-27",
      "FBR tax calculator",
      "monthly salary tax Pakistan",
      "annual salary tax Pakistan",
    ],
  },
  "freelancer-tax-calculator-pakistan": {
    title: "Freelancer Tax Calculator Pakistan 2026-27",
    description:
      "Estimate Pakistan freelancer and IT export withholding for PSEB and other qualifying service exports, with ATL assumptions clearly explained.",
    keywords: [
      "freelancer tax calculator Pakistan",
      "PSEB tax calculator",
      "IT export tax Pakistan",
      "Section 154A calculator",
      "freelancer withholding tax Pakistan",
    ],
  },
  "filer-vs-non-filer-calculator": {
    title: "Filer vs Non-Filer Calculator Pakistan",
    description:
      "Compare estimated filer and non-filer property transaction withholding in Pakistan for purchase and sale scenarios with visible assumptions.",
    keywords: [
      "filer vs non filer calculator",
      "property tax calculator Pakistan",
      "236C tax calculator",
      "236K tax calculator",
      "ATL tax rates Pakistan",
    ],
  },
  "cod-profit-calculator": {
    title: "COD Profit Calculator Pakistan",
    description:
      "Calculate real COD e-commerce profit after delivery rate, returns, courier, packaging, advertising, COD fees and overhead in Pakistan.",
    keywords: [
      "COD profit calculator Pakistan",
      "ecommerce profit calculator Pakistan",
      "RTO calculator",
      "cash on delivery profit calculator",
      "delivery rate profit calculator",
    ],
  },
  "profit-margin-calculator": {
    title: "Profit Margin & Markup Calculator Pakistan",
    description:
      "Calculate profit, margin, markup and target selling price instantly. See the formula and understand the difference between margin and markup.",
    keywords: [
      "profit margin calculator",
      "markup calculator Pakistan",
      "selling price calculator",
      "gross margin calculator",
      "profit percentage calculator",
    ],
  },
  "marla-to-square-feet-calculator": {
    title: "Marla to Square Feet Calculator Pakistan",
    description:
      "Convert marla, kanal, square feet, square yards, gaz and square metres using 225, 250 or 272.25 square-foot marla standards.",
    keywords: [
      "marla to square feet calculator",
      "1 marla square feet Pakistan",
      "kanal to square feet",
      "marla to gaz calculator",
      "land area calculator Pakistan",
    ],
  },
  "electricity-bill-calculator-pakistan": {
    title: "Electricity Bill Calculator Pakistan",
    description:
      "Estimate a Pakistan electricity bill from units, tariff, fixed charges, adjustments and taxes. Uses your current rate for a transparent estimate.",
    keywords: [
      "electricity bill calculator Pakistan",
      "bijli bill calculator",
      "units to bill calculator Pakistan",
      "NEPRA bill estimator",
      "power bill calculator Pakistan",
    ],
  },
  "zakat-calculator-pakistan": {
    title: "Zakat Calculator Pakistan | 2.5% Net Assets",
    description:
      "Calculate a transparent 2.5% Zakat estimate from eligible assets, liabilities and the current nisab value you choose to follow.",
    keywords: [
      "Zakat calculator Pakistan",
      "2.5 percent Zakat calculator",
      "gold Zakat calculator Pakistan",
      "nisab calculator Pakistan",
      "Zakat on cash calculator",
    ],
  },
  "net-salary-calculator-pakistan": {
    title: "Net Salary Calculator Pakistan 2026-27",
    description:
      "Estimate monthly take-home salary in Pakistan after 2026-27 salary tax and other deductions, with a clear annual and monthly breakdown.",
    keywords: [
      "net salary calculator Pakistan",
      "take home salary calculator Pakistan",
      "salary after tax Pakistan",
      "monthly salary calculator",
      "gross to net salary Pakistan",
    ],
  },
  "discount-calculator": {
    title: "Discount Calculator Pakistan",
    description:
      "Calculate the discount amount, final price and combined effect of two sequential discounts with a clear percentage breakdown.",
    keywords: [
      "discount calculator Pakistan",
      "percentage discount calculator",
      "sale price calculator",
      "final price after discount",
      "double discount calculator",
    ],
  },
};

export const categorySeo: Record<string, SeoCluster> = {
  "tax-salary": {
    title: "Pakistan Tax & Salary Guides",
    description:
      "Understand salary tax, FBR slabs, filer status, freelancer tax and take-home pay in Pakistan through source-backed guides.",
    keywords: [
      "Pakistan tax guides",
      "salary tax Pakistan",
      "FBR tax slabs 2026-27",
      "freelancer tax Pakistan",
      "filer vs non filer Pakistan",
    ],
  },
  business: {
    title: "Pakistan Business Calculator Guides",
    description:
      "Practical guides for Pakistan e-commerce profit, COD returns, RTO costs, profit margin, markup and selling-price decisions.",
    keywords: [
      "business calculator Pakistan",
      "COD profit Pakistan",
      "ecommerce returns Pakistan",
      "profit margin guide",
      "markup vs margin",
    ],
  },
  bills: {
    title: "Pakistan Electricity Bill Guides",
    description:
      "Learn how Pakistan electricity bill estimates use units, tariffs, fixed charges, adjustments and taxes without hiding assumptions.",
    keywords: [
      "electricity bill guide Pakistan",
      "NEPRA tariff guide",
      "bijli bill calculation",
      "electricity units price Pakistan",
    ],
  },
  property: {
    title: "Pakistan Property & Land Measurement Guides",
    description:
      "Understand marla, kanal, square feet, gaz and the land-measurement standards used in different Pakistani property contexts.",
    keywords: [
      "property calculator Pakistan",
      "marla square feet Pakistan",
      "kanal marla conversion",
      "land measurement Pakistan",
    ],
  },
  "personal-finance": {
    title: "Pakistan Personal Finance Guides",
    description:
      "Clear guides for Zakat, discounts and everyday percentage calculations, with formulas, examples and important assumptions.",
    keywords: [
      "personal finance calculators Pakistan",
      "Zakat calculation Pakistan",
      "discount calculation",
      "percentage calculator guide",
    ],
  },
};

export function guideKeywords(
  title: string,
  category: GuideCategory,
  categorySlug?: string,
) {
  const categoryKeywords = categorySlug
    ? categorySeo[categorySlug]?.keywords || []
    : [];
  return [title, `${title} Pakistan`, ...categoryKeywords].slice(0, 7);
}

export function categoryImage(category: GuideCategory) {
  if (category === "Business") return "/images/cod-ecommerce-profit-tools.webp";
  if (
    category === "Bills" ||
    category === "Property" ||
    category === "Personal Finance"
  )
    return "/images/property-bills-personal-finance.webp";
  return "/images/pakistan-money-calculators-hero.webp";
}
