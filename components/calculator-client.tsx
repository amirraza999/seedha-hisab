"use client";

import { Children, useState } from "react";
import { Copy, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { codProfit, darazFbdProfit, darazFbmProfit, discountCalc, electricityEstimate, electricitySlabEstimate, freelancerTax, isBulkyItem, landConvert, marginCalc, propertyWithholding, requiredForMargin, salaryTax } from "@/lib/calculations";
import { darazCategories, darazProvinces, DARAZ_PAYMENT_FEE_PCT, getDarazCategoryCommission } from "@/lib/daraz-fees";
import { discoTariffs, getDiscoTariff, tariffDataNote, type ConsumerCategory } from "@/lib/electricity-tariffs";
import type { ToolSlug } from "@/lib/tools";

const money = (n: number) => `Rs ${Math.round(Number.isFinite(n) ? n : 0).toLocaleString("en-PK")}`;
const num = (value: string) => Math.max(0, Number(value.replace(/[^0-9.]/g, "")) || 0);

function Field({ label, value, onChange, suffix, hint }: { label: string; value: string; onChange: (v: string) => void; suffix?: string; hint?: string }) {
  return <label className="grid gap-2 text-sm font-bold text-slate-700"><span>{label}</span><span className="relative"><Input value={value} inputMode="decimal" onChange={e => onChange(e.target.value)} className="h-12 rounded-xl border-slate-300 bg-white pr-14 text-base font-semibold focus-visible:ring-emerald-500" /><span className="pointer-events-none absolute right-4 top-3.5 text-xs font-bold text-slate-400">{suffix}</span></span>{hint && <small className="font-normal leading-5 text-slate-500">{hint}</small>}</label>;
}

function SelectField({ label, value, onChange, children }: { label: string; value: string; onChange: (v: string) => void; children: React.ReactNode }) {
  return <label className="grid gap-2 text-sm font-bold text-slate-700"><span>{label}</span><select value={value} onChange={e => onChange(e.target.value)} className="h-12 rounded-xl border border-slate-300 bg-white px-3 text-base font-semibold outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100">{children}</select></label>;
}

function ToggleField({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return <label className="flex min-w-0 items-center gap-2 text-sm font-bold text-slate-700"><input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} className="h-4 w-4 shrink-0 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" /><span className="min-w-0">{label}</span></label>;
}

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.77.46 3.44 1.27 4.89L2 22l5.25-1.28A9.96 9.96 0 0 0 12.04 22c5.52 0 10-4.48 10-10s-4.48-10-10-10Zm0 18.13c-1.6 0-3.15-.43-4.5-1.24l-.32-.19-3.12.76.83-3.05-.21-.32a8.13 8.13 0 0 1-1.25-4.35c0-4.5 3.66-8.16 8.17-8.16 4.5 0 8.16 3.66 8.16 8.16 0 4.51-3.66 8.16-8.16 8.16Zm4.47-6.12c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.78.95-.14.16-.29.18-.53.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.29.36-.43.12-.14.16-.24.24-.4.08-.16.04-.31-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.42-.55-.42-.14-.01-.31-.01-.47-.01-.16 0-.43.06-.65.31-.22.24-.86.84-.86 2.05s.88 2.38 1 2.54c.12.16 1.73 2.64 4.19 3.7.59.25 1.05.4 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.44-.59 1.65-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z"/></svg>;
}

function Result({ title, primary, rows, formula, note }: { title: string; primary: string; rows: [string, string][]; formula?: string; note?: string }) {
  const shareText = `${title}: ${primary}\n${rows.map(([a,b]) => `${a}: ${b}`).join("\n")}\nCalculated with Seedha Hisab`;
  async function copy() { await navigator.clipboard?.writeText(shareText); }
  async function share() { if (navigator.share) await navigator.share({ title, text: shareText }); else await copy(); }
  function whatsapp() { window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank", "noopener,noreferrer"); }
  return <section aria-live="polite" className="overflow-hidden rounded-2xl bg-[#102a43] text-white shadow-[0_18px_50px_rgba(15,42,67,.18)]">
    <div className="border-b border-white/10 p-6"><p className="text-xs font-extrabold uppercase tracking-[.16em] text-emerald-300">{title}</p><p className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">{primary}</p>{note && <p className="mt-3 text-sm leading-6 text-slate-300">{note}</p>}</div>
    <dl className="grid gap-px bg-white/10 sm:grid-cols-2">{rows.map(([label,value]) => <div key={label} className="bg-[#102a43] p-4"><dt className="text-xs font-semibold text-slate-400">{label}</dt><dd className="mt-1 text-base font-bold">{value}</dd></div>)}</dl>
    {formula && <div className="border-t border-white/10 px-6 py-4 text-sm text-slate-300"><strong className="text-white">Formula: </strong>{formula}</div>}
    <div className="flex flex-wrap gap-2 border-t border-white/10 p-4">
      <Button onClick={copy} variant="secondary" className="rounded-xl"><Copy size={16} /> Copy result</Button>
      <Button onClick={whatsapp} className="rounded-xl bg-[#25D366] text-[#06251c] hover:bg-[#1fbd5a]"><WhatsAppIcon /> WhatsApp</Button>
      <Button onClick={share} className="rounded-xl bg-emerald-500 text-[#06251c] hover:bg-emerald-400"><Share2 size={16} /> Share</Button>
    </div>
  </section>;
}

export function CalculatorClient({ slug }: { slug: ToolSlug }) {
  const [v, setV] = useState<Record<string,string>>({
    salary: "200000", annual: "2400000", income: "2400000", property: "10000000", productCost: "1200", sellingPrice: "2500", orders: "100", deliveryRate: "70", courier: "220", returnCourier: "180", packaging: "70", codFee: "1", adSpend: "15000", overhead: "8000", cost: "1000", selling: "1500", desiredMargin: "30", land: "5", marlaStandard: "225", units: "250", unitRate: "34.47", fixed: "0", fca: "0", tax: "18", cash: "300000", bank: "600000", gold: "500000", silver: "0", investments: "200000", inventory: "0", receivables: "0", liabilities: "100000", nisab: "250000", deductions: "10000", price: "45000", discount1: "25", discount2: "0", darazSp: "2000", darazPurchase: "900", darazExtra: "0", darazPenalties: "0", darazVoucherPct: "3", darazWeight: "500", darazPickPack: "60", darazStorage: "0"
  });
  const [mode, setMode] = useState<Record<string,string>>({ incomePeriod: "monthly", pseB: "yes", atl: "yes", transaction: "purchase", landUnit: "marla", electricityMode: "manual", disco: "lesco", consumerCategory: "protected", darazCategory: "fashion", darazProvince: "15", darazVoucherOn: "no", darazFsmOn: "no", darazHandlingMode: "dropoff", darazDeliveryType: "door", darazZone: "1" });
  const [darazTab, setDarazTab] = useState<"fbm" | "fbd">("fbm");
  const [darazCalculated, setDarazCalculated] = useState(false);
  const set = (key: string) => (value: string) => setV(s => ({...s, [key]: value}));

  if (slug === "salary-tax-calculator-pakistan" || slug === "net-salary-calculator-pakistan") {
    const isNet = slug === "net-salary-calculator-pakistan";
    const annual = mode.incomePeriod === "monthly" ? num(v.salary) * 12 : num(v.annual);
    const r = salaryTax(annual); const deductions = isNet ? num(v.deductions) : 0; const monthlyNet = r.monthlyTakeHome - deductions;
    return <CalcShell>{!isNet && <SelectField label="Income period" value={mode.incomePeriod} onChange={x => setMode(s=>({...s,incomePeriod:x}))}><option value="monthly">Monthly salary</option><option value="annual">Annual salary</option></SelectField>}<Field label={mode.incomePeriod === "annual" && !isNet ? "Annual salary" : "Gross monthly salary"} value={mode.incomePeriod === "annual" && !isNet ? v.annual : v.salary} onChange={set(mode.incomePeriod === "annual" && !isNet ? "annual" : "salary")} suffix="PKR" />{isNet && <Field label="Other monthly deductions" value={v.deductions} onChange={set("deductions")} suffix="PKR" hint="Provident fund or any employer-specific deduction you enter." />}<Result title={isNet ? "Estimated monthly take-home" : "Estimated annual tax"} primary={money(isNet ? monthlyNet : r.annualTax)} rows={isNet ? [["Gross monthly salary", money(num(v.salary))],["Estimated monthly tax",money(r.monthlyTax)],["Other deductions",money(deductions)],["Effective tax rate",`${r.effectiveRate.toFixed(2)}%`]] : [["Monthly tax",money(r.monthlyTax)],["Monthly take-home",money(r.monthlyTakeHome)],["Applicable income band",r.bracket],["Marginal / effective rate",`${r.marginalRate}% / ${r.effectiveRate.toFixed(2)}%`]]} formula={`Fixed slab amount + ${r.marginalRate}% of income above the slab floor`} note="Uses Finance Act 2026 salary slabs for Tax Year 2026–27. Estimate only." /></CalcShell>;
  }

  if (slug === "freelancer-tax-calculator-pakistan") {
    const r = freelancerTax(num(v.income), mode.pseB === "yes", mode.atl === "yes");
    return <CalcShell><Field label="Annual export receipts" value={v.income} onChange={set("income")} suffix="PKR" /><SelectField label="PSEB-registered IT / ITeS exporter?" value={mode.pseB} onChange={x=>setMode(s=>({...s,pseB:x}))}><option value="yes">Yes — PSEB registered</option><option value="no">No / other export services</option></SelectField><SelectField label="Active Taxpayers List status" value={mode.atl} onChange={x=>setMode(s=>({...s,atl:x}))}><option value="yes">On ATL</option><option value="no">Not on ATL</option></SelectField><Result title="Estimated withholding tax" primary={money(r.tax)} rows={[["Applicable rate",`${r.rate}%`],["Estimated net receipts",money(r.net)],["Monthly equivalent tax",money(r.tax/12)],["Tax basis","Gross eligible export receipts"]]} formula={`Gross export receipts × ${r.rate}%`} note="Section 154A treatment depends on eligibility, banking-channel evidence and compliance. Confirm your case professionally." /></CalcShell>;
  }

  if (slug === "filer-vs-non-filer-calculator") {
    const r = propertyWithholding(num(v.property), mode.transaction as "purchase"|"sale");
    return <CalcShell><SelectField label="Property transaction" value={mode.transaction} onChange={x=>setMode(s=>({...s,transaction:x}))}><option value="purchase">Purchase — section 236K</option><option value="sale">Sale / transfer — section 236C</option></SelectField><Field label="Property value / consideration" value={v.property} onChange={set("property")} suffix="PKR" /><Result title="Estimated non-filer extra cost" primary={money(r.difference)} rows={[[`Filer estimate (${r.filerRate}%)`,money(r.filer)],[`Not on ATL estimate (${r.nonFilerRate}%)`,money(r.nonFiler)],["Difference",money(r.difference)],["Applicable period","Tax Year 2026–27"]]} formula={`Transaction value × applicable section rate`} note="This compares ATL vs not-on-ATL withholding, not final capital-gains liability." /></CalcShell>;
  }

  if (slug === "cod-profit-calculator") {
    const r = codProfit({ productCost:num(v.productCost), sellingPrice:num(v.sellingPrice), orders:num(v.orders), deliveryRate:num(v.deliveryRate), courier:num(v.courier), returnCourier:num(v.returnCourier), packaging:num(v.packaging), codFee:num(v.codFee), adSpend:num(v.adSpend), overhead:num(v.overhead) });
    return <CalcShell><div className="grid gap-4 sm:grid-cols-2"><Field label="Product cost" value={v.productCost} onChange={set("productCost")} suffix="PKR"/><Field label="Selling price" value={v.sellingPrice} onChange={set("sellingPrice")} suffix="PKR"/><Field label="Orders" value={v.orders} onChange={set("orders")}/><Field label="Delivery rate" value={v.deliveryRate} onChange={set("deliveryRate")} suffix="%"/><Field label="Courier / delivered" value={v.courier} onChange={set("courier")} suffix="PKR"/><Field label="Return courier / RTO" value={v.returnCourier} onChange={set("returnCourier")} suffix="PKR"/><Field label="Packaging / order" value={v.packaging} onChange={set("packaging")} suffix="PKR"/><Field label="COD fee" value={v.codFee} onChange={set("codFee")} suffix="%"/><Field label="Total ad spend" value={v.adSpend} onChange={set("adSpend")} suffix="PKR"/><Field label="Allocated overhead" value={v.overhead} onChange={set("overhead")} suffix="PKR"/></div><Result title="Estimated net profit" primary={money(r.profit)} rows={[["Delivered / returned",`${r.delivered.toFixed(0)} / ${r.returned.toFixed(0)}`],["Gross delivered sales",money(r.sales)],["Total modeled cost",money(r.totalCost)],["Profit margin",`${r.margin.toFixed(1)}%`],["ROAS",`${r.roas.toFixed(2)}×`],["Break-even CPA",money(r.breakEvenCpa)]]} formula="Delivered sales − product, courier, RTO, packaging, COD, ads and overhead costs" /></CalcShell>;
  }

  if (slug === "daraz-profit-calculator") {
    const setD = (key: string) => (value: string) => { setDarazCalculated(false); setV(s => ({...s, [key]: value})); };
    const setDMode = (key: string) => (value: string) => { setDarazCalculated(false); setMode(s => ({...s, [key]: value})); };
    const shared = {
      sellingPrice: num(v.darazSp), purchasePrice: num(v.darazPurchase), extraCharges: num(v.darazExtra), penalties: num(v.darazPenalties),
      commissionPercent: getDarazCategoryCommission(mode.darazCategory), paymentFeePercent: DARAZ_PAYMENT_FEE_PCT, vatPercent: num(mode.darazProvince),
      voucherOn: mode.darazVoucherOn === "yes", voucherPercent: num(v.darazVoucherPct), freeShippingMaxOn: mode.darazFsmOn === "yes",
    };
    const fbm = darazFbmProfit({ ...shared, weightGrams: num(v.darazWeight), pickup: mode.darazHandlingMode === "pickup", deliveryType: mode.darazDeliveryType as "door" | "collection", zone: Number(mode.darazZone) as 1|2|3|4, pickPackFee: 0, storageFee: 0 });
    const fbd = darazFbdProfit({ ...shared, weightGrams: 0, pickup: false, deliveryType: "door", zone: 1, pickPackFee: num(v.darazPickPack), storageFee: num(v.darazStorage) });
    const winner = fbm.profit === fbd.profit ? "Both models leave the same profit" : fbm.profit > fbd.profit ? `FBM leaves ${money(fbm.profit - fbd.profit)} more profit` : `FBD leaves ${money(fbd.profit - fbm.profit)} more profit`;
    const shareText = `Daraz FBM vs FBD (Rs ${v.darazSp} item)\nFBM net profit: ${money(fbm.profit)} (${fbm.margin.toFixed(1)}% margin)\nFBD net profit: ${money(fbd.profit)} (${fbd.margin.toFixed(1)}% margin)\n${winner}\nCalculated with Seedha Hisab`;
    async function copy() { await navigator.clipboard?.writeText(shareText); }
    async function share() { if (navigator.share) await navigator.share({ title: "Daraz FBM vs FBD", text: shareText }); else await copy(); }
    function whatsapp() { window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank", "noopener,noreferrer"); }
    const dash = "—";
    return <div className="grid min-w-0 gap-5">
      <div className="flex justify-center">
        <div className="inline-flex rounded-full border border-slate-200 bg-white p-1">
          <button type="button" onClick={() => setDarazTab("fbm")} className={`rounded-full px-5 py-2 text-sm font-bold transition ${darazTab === "fbm" ? "bg-[#102a43] text-white" : "text-slate-500"}`}>FBM</button>
          <button type="button" onClick={() => setDarazTab("fbd")} className={`rounded-full px-5 py-2 text-sm font-bold transition ${darazTab === "fbd" ? "bg-[#102a43] text-white" : "text-slate-500"}`}>FBD</button>
        </div>
      </div>
      <div className="grid min-w-0 gap-4 md:grid-cols-2">
        <div className={`min-w-0 rounded-2xl border p-5 transition ${darazTab === "fbm" ? "border-[#102a43] bg-white shadow-md" : "border-slate-200 bg-slate-50/70 opacity-60"}`}>
          <p className="text-xs font-extrabold uppercase tracking-[.12em] text-[#102a43]">FBM · Fulfilled by Merchant</p>
          <div className="mt-4 grid gap-3">
            <SelectField label="Category" value={mode.darazCategory} onChange={setDMode("darazCategory")}>{darazCategories.map(c=><option key={c.slug} value={c.slug}>{c.label}</option>)}</SelectField>
            <Field label="Payment fee" value={String(DARAZ_PAYMENT_FEE_PCT)} onChange={() => {}} suffix="%" hint="Fixed by Daraz on every delivered order." />
          </div>
        </div>
        <div className={`min-w-0 rounded-2xl border p-5 transition ${darazTab === "fbd" ? "border-[#102a43] bg-white shadow-md" : "border-slate-200 bg-slate-50/70 opacity-60"}`}>
          <p className="text-xs font-extrabold uppercase tracking-[.12em] text-[#102a43]">FBD · Fulfilled by Daraz</p>
          <div className="mt-4 grid gap-3">
            <SelectField label="Category" value={mode.darazCategory} onChange={setDMode("darazCategory")}>{darazCategories.map(c=><option key={c.slug} value={c.slug}>{c.label}</option>)}</SelectField>
            <Field label="Payment fee" value={String(DARAZ_PAYMENT_FEE_PCT)} onChange={() => {}} suffix="%" hint="Same category and payment fee apply to both models for the same product." />
          </div>
        </div>
      </div>
      <div className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 sm:p-6">
        <div className="grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="Selling price" value={v.darazSp} onChange={setD("darazSp")} suffix="PKR" />
          <SelectField label="Province (VAT)" value={mode.darazProvince} onChange={setDMode("darazProvince")}>{darazProvinces.map(p=><option key={p.value} value={p.value}>{p.label}</option>)}</SelectField>
          <Field label="Purchasing price" value={v.darazPurchase} onChange={setD("darazPurchase")} suffix="PKR" />
          <Field label="Extra charges (ads/packaging)" value={v.darazExtra} onChange={setD("darazExtra")} suffix="PKR" />
          <Field label="Penalties" value={v.darazPenalties} onChange={setD("darazPenalties")} suffix="PKR" hint="Return or quality-issue penalties, if any." />
          <ToggleField label="Voucher Max" checked={mode.darazVoucherOn === "yes"} onChange={c=>{setDarazCalculated(false); setMode(s=>({...s,darazVoucherOn:c?"yes":"no"}));}} />
          {mode.darazVoucherOn === "yes" && <Field label="Voucher %" value={v.darazVoucherPct} onChange={setD("darazVoucherPct")} suffix="%" />}
          <ToggleField label="Free Shipping Max (6% of price, Rs 30–200)" checked={mode.darazFsmOn === "yes"} onChange={c=>{setDarazCalculated(false); setMode(s=>({...s,darazFsmOn:c?"yes":"no"}));}} />
        </div>
      </div>
      <div className="grid min-w-0 gap-4 md:grid-cols-2">
        <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-xs font-extrabold uppercase tracking-[.12em] text-slate-500">FBM fulfilment details</p>
          <div className="mt-4 grid gap-3">
            <Field label="Weight" value={v.darazWeight} onChange={setD("darazWeight")} suffix="grams" hint={isBulkyItem(num(v.darazWeight)) ? "Bulky item (8kg+) — a shipping surcharge is applied." : undefined} />
            <SelectField label="Handling mode" value={mode.darazHandlingMode} onChange={setDMode("darazHandlingMode")}><option value="dropoff">Drop-off</option><option value="pickup">Pickup (rider collects)</option></SelectField>
            <SelectField label="Delivery type" value={mode.darazDeliveryType} onChange={setDMode("darazDeliveryType")}><option value="door">Door-to-Door</option><option value="collection">Collection Point</option></SelectField>
            <SelectField label="Shipping zone" value={mode.darazZone} onChange={setDMode("darazZone")}><option value="1">Zone 1</option><option value="2">Zone 2</option><option value="3">Zone 3</option><option value="4">Zone 4</option></SelectField>
          </div>
        </div>
        <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-xs font-extrabold uppercase tracking-[.12em] text-slate-500">FBD fulfilment details</p>
          <div className="mt-4 grid gap-3">
            <Field label="Pick & Pack fee" value={v.darazPickPack} onChange={setD("darazPickPack")} suffix="PKR" />
            <Field label="Monthly storage fee" value={v.darazStorage} onChange={setD("darazStorage")} suffix="PKR" hint="Only if stock sits longer than about 30 days." />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Button onClick={() => setDarazCalculated(true)} className="rounded-xl bg-[#102a43] px-8 py-6 text-base font-extrabold text-white hover:bg-[#163b5e]">Calculate Profit</Button>
      </div>
      <div className="grid min-w-0 gap-4 md:grid-cols-2">
        {([["FBM result", fbm, [["Commission",fbm.commissionAmount],["Payment fee",fbm.paymentFeeAmount],["Shipping fee",fbm.shippingFee],["Handling fee",fbm.handlingFee],["VAT",fbm.vatAmount],["Penalties",fbm.penalties]] as const], ["FBD result", fbd, [["Commission",fbd.commissionAmount],["Payment fee",fbd.paymentFeeAmount],["Pick & Pack fee",fbd.pickPackFee],["Storage fee",fbd.storageFee],["VAT",fbd.vatAmount],["Penalties",fbd.penalties]] as const]] as const).map(([title, r, lines]) => (
          <section key={title} aria-live="polite" className="min-w-0 overflow-hidden rounded-2xl bg-[#102a43] text-white shadow-[0_18px_50px_rgba(15,42,67,.18)]">
            <div className="border-b border-white/10 p-6">
              <p className="text-xs font-extrabold uppercase tracking-[.16em] text-emerald-300">{title}</p>
              <dl className="mt-3 grid grid-cols-3 gap-2 text-center">
                <div><dt className="text-[10px] font-bold uppercase tracking-wide text-slate-400">You Get</dt><dd className="mt-1 text-lg font-black">{darazCalculated ? money(r.profit + r.costTotal) : dash}</dd></div>
                <div><dt className="text-[10px] font-bold uppercase tracking-wide text-slate-400">ROI</dt><dd className="mt-1 text-lg font-black">{darazCalculated ? `${r.roi.toFixed(1)}%` : dash}</dd></div>
                <div><dt className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Profit</dt><dd className={`mt-1 text-lg font-black ${darazCalculated && r.profit < 0 ? "text-red-400" : ""}`}>{darazCalculated ? money(r.profit) : dash}</dd></div>
              </dl>
            </div>
            {darazCalculated && <dl className="grid min-w-0 gap-px bg-white/10 sm:grid-cols-2">{lines.map(([label,value]) => <div key={label} className="min-w-0 bg-[#102a43] p-4"><dt className="text-xs font-semibold text-slate-400">− {label}</dt><dd className="mt-1 text-base font-bold">{money(value)}</dd></div>)}</dl>}
          </section>
        ))}
      </div>
      {darazCalculated && <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center font-bold text-emerald-900">{winner}</div>}
      {darazCalculated && <div className="flex flex-wrap gap-2">
        <Button onClick={copy} variant="secondary" className="rounded-xl"><Copy size={16} /> Copy result</Button>
        <Button onClick={whatsapp} className="rounded-xl bg-[#25D366] text-[#06251c] hover:bg-[#1fbd5a]"><WhatsAppIcon /> WhatsApp</Button>
        <Button onClick={share} className="rounded-xl bg-emerald-500 text-[#06251c] hover:bg-emerald-400"><Share2 size={16} /> Share</Button>
      </div>}
      <p className="text-xs leading-5 text-slate-500">Category commission, payment fee and VAT are commonly reported estimates, not an official Daraz price list. Confirm exact rates in your Daraz Seller Center before pricing a product.</p>
    </div>;
  }

  if (slug === "profit-margin-calculator") {
    const r = marginCalc(num(v.cost),num(v.selling)); const needed = requiredForMargin(num(v.cost),num(v.desiredMargin));
    return <CalcShell><Field label="Cost price" value={v.cost} onChange={set("cost")} suffix="PKR"/><Field label="Selling price" value={v.selling} onChange={set("selling")} suffix="PKR"/><Field label="Desired margin" value={v.desiredMargin} onChange={set("desiredMargin")} suffix="%"/><Result title="Profit per item" primary={money(r.profit)} rows={[["Profit margin",`${r.margin.toFixed(2)}%`],["Markup on cost",`${r.markup.toFixed(2)}%`],["Price for desired margin",money(needed)],["Margin vs markup","Different denominators"]]} formula="Margin = Profit ÷ Selling Price; Markup = Profit ÷ Cost" /></CalcShell>;
  }

  if (slug === "marla-to-square-feet-calculator") {
    const r = landConvert(num(v.land),mode.landUnit,num(v.marlaStandard));
    return <CalcShell><Field label="Area" value={v.land} onChange={set("land")}/><SelectField label="Starting unit" value={mode.landUnit} onChange={x=>setMode(s=>({...s,landUnit:x}))}><option value="marla">Marla</option><option value="kanal">Kanal</option><option value="sqft">Square feet</option><option value="sqyd">Square yards / gaz</option><option value="sqm">Square metres</option></SelectField><SelectField label="Marla standard" value={v.marlaStandard} onChange={set("marlaStandard")}><option value="225">225 sq ft — common housing society</option><option value="250">250 sq ft — alternate urban standard</option><option value="272.25">272.25 sq ft — traditional revenue standard</option></SelectField><Result title="Converted area" primary={`${r.sqFt.toLocaleString("en-PK",{maximumFractionDigits:2})} sq ft`} rows={[["Marla",r.marla.toFixed(4)],["Kanal",r.kanal.toFixed(4)],["Square yards / gaz",r.sqyd.toFixed(2)],["Square metres",r.sqm.toFixed(2)],["Acres",r.acres.toFixed(5)]]} formula={`1 marla = ${v.marlaStandard} sq ft; 1 kanal = 20 marla`} note="Confirm the marla definition used in your title document or housing society." /></CalcShell>;
  }

  if (slug === "electricity-bill-calculator-pakistan") {
    if (mode.electricityMode === "disco") {
      const disco = getDiscoTariff(mode.disco) ?? discoTariffs[0];
      const category = disco.categories[mode.consumerCategory as ConsumerCategory] ?? disco.categories.protected;
      const r = electricitySlabEstimate(num(v.units), category.slabs, category.fixedCharge, num(v.tax));
      return <CalcShell>
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm font-semibold leading-6 text-amber-900">⚠️ Draft feature — {tariffDataNote}</div>
        <SelectField label="Distribution company (DISCO)" value={mode.disco} onChange={x=>setMode(s=>({...s,disco:x}))}>{discoTariffs.map(d=><option key={d.slug} value={d.slug}>{d.name}</option>)}</SelectField>
        <SelectField label="Consumer category" value={mode.consumerCategory} onChange={x=>setMode(s=>({...s,consumerCategory:x}))}><option value="lifeline">{disco.categories.lifeline.label}</option><option value="protected">{disco.categories.protected.label}</option><option value="unprotected">{disco.categories.unprotected.label}</option></SelectField>
        <Field label="Units consumed" value={v.units} onChange={set("units")} suffix="kWh"/>
        <Field label="Combined tax estimate" value={v.tax} onChange={set("tax")} suffix="%"/>
        <Result title="Estimated electricity bill (draft)" primary={money(r.total)} rows={[["Energy charges",money(r.energy)],["Fixed charge",money(r.fixedCharge)],["Modeled taxes",money(r.taxes)],["Slabs applied",`${r.breakdown.length}`]]} formula="Sum of (units in each slab × slab rate) + fixed charge, then taxes" note="Draft DISCO rates — not yet verified. Switch to Manual Rate mode for a trustworthy estimate today." /></CalcShell>;
    }
    const r = electricityEstimate(num(v.units),num(v.unitRate),num(v.fixed),num(v.fca),num(v.tax));
    return <CalcShell>
      <SelectField label="Rate mode" value={mode.electricityMode} onChange={x=>setMode(s=>({...s,electricityMode:x}))}><option value="manual">Manual rate (recommended — accurate today)</option><option value="disco">By DISCO (draft — pending verification)</option></SelectField>
      <div className="grid gap-4 sm:grid-cols-2"><Field label="Units consumed" value={v.units} onChange={set("units")} suffix="kWh"/><Field label="Applicable average tariff" value={v.unitRate} onChange={set("unitRate")} suffix="Rs/unit" hint="Enter the rate shown for your category; tariffs change."/><Field label="Fixed charges" value={v.fixed} onChange={set("fixed")} suffix="PKR"/><Field label="FCA / other adjustments" value={v.fca} onChange={set("fca")} suffix="PKR"/><Field label="Combined tax estimate" value={v.tax} onChange={set("tax")} suffix="%"/></div><Result title="Estimated electricity bill" primary={money(r.total)} rows={[["Energy charges",money(r.energy)],["Before tax",money(r.subtotal)],["Modeled taxes",money(r.taxes)],["Actual bill may differ","Arrears, meter factors & monthly adjustments"]]} formula="(Units × chosen tariff + fixed charges + adjustments) × taxes" note="Transparent manual-rate estimator. It does not claim a single nationwide tariff." /></CalcShell>;
  }

  if (slug === "zakat-calculator-pakistan") {
    const assets = ["cash","bank","gold","silver","investments","inventory","receivables"].reduce((a,k)=>a+num(v[k]),0); const net = Math.max(0,assets-num(v.liabilities)); const due = net >= num(v.nisab) ? net*.025 : 0;
    return <CalcShell><div className="grid gap-4 sm:grid-cols-2"><Field label="Cash" value={v.cash} onChange={set("cash")} suffix="PKR"/><Field label="Bank balances" value={v.bank} onChange={set("bank")} suffix="PKR"/><Field label="Gold value" value={v.gold} onChange={set("gold")} suffix="PKR"/><Field label="Silver value" value={v.silver} onChange={set("silver")} suffix="PKR"/><Field label="Investments" value={v.investments} onChange={set("investments")} suffix="PKR"/><Field label="Business inventory" value={v.inventory} onChange={set("inventory")} suffix="PKR"/><Field label="Eligible receivables" value={v.receivables} onChange={set("receivables")} suffix="PKR"/><Field label="Eligible liabilities" value={v.liabilities} onChange={set("liabilities")} suffix="PKR"/><Field label="Nisab value you follow" value={v.nisab} onChange={set("nisab")} suffix="PKR"/></div><Result title="Calculated zakat" primary={money(due)} rows={[["Total entered assets",money(assets)],["Net zakatable amount",money(net)],["Nisab entered",money(num(v.nisab))],["Rate","2.5%"]]} formula="(Eligible assets − eligible liabilities) × 2.5%, when net assets meet nisab" note="An informational calculation aid, not a fatwa. Eligibility and nisab method can differ; consult a qualified scholar." /></CalcShell>;
  }

  const r = discountCalc(num(v.price),num(v.discount1),num(v.discount2));
  return <CalcShell><Field label="Original price" value={v.price} onChange={set("price")} suffix="PKR"/><Field label="First discount" value={v.discount1} onChange={set("discount1")} suffix="%"/><Field label="Second sequential discount (optional)" value={v.discount2} onChange={set("discount2")} suffix="%"/><Result title="Final price" primary={money(r.finalPrice)} rows={[["You save",money(r.discount)],["Effective total discount",`${r.effectiveDiscount.toFixed(2)}%`],["Original price",money(num(v.price))],["Sequential method","Second discount applies after the first"]]} formula="Price × (1 − first discount) × (1 − second discount)" /></CalcShell>;
}

function CalcShell({ children }: { children: React.ReactNode }) {
  const items = Children.toArray(children);
  return <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(340px,.92fr)]"><div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 sm:p-6"><div className="grid gap-4">{items.slice(0,-1)}</div></div>{items.at(-1)}</div>;
}
