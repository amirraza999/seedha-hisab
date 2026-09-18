export type SalaryTaxResult = { annualIncome: number; annualTax: number; monthlyTax: number; annualTakeHome: number; monthlyTakeHome: number; effectiveRate: number; marginalRate: number; bracket: string };

export const salaryTax2026 = {
  taxYear: "2026–27",
  effectiveFrom: "2026-07-01",
  effectiveTo: "2027-06-30",
  lastVerified: "2026-09-10",
  source: "Finance Act 2026, First Schedule, Part I, Division I, clause (2)",
  sourceUrl: "https://download1.fbr.gov.pk/Docs/20266291261044366FinanceAct2026.pdf",
  brackets: [
    { max: 600_000, base: 0, floor: 0, rate: 0 },
    { max: 1_200_000, base: 0, floor: 600_000, rate: 0.01 },
    { max: 2_200_000, base: 6_000, floor: 1_200_000, rate: 0.11 },
    { max: 3_200_000, base: 116_000, floor: 2_200_000, rate: 0.20 },
    { max: 4_100_000, base: 316_000, floor: 3_200_000, rate: 0.25 },
    { max: 5_600_000, base: 541_000, floor: 4_100_000, rate: 0.29 },
    { max: 7_000_000, base: 976_000, floor: 5_600_000, rate: 0.32 },
    { max: Infinity, base: 1_424_000, floor: 7_000_000, rate: 0.35 },
  ],
} as const;

const percent = (value: number) => Math.min(100, Math.max(0, Number.isFinite(value) ? value : 0));

export function salaryTax(annualIncome: number): SalaryTaxResult {
  const income = Math.max(0, annualIncome || 0);
  const bracket = salaryTax2026.brackets.find((item) => income <= item.max) ?? salaryTax2026.brackets.at(-1)!;
  const annualTax = Math.max(0, bracket.base + Math.max(0, income - bracket.floor) * bracket.rate);
  return {
    annualIncome: income,
    annualTax,
    monthlyTax: annualTax / 12,
    annualTakeHome: income - annualTax,
    monthlyTakeHome: (income - annualTax) / 12,
    effectiveRate: income ? (annualTax / income) * 100 : 0,
    marginalRate: bracket.rate * 100,
    bracket: bracket.max === Infinity ? `Above Rs ${bracket.floor.toLocaleString("en-PK")}` : `Rs ${bracket.floor.toLocaleString("en-PK")} – ${bracket.max.toLocaleString("en-PK")}`,
  };
}

export function freelancerTax(income: number, pseB: boolean, atl: boolean) {
  const baseRate = pseB ? 0.0025 : 0.01;
  const rate = atl ? baseRate : baseRate * 2;
  const tax = Math.max(0, income) * rate;
  return { tax, net: Math.max(0, income) - tax, rate: rate * 100 };
}

export function propertyWithholding(value: number, transaction: "purchase" | "sale") {
  const filerRate = transaction === "purchase" ? 0.0125 : 0.0275;
  const filer = Math.max(0, value) * filerRate;
  const nonFiler = filer * 2;
  return { filer, nonFiler, difference: nonFiler - filer, filerRate: filerRate * 100, nonFilerRate: filerRate * 200 };
}

export function codProfit(input: { productCost: number; sellingPrice: number; orders: number; deliveryRate: number; courier: number; returnCourier: number; packaging: number; codFee: number; adSpend: number; overhead: number }) {
  const orders = Math.max(0, input.orders);
  const delivered = orders * (percent(input.deliveryRate) / 100);
  const returned = orders - delivered;
  const sales = delivered * input.sellingPrice;
  const product = delivered * input.productCost;
  const courier = delivered * input.courier;
  const rto = returned * input.returnCourier;
  const packaging = orders * Math.max(0, input.packaging);
  const cod = sales * (percent(input.codFee) / 100);
  const totalCost = product + courier + rto + packaging + cod + input.adSpend + input.overhead;
  const profit = sales - totalCost;
  const cpa = delivered ? input.adSpend / delivered : 0;
  const profitBeforeAds = profit + input.adSpend;
  return { delivered, returned, sales, totalCost, profit, margin: sales ? (profit / sales) * 100 : 0, profitPerDelivered: delivered ? profit / delivered : 0, roas: input.adSpend ? sales / input.adSpend : 0, cpa, breakEvenCpa: delivered ? profitBeforeAds / delivered : 0, breakEvenRoas: profitBeforeAds > 0 ? sales / profitBeforeAds : 0 };
}

export function marginCalc(cost: number, selling: number) {
  const profit = selling - cost;
  return { profit, margin: selling ? (profit / selling) * 100 : 0, markup: cost ? (profit / cost) * 100 : 0 };
}

export function requiredForMargin(cost: number, desiredMargin: number) {
  return desiredMargin >= 100 ? 0 : cost / (1 - desiredMargin / 100);
}

export function landConvert(value: number, unit: string, marlaSqFt: number) {
  const sqFt = unit === "marla" ? value * marlaSqFt : unit === "kanal" ? value * marlaSqFt * 20 : unit === "sqyd" ? value * 9 : unit === "sqm" ? value * 10.7639104167 : value;
  return { sqFt, marla: sqFt / marlaSqFt, kanal: sqFt / (marlaSqFt * 20), sqyd: sqFt / 9, sqm: sqFt / 10.7639104167, acres: sqFt / 43560 };
}

export function electricityEstimate(units: number, rate: number, fixed: number, fca: number, taxPercent: number) {
  const energy = Math.max(0, units) * Math.max(0, rate);
  const subtotal = energy + Math.max(0, fixed) + Math.max(0, fca);
  const taxes = subtotal * percent(taxPercent) / 100;
  return { energy, subtotal, taxes, total: subtotal + taxes };
}

export function electricitySlabEstimate(units: number, slabs: { upTo: number; ratePerUnit: number }[], fixedCharge: number, taxPercent: number) {
  const safeUnits = Math.max(0, units);
  let remaining = safeUnits;
  let floor = 0;
  let energy = 0;
  const breakdown: { from: number; to: number; units: number; rate: number; amount: number }[] = [];
  for (const slab of slabs) {
    if (remaining <= 0) break;
    const slabWidth = slab.upTo - floor;
    const unitsInSlab = Math.min(remaining, slabWidth);
    if (unitsInSlab > 0) {
      const amount = unitsInSlab * slab.ratePerUnit;
      energy += amount;
      breakdown.push({ from: floor + 1, to: slab.upTo === Infinity ? floor + unitsInSlab : slab.upTo, units: unitsInSlab, rate: slab.ratePerUnit, amount });
      remaining -= unitsInSlab;
    }
    floor = slab.upTo;
  }
  if (remaining > 0 && slabs.length > 0) {
    const lastSlab = slabs[slabs.length - 1];
    const amount = remaining * lastSlab.ratePerUnit;
    energy += amount;
    breakdown.push({ from: floor + 1, to: floor + remaining, units: remaining, rate: lastSlab.ratePerUnit, amount });
    remaining = 0;
  }
  const subtotal = energy + Math.max(0, fixedCharge);
  const taxes = subtotal * percent(taxPercent) / 100;
  return { energy, fixedCharge: Math.max(0, fixedCharge), subtotal, taxes, total: subtotal + taxes, breakdown };
}

export function zakatCalc(assets: number[], liabilities: number, nisab: number) {
  const totalAssets = assets.reduce((sum, value) => sum + Math.max(0, value || 0), 0);
  const netAssets = Math.max(0, totalAssets - Math.max(0, liabilities));
  return { totalAssets, netAssets, eligible: netAssets >= nisab, zakat: netAssets >= nisab ? netAssets * 0.025 : 0 };
}

export function discountCalc(price: number, first: number, second = 0) {
  const safePrice = Math.max(0, price);
  const afterFirst = safePrice * (1 - percent(first) / 100);
  const finalPrice = afterFirst * (1 - percent(second) / 100);
  return { discount: safePrice - finalPrice, finalPrice, effectiveDiscount: safePrice ? ((safePrice - finalPrice) / safePrice) * 100 : 0 };
}

export const BULKY_ITEM_THRESHOLD_GRAMS = 8000;
const BULKY_ITEM_SURCHARGE = 100;

export function isBulkyItem(weightGrams: number) {
  return weightGrams >= BULKY_ITEM_THRESHOLD_GRAMS;
}

export function fbmShippingFee(zone: 1 | 2 | 3 | 4, weightGrams: number, deliveryType: "door" | "collection", override = 0) {
  if (override > 0) return override;
  const bases = { 1: 100, 2: 130, 3: 160, 4: 200 };
  const steps = { 1: 15, 2: 20, 3: 25, 4: 30 };
  let fee = bases[zone] + Math.max(0, Math.ceil((weightGrams - 1000) / 500)) * steps[zone];
  if (deliveryType === "collection") fee *= 0.9;
  if (isBulkyItem(weightGrams)) fee += BULKY_ITEM_SURCHARGE;
  return fee;
}

/** Drop-off item handling fee, banded by selling price (Rs 10-60), per commonly reported 2026 Daraz seller fees. */
export function fbmDropoffHandlingFee(sellingPrice: number, override = 0) {
  if (override > 0) return override;
  return sellingPrice < 500 ? 10 : sellingPrice < 1500 ? 20 : sellingPrice < 3000 ? 35 : 60;
}

/** Pickup Service Fee, banded by weight (Rs 30-200); replaces the drop-off handling fee entirely when pickup is used. */
export function fbmPickupFee(weightGrams: number, override = 0) {
  if (override > 0) return override;
  return weightGrams < 500 ? 30 : weightGrams < 1000 ? 60 : weightGrams < 2000 ? 100 : weightGrams < 5000 ? 150 : 200;
}

export function fbmHandlingFee(sellingPrice: number, weightGrams: number, pickup: boolean, override = 0) {
  if (override > 0) return override;
  return pickup ? fbmPickupFee(weightGrams) : fbmDropoffHandlingFee(sellingPrice);
}

export type DarazProfitInput = {
  sellingPrice: number; purchasePrice: number; extraCharges: number; penalties: number;
  commissionPercent: number; paymentFeePercent: number; vatPercent: number;
  voucherOn: boolean; voucherPercent: number; freeShippingMaxOn: boolean;
  weightGrams: number; pickup: boolean; deliveryType: "door" | "collection"; zone: 1 | 2 | 3 | 4;
  pickPackFee: number; storageFee: number;
};

function darazSharedDeductions(input: DarazProfitInput) {
  const sp = Math.max(0, input.sellingPrice);
  const commissionAmount = sp * percent(input.commissionPercent) / 100;
  const paymentFeeAmount = sp * percent(input.paymentFeePercent) / 100;
  const voucherAmount = input.voucherOn ? sp * percent(input.voucherPercent) / 100 : 0;
  const freeShippingMaxAmount = input.freeShippingMaxOn ? Math.min(Math.max(sp * 0.06, 30), 200) : 0;
  const penalties = Math.max(0, input.penalties);
  const costTotal = Math.max(0, input.purchasePrice) + Math.max(0, input.extraCharges) + penalties;
  return { sp, commissionAmount, paymentFeeAmount, voucherAmount, freeShippingMaxAmount, penalties, costTotal };
}

function summarize(sp: number, profit: number, costTotal: number) {
  return { profit, margin: sp ? (profit / sp) * 100 : 0, roi: costTotal ? (profit / costTotal) * 100 : 0 };
}

export function darazFbmProfit(input: DarazProfitInput) {
  const { sp, commissionAmount, paymentFeeAmount, voucherAmount, freeShippingMaxAmount, penalties, costTotal } = darazSharedDeductions(input);
  const shippingFee = fbmShippingFee(input.zone, input.weightGrams, input.deliveryType);
  const handlingFee = fbmHandlingFee(sp, input.weightGrams, input.pickup);
  const vatBase = commissionAmount + paymentFeeAmount + handlingFee;
  const vatAmount = vatBase * percent(input.vatPercent) / 100;
  const totalDeductions = commissionAmount + paymentFeeAmount + voucherAmount + freeShippingMaxAmount + shippingFee + handlingFee + vatAmount;
  const profit = sp - totalDeductions - costTotal;
  return { commissionAmount, paymentFeeAmount, voucherAmount, freeShippingMaxAmount, shippingFee, handlingFee, vatAmount, penalties, costTotal, ...summarize(sp, profit, costTotal) };
}

export function darazFbdProfit(input: DarazProfitInput) {
  const { sp, commissionAmount, paymentFeeAmount, voucherAmount, freeShippingMaxAmount, penalties, costTotal } = darazSharedDeductions(input);
  const pickPackFee = Math.max(0, input.pickPackFee);
  const storageFee = Math.max(0, input.storageFee);
  const vatBase = commissionAmount + paymentFeeAmount + pickPackFee;
  const vatAmount = vatBase * percent(input.vatPercent) / 100;
  const totalDeductions = commissionAmount + paymentFeeAmount + voucherAmount + freeShippingMaxAmount + pickPackFee + storageFee + vatAmount;
  const profit = sp - totalDeductions - costTotal;
  return { commissionAmount, paymentFeeAmount, voucherAmount, freeShippingMaxAmount, pickPackFee, storageFee, vatAmount, penalties, costTotal, ...summarize(sp, profit, costTotal) };
}
