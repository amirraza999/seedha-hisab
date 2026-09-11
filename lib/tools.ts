import {
  Banknote,
  BriefcaseBusiness,
  Calculator,
  CirclePercent,
  HandCoins,
  House,
  Landmark,
  ReceiptText,
  Scale,
  Zap,
} from "lucide-react";

export type ToolSlug =
  | "salary-tax-calculator-pakistan"
  | "freelancer-tax-calculator-pakistan"
  | "filer-vs-non-filer-calculator"
  | "cod-profit-calculator"
  | "profit-margin-calculator"
  | "marla-to-square-feet-calculator"
  | "electricity-bill-calculator-pakistan"
  | "zakat-calculator-pakistan"
  | "net-salary-calculator-pakistan"
  | "discount-calculator";

export const tools = [
  {
    slug: "salary-tax-calculator-pakistan",
    name: "Salary Tax Calculator Pakistan",
    urdu: "تنخواہ ٹیکس",
    description:
      "Estimate monthly and annual salary tax using enacted 2026–27 FBR slabs.",
    category: "Tax & Salary",
    icon: Banknote,
    featured: true,
  },
  {
    slug: "freelancer-tax-calculator-pakistan",
    name: "Freelancer Tax Calculator Pakistan",
    urdu: "فری لانسر ٹیکس",
    description:
      "Compare PSEB, other service-export and ATL withholding estimates.",
    category: "Tax & Salary",
    icon: BriefcaseBusiness,
    featured: true,
  },
  {
    slug: "filer-vs-non-filer-calculator",
    name: "Filer vs Non-Filer Calculator Pakistan",
    urdu: "فائلر بمقابلہ نان فائلر",
    description:
      "See the estimated property transaction withholding difference instantly.",
    category: "Tax & Salary",
    icon: Scale,
    featured: true,
  },
  {
    slug: "cod-profit-calculator",
    name: "COD Profit Calculator Pakistan",
    urdu: "کیش آن ڈیلیوری منافع",
    description:
      "Model delivered orders, returns, courier charges, ads and real net profit.",
    category: "Business",
    icon: ReceiptText,
    featured: true,
  },
  {
    slug: "profit-margin-calculator",
    name: "Margin & Markup Calculator",
    urdu: "مارجن اور مارک اپ",
    description:
      "Calculate profit, margin, markup and the selling price you need.",
    category: "Business",
    icon: CirclePercent,
    featured: false,
  },
  {
    slug: "marla-to-square-feet-calculator",
    name: "Marla to Square Feet Calculator Pakistan",
    urdu: "مرلہ اور رقبہ",
    description:
      "Convert marla, kanal, square feet, gaz and metres using multiple standards.",
    category: "Property",
    icon: House,
    featured: false,
  },
  {
    slug: "electricity-bill-calculator-pakistan",
    name: "Electricity Bill Calculator Pakistan",
    urdu: "بجلی بل اندازہ",
    description:
      "Build a transparent estimate from units, tariff, taxes and adjustments.",
    category: "Bills",
    icon: Zap,
    featured: false,
  },
  {
    slug: "zakat-calculator-pakistan",
    name: "Zakat Calculator Pakistan",
    urdu: "زکوٰۃ کیلکولیٹر",
    description:
      "Calculate eligible net assets transparently using your chosen nisab value.",
    category: "Personal Finance",
    icon: HandCoins,
    featured: false,
  },
  {
    slug: "net-salary-calculator-pakistan",
    name: "Net Salary Calculator Pakistan",
    urdu: "خالص تنخواہ",
    description:
      "Estimate take-home pay after 2026–27 salary tax and your deductions.",
    category: "Tax & Salary",
    icon: Landmark,
    featured: false,
  },
  {
    slug: "discount-calculator",
    name: "Discount Calculator",
    urdu: "ڈسکاؤنٹ کیلکولیٹر",
    description:
      "Find the discount amount and final price, including sequential discounts.",
    category: "Personal Finance",
    icon: Calculator,
    featured: false,
  },
] as const;

export type Tool = (typeof tools)[number];

export function getTool(slug: string) {
  return tools.find((tool) => tool.slug === slug);
}

export const categories = [
  "Tax & Salary",
  "Business",
  "Bills",
  "Property",
  "Personal Finance",
] as const;
