/**
 * Pakistan domestic electricity tariff reference data.
 *
 * Source: NEPRA's Consumer End Tariff decision (Annex-C, effective
 * 01.01.2026) for slab rates and fixed charges, and the July 2026
 * Fuel Charges Adjustment (FCA) notification for the default FCA rate.
 * All ex-WAPDA DISCOs bill on this one uniform national schedule; NEPRA's
 * uniform-tariff decision applies the same schedule to K-Electric.
 *
 * Fixed charges for the 501+ unit non-protected bands are carried
 * forward from the January 2026 determination and have not been
 * individually reconfirmed against later revisions. As with every
 * tariff on this site, treat this as a well-sourced estimate and
 * check your current bill for the exact figures that apply to you —
 * NEPRA revises rates periodically (most recently via the FCA/QTA
 * adjustment cycle).
 */

export const TARIFF_VERIFIED_DATE = "18 September 2026";
export const TARIFF_SOURCE_NOTE =
  "NEPRA Consumer End Tariff (Annex-C, effective 01.01.2026) and the July 2026 FCA notification.";
export const DEFAULT_FCA_RATE_PER_UNIT = 2.0581;
export const PTV_FEE = 35;

export type ElectricityStatus = "protected" | "unprotected";

type CumulativeSlab = { upTo: number; ratePerUnit: number };
type WholeSlabBand = { upTo: number; ratePerUnit: number; fixedCharge: number };

/** Lifeline: cumulative (telescoping) bands, no fixed charge, FCA-exempt. */
export const LIFELINE_SLABS: CumulativeSlab[] = [
  { upTo: 50, ratePerUnit: 3.95 },
  { upTo: 100, ratePerUnit: 7.74 },
];

/** Protected: cumulative (telescoping) bands. */
export const PROTECTED_SLABS: CumulativeSlab[] = [
  { upTo: 100, ratePerUnit: 10.54 },
  { upTo: 200, ratePerUnit: 13.01 },
];

export const PROTECTED_FIXED_BANDS: { upTo: number; fixedCharge: number }[] = [
  { upTo: 100, fixedCharge: 200 },
  { upTo: 200, fixedCharge: 300 },
];

/**
 * Non-protected: "whole-slab" billing — the entire month's consumption is
 * charged at the rate of the single slab it falls into, not telescoped
 * across bands like income tax or the protected/lifeline categories above.
 */
export const NON_PROTECTED_BANDS: WholeSlabBand[] = [
  { upTo: 100, ratePerUnit: 22.44, fixedCharge: 0 },
  { upTo: 200, ratePerUnit: 28.91, fixedCharge: 0 },
  { upTo: 300, ratePerUnit: 33.1, fixedCharge: 0 },
  { upTo: 400, ratePerUnit: 36.46, fixedCharge: 400 },
  { upTo: 500, ratePerUnit: 38.95, fixedCharge: 500 },
  { upTo: 600, ratePerUnit: 40.22, fixedCharge: 600 },
  { upTo: 700, ratePerUnit: 41.85, fixedCharge: 800 },
  { upTo: Infinity, ratePerUnit: 47.2, fixedCharge: 1000 },
];

export const CITY_TO_DISCO: Record<string, string> = {
  karachi: "ke",
  lahore: "lesco",
  faisalabad: "fesco",
  multan: "mepco",
  islamabad: "iesco",
  gujranwala: "gepco",
  hyderabad: "hesco",
  peshawar: "pesco",
  quetta: "qesco",
};

export const DISCO_NAMES: Record<string, string> = {
  ke: "K-Electric",
  lesco: "LESCO",
  fesco: "FESCO",
  mepco: "MEPCO",
  iesco: "IESCO",
  gepco: "GEPCO",
  hesco: "HESCO",
  pesco: "PESCO",
  qesco: "QESCO",
};

export const cities = [
  { value: "karachi", label: "Karachi" },
  { value: "lahore", label: "Lahore" },
  { value: "faisalabad", label: "Faisalabad" },
  { value: "multan", label: "Multan" },
  { value: "islamabad", label: "Islamabad / Rawalpindi" },
  { value: "gujranwala", label: "Gujranwala / Sialkot" },
  { value: "hyderabad", label: "Hyderabad / Sukkur" },
  { value: "peshawar", label: "Peshawar" },
  { value: "quetta", label: "Quetta" },
  { value: "other", label: "Other — I'll pick my DISCO" },
] as const;

export const discoOptions = Object.entries(DISCO_NAMES).map(([value, label]) => ({ value, label }));
