/**
 * Daraz seller fee reference data — publicly reported 2026 category
 * commission ranges and provincial VAT rates. Daraz does not publish a
 * single official numeric table for every category or for FBM shipping
 * zone/handling rates, so these are commonly reported estimates, not an
 * official Daraz price list. Sellers should confirm exact figures in
 * their own Daraz Seller Center before pricing a product.
 */

export const darazCategories = [
  { slug: "groceries", commission: 2, label: "Groceries & Essentials — 2%" },
  { slug: "mobiles", commission: 3, label: "Mobiles & Tablets — 3%" },
  { slug: "electronics", commission: 4, label: "Electronics & Appliances — 4%" },
  { slug: "computing", commission: 5, label: "Computing & Laptops — 5%" },
  { slug: "cameras", commission: 5, label: "Cameras — 5%" },
  { slug: "automotive", commission: 6, label: "Automotive & Motorbike — 6%" },
  { slug: "books", commission: 8, label: "Books, Stationery & Hobbies — 8%" },
  { slug: "pets", commission: 8, label: "Pet Supplies — 8%" },
  { slug: "furniture", commission: 8, label: "Furniture — 8%" },
  { slug: "home", commission: 10, label: "Home & Living — 10%" },
  { slug: "toys", commission: 10, label: "Toys, Baby & Kids — 10%" },
  { slug: "sports", commission: 10, label: "Sports & Outdoors — 10%" },
  { slug: "beauty", commission: 12, label: "Beauty & Health — 12%" },
  { slug: "accessories", commission: 12, label: "Mobile & Computer Accessories — 12%" },
  { slug: "bags", commission: 15, label: "Bags & Luggage — 15%" },
  { slug: "watches", commission: 15, label: "Watches, Jewelry & Sunglasses — 15%" },
  { slug: "fashion", commission: 18, label: "Fashion & Clothing — 18%" },
] as const;

export function getDarazCategoryCommission(slug: string) {
  return darazCategories.find((c) => c.slug === slug)?.commission ?? 0;
}

export const darazProvinces = [
  { value: 15, label: "Sindh / KPK / Balochistan — 15% VAT" },
  { value: 16, label: "Punjab — 16% VAT" },
] as const;

export const DARAZ_PAYMENT_FEE_PCT = 2.25;

export const darazShippingZones = [1, 2, 3, 4] as const;
