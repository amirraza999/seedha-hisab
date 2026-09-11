import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { rootRedirects } from "@/lib/redirects";

const pages: Record<
  string,
  { title: string; intro: string; sections: [string, string][] }
> = {
  about: {
    title: "About Seedha Hisab",
    intro:
      "Seedha Hisab is an independent calculator platform built to make Pakistani financial decisions clearer.",
    sections: [
      [
        "What we publish",
        "Focused calculators for tax, salary, business, bills, property and personal finance. We prefer a small number of useful tools over hundreds of thin pages.",
      ],
      [
        "What we are not",
        "We are not FBR, a government department, a law firm, an accounting practice or a religious authority.",
      ],
      [
        "Our standard",
        "Important formulas, assumptions, applicable periods and sources should be visible beside the result.",
      ],
    ],
  },
  contact: {
    title: "Contact",
    intro:
      "A direct contact channel will be added after the owner approves the public business email.",
    sections: [
      [
        "Report an issue",
        "For now, keep the page URL, your input values and the result you believe is wrong. Do not include passwords, tax credentials or sensitive account information.",
      ],
      [
        "Business enquiries",
        "Advertising, partnerships and press enquiries will use a separate approved address after launch.",
      ],
    ],
  },
  methodology: {
    title: "Calculation Methodology",
    intro:
      "The interface, calculation formula and changing rate data are kept separate so that rules can be updated without rewriting the whole tool.",
    sections: [
      [
        "Source order",
        "Official legislation and gazettes come first, followed by FBR, SBP, NEPRA and relevant public authorities. Reputable secondary sources are used only for context or when primary material is unavailable.",
      ],
      [
        "Verification",
        "Changing calculators show an applicable period and verification date. Boundary values are tested, including the exact threshold and values immediately above and below it.",
      ],
      [
        "Estimates",
        "A calculator result may differ from an official assessment because personal facts, adjustments, exemptions or later legal changes can matter.",
      ],
    ],
  },
  sources: {
    title: "Sources",
    intro:
      "Sources are displayed on the calculator pages where they affect the result.",
    sections: [
      [
        "Tax",
        "The primary current source is Pakistan’s Finance Act 2026 and the Income Tax Ordinance framework published by the Federal Board of Revenue.",
      ],
      [
        "Electricity",
        "Tariffs and monthly adjustments can differ by provider, category and billing period. The MVP therefore asks for the applicable rate instead of presenting one false nationwide figure.",
      ],
      [
        "Land and Zakat",
        "Land tools expose the selected marla standard. Zakat uses a nisab value entered by the user and does not present itself as a religious ruling.",
      ],
    ],
  },
  "editorial-policy": {
    title: "Editorial Policy",
    intro:
      "Content exists to help a person calculate or understand a decision—not to fill a keyword page.",
    sections: [
      [
        "Accuracy",
        "No rates, credentials, reviews or government relationships are invented.",
      ],
      [
        "Authorship",
        "Until a named qualified reviewer is formally engaged, the site does not claim professional review.",
      ],
      [
        "Updates",
        "Time-sensitive pages are revisited when budgets, tax acts or tariff decisions change.",
      ],
    ],
  },
  "corrections-policy": {
    title: "Corrections Policy",
    intro:
      "Material calculation errors should be corrected quickly and transparently.",
    sections: [
      [
        "What to report",
        "Share the calculator URL, the inputs used, the result shown and the source supporting a correction.",
      ],
      [
        "What happens next",
        "The formula and source are checked, tests are added for confirmed bugs, and the verified date is updated when appropriate.",
      ],
    ],
  },
  "privacy-policy": {
    title: "Privacy Policy",
    intro:
      "Normal calculator inputs are processed in the browser and are not intentionally stored or sent to our servers.",
    sections: [
      [
        "Analytics",
        "Analytics may be added after owner approval. Sensitive financial values will not be sent as analytics event parameters.",
      ],
      [
        "Cookies and ads",
        "Advertising is disabled during development. If AdSense is enabled later, this policy and any required consent controls will be updated first.",
      ],
      ["Contact forms", "No public contact form is active in this preview."],
    ],
  },
  terms: {
    title: "Terms of Use",
    intro:
      "By using the calculators, you agree to treat results as informational estimates.",
    sections: [
      [
        "Permitted use",
        "You may use the tools for personal and business planning.",
      ],
      [
        "No professional relationship",
        "Using the site does not create an accountant, lawyer, tax adviser or religious-adviser relationship.",
      ],
      [
        "Availability",
        "Tools may be updated, corrected or withdrawn when source data changes.",
      ],
    ],
  },
  disclaimer: {
    title: "Disclaimer",
    intro:
      "Calculations are estimates and do not determine your official tax, bill, legal obligation or religious ruling.",
    sections: [
      [
        "Financial and tax",
        "Verify significant decisions with the relevant authority or a qualified professional who understands your full circumstances.",
      ],
      [
        "Electricity",
        "Actual bills can include provider-specific taxes, arrears, meter factors, fuel adjustments and other charges.",
      ],
      [
        "Zakat",
        "The calculator is an arithmetic aid, not a fatwa. Consult a qualified scholar for questions about eligibility or methodology.",
      ],
    ],
  },
};

export function generateStaticParams() {
  return [...Object.keys(pages), ...Object.keys(rootRedirects)].map((info) => ({
    info,
  }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ info: string }>;
}): Promise<Metadata> {
  const { info } = await params;
  const page = pages[info];
  return page
    ? {
        title: page.title,
        description: page.intro,
        alternates: { canonical: `/${info}` },
      }
    : {};
}
export default async function InfoPage({
  params,
}: {
  params: Promise<{ info: string }>;
}) {
  const { info } = await params;
  const destination = rootRedirects[info];
  if (destination) permanentRedirect(destination);
  const page = pages[info];
  if (!page) notFound();
  return (
    <>
      <SiteHeader />
      <main className="mx-auto min-h-[65vh] max-w-4xl px-4 py-14 sm:px-6">
        <p className="eyebrow">Trust center</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-[#102a43]">
          {page.title}
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">{page.intro}</p>
        <div className="mt-10 grid gap-4">
          {page.sections.map(([title, text]) => (
            <section
              key={title}
              className="rounded-2xl border border-slate-200 p-6"
            >
              <h2 className="text-lg font-extrabold text-[#102a43]">{title}</h2>
              <p className="mt-3 leading-7 text-slate-600">{text}</p>
            </section>
          ))}
        </div>
        {info === "sources" && (
          <section className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
            <h2 className="text-lg font-extrabold text-[#102a43]">
              Official resources
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="https://www.fbr.gov.pk/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-[#102a43] px-4 py-3 text-sm font-bold text-white hover:bg-[#163b5e]"
              >
                Federal Board of Revenue
              </a>
              <a
                href="https://nepra.org.pk/tariff/Tariff.php"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-[#102a43] px-4 py-3 text-sm font-bold text-white hover:bg-[#163b5e]"
              >
                NEPRA tariff decisions
              </a>
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
