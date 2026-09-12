import test from "node:test";
import assert from "node:assert/strict";
import {
  codProfit,
  discountCalc,
  electricitySlabEstimate,
  freelancerTax,
  landConvert,
  marginCalc,
  propertyWithholding,
  salaryTax,
} from "../lib/calculations.ts";

test("salary tax is continuous at every 2026-27 slab boundary", () => {
  const cases = [
    [600_000, 0],
    [1_200_000, 6_000],
    [2_200_000, 116_000],
    [3_200_000, 316_000],
    [4_100_000, 541_000],
    [5_600_000, 976_000],
    [7_000_000, 1_424_000],
  ];
  for (const [income, expected] of cases) assert.equal(salaryTax(income).annualTax, expected);
});

test("salary tax applies the top marginal rate above Rs 7m", () => {
  assert.equal(salaryTax(8_000_000).annualTax, 1_774_000);
});

test("PSEB freelancer on ATL uses 0.25%", () => {
  assert.deepEqual(freelancerTax(4_800_000, true, true), { tax: 12_000, net: 4_788_000, rate: 0.25 });
});

test("property purchase comparison doubles the base rate off ATL", () => {
  assert.deepEqual(propertyWithholding(10_000_000, "purchase"), {
    filer: 125_000, nonFiler: 250_000, difference: 125_000, filerRate: 1.25, nonFilerRate: 2.5,
  });
});

test("common arithmetic calculators match worked examples", () => {
  const margin = marginCalc(1_000, 1_500);
  assert.equal(margin.profit, 500);
  assert.ok(Math.abs(margin.margin - 33.33333333333333) < 1e-10);
  assert.equal(margin.markup, 50);
  assert.deepEqual(discountCalc(45_000, 25), { discount: 11_250, finalPrice: 33_750, effectiveDiscount: 25 });
  assert.equal(landConvert(5, "marla", 225).sqFt, 1_125);
});

test("electricity slab estimate splits units across slabs correctly", () => {
  const slabs = [
    { upTo: 300, ratePerUnit: 20 },
    { upTo: 500, ratePerUnit: 28 },
    { upTo: Infinity, ratePerUnit: 42 },
  ];
  const within = electricitySlabEstimate(250, slabs, 500, 0);
  assert.equal(within.energy, 5_000);
  assert.equal(within.total, 5_500);
  const spanning = electricitySlabEstimate(400, slabs, 500, 0);
  assert.equal(spanning.energy, 300 * 20 + 100 * 28);
  assert.equal(spanning.breakdown.length, 2);
});

test("electricity slab estimate never drops units beyond the last defined slab", () => {
  const cappedSlabs = [
    { upTo: 100, ratePerUnit: 10 },
    { upTo: 200, ratePerUnit: 13 },
  ];
  const r = electricitySlabEstimate(250, cappedSlabs, 0, 0);
  assert.equal(r.energy, 100 * 10 + 100 * 13 + 50 * 13);
});

test("COD model accounts for delivered and returned orders", () => {
  const result = codProfit({ productCost: 1_000, sellingPrice: 2_000, orders: 100, deliveryRate: 70, courier: 150, returnCourier: 200, packaging: 50, codFee: 2, adSpend: 20_000, overhead: 5_000 });
  assert.equal(result.delivered, 70);
  assert.equal(result.returned, 30);
  assert.equal(result.sales, 140_000);
  assert.equal(result.profit, 20_700);
});
