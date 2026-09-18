/**
 * Daraz seller fee reference data — publicly reported 2026 category
 * commission ranges and provincial VAT rates. Daraz does not publish a
 * single official numeric table for every category or for FBM shipping
 * zone/handling rates, so these are commonly reported estimates, not an
 * official Daraz price list. Sellers should confirm exact figures in
 * their own Daraz Seller Center before pricing a product.
 */

export const darazCategories = [
  { value: 3, label: "Mobiles & Tablets — 3%" },
  { value: 4, label: "Electronics & Appliances — 4%" },
  { value: 18, label: "Fashion & Clothing — 18%" },
  { value: 12, label: "Beauty & Health — 12%" },
  { value: 10, label: "Home & Living — 10%" },
  { value: 2, label: "Groceries & Essentials — 2%" },
] as const;

export const darazProvinces = [
  { value: 15, label: "Sindh / KPK / Balochistan — 15% VAT" },
  { value: 16, label: "Punjab — 16% VAT" },
] as const;

export const DARAZ_PAYMENT_FEE_PCT = 2.25;

export const darazShippingZones = [1, 2, 3, 4] as const;
