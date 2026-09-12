/**
 * DRAFT / PLACEHOLDER DATA — NOT VERIFIED AGAINST AN OFFICIAL NEPRA SOURCE.
 *
 * These slab rates and fixed charges are intentionally round, made-up
 * placeholders so nobody mistakes them for real figures. They exist only to
 * build and test the DISCO-based UI and slab-calculation logic ahead of time.
 *
 * DO NOT treat this file as a source of truth for a real electricity bill.
 * Before enabling this for real users, replace every value below with the
 * exact figures from NEPRA's official consumer-end tariff notification
 * (most recently restructured by SRO 279(I)/2026, effective 12 Feb 2026),
 * and set `verified: true` with a real `source`/`sourceUrl`/`verifiedDate`.
 */

export type ConsumerCategory = "lifeline" | "protected" | "unprotected";

export type TariffSlab = {
  upTo: number; // inclusive upper bound in units; Infinity for the open-ended top slab
  ratePerUnit: number; // PKR per unit — PLACEHOLDER
};

export type DiscoTariff = {
  slug: string;
  name: string;
  categories: Record<
    ConsumerCategory,
    {
      label: string;
      fixedCharge: number; // PKR per month — PLACEHOLDER
      slabs: TariffSlab[];
    }
  >;
};

export const tariffDataVerified = false;
export const tariffDataNote =
  "Draft placeholder rates — pending verification against NEPRA's official SRO 279(I)/2026 consumer-end tariff notification. Do not use for a real bill; use Manual Rate mode instead.";

/** Ex-WAPDA distribution companies NEPRA has notified on one uniform domestic schedule. */
const XWDISCO_SLUGS = [
  ["lesco", "LESCO — Lahore"],
  ["gepco", "GEPCO — Gujranwala"],
  ["fesco", "FESCO — Faisalabad"],
  ["mepco", "MEPCO — Multan"],
  ["iesco", "IESCO — Islamabad"],
  ["pesco", "PESCO — Peshawar"],
  ["hesco", "HESCO — Hyderabad"],
  ["sepco", "SEPCO — Sukkur"],
  ["qesco", "QESCO — Quetta"],
  ["tesco", "TESCO — Tribal areas"],
] as const;

const xwdiscoCategories: DiscoTariff["categories"] = {
  lifeline: {
    label: "Lifeline (up to 100 units)",
    fixedCharge: 0,
    slabs: [
      { upTo: 50, ratePerUnit: 5 },
      { upTo: 100, ratePerUnit: 8 },
    ],
  },
  protected: {
    label: "Protected (average up to 200 units)",
    fixedCharge: 200,
    slabs: [
      { upTo: 100, ratePerUnit: 10 },
      { upTo: 200, ratePerUnit: 13 },
    ],
  },
  unprotected: {
    label: "Unprotected (above 200 units)",
    fixedCharge: 500,
    slabs: [
      { upTo: 300, ratePerUnit: 20 },
      { upTo: 500, ratePerUnit: 28 },
      { upTo: 700, ratePerUnit: 35 },
      { upTo: Infinity, ratePerUnit: 42 },
    ],
  },
};

const keCategories: DiscoTariff["categories"] = {
  lifeline: {
    label: "Lifeline (up to 100 units)",
    fixedCharge: 0,
    slabs: [
      { upTo: 50, ratePerUnit: 5 },
      { upTo: 100, ratePerUnit: 8 },
    ],
  },
  protected: {
    label: "Protected (average up to 200 units)",
    fixedCharge: 250,
    slabs: [
      { upTo: 100, ratePerUnit: 11 },
      { upTo: 200, ratePerUnit: 14 },
    ],
  },
  unprotected: {
    label: "Unprotected (above 200 units)",
    fixedCharge: 550,
    slabs: [
      { upTo: 300, ratePerUnit: 21 },
      { upTo: 500, ratePerUnit: 29 },
      { upTo: 700, ratePerUnit: 36 },
      { upTo: Infinity, ratePerUnit: 43 },
    ],
  },
};

export const discoTariffs: DiscoTariff[] = [
  ...XWDISCO_SLUGS.map(([slug, name]) => ({
    slug,
    name,
    categories: xwdiscoCategories,
  })),
  { slug: "ke", name: "K-Electric — Karachi", categories: keCategories },
];

export function getDiscoTariff(slug: string) {
  return discoTariffs.find((disco) => disco.slug === slug);
}
