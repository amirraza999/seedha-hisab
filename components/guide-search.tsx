"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import type { Guide } from "@/lib/guides";

export function GuideSearch({ guides }: { guides: Guide[] }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? guides.filter((guide) => `${guide.title} ${guide.description} ${guide.category}`.toLowerCase().includes(q)) : guides;
  }, [guides, query]);

  return <div>
    <label className="relative block max-w-2xl">
      <span className="sr-only">Search guides</span>
      <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20}/>
      <input value={query} onChange={(event)=>setQuery(event.target.value)} placeholder="Search tax, COD, bills, property…" className="h-14 w-full rounded-2xl border border-slate-300 bg-white pl-12 pr-4 text-base text-[#102a43] shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"/>
    </label>
    <p className="mt-4 text-sm text-slate-500" aria-live="polite">{results.length} {results.length === 1 ? "guide" : "guides"}</p>
    {results.length ? <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{results.map(guide=><Link key={guide.slug} href={`/guides/${guide.slug}`} className="group flex min-h-60 flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,42,67,.05)] transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-[0_18px_40px_rgba(15,42,67,.09)]">
      <div className="flex items-center justify-between gap-3"><span className="eyebrow">{guide.category}</span><span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">{guide.freshness}</span></div>
      <h3 className="mt-5 text-xl font-black leading-7 tracking-tight text-[#102a43]">{guide.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{guide.description}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[#087f5b]">Read guide <ArrowRight size={16} className="transition group-hover:translate-x-1"/></span>
    </Link>)}</div> : <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center"><h3 className="font-black text-[#102a43]">No matching guide</h3><p className="mt-2 text-sm text-slate-500">Try a broader word such as tax, profit, bill or property.</p></div>}
  </div>;
}
