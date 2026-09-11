"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import { tools } from "@/lib/tools";

export function HomeSearch() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return tools.slice(0, 4);
    const aliases: Record<string, string> = { bijli: "electricity", bill: "electricity", tankhwa: "salary", tanخواہ: "salary", filer: "filer", marla: "marla", munafa: "profit", zakat: "zakat", discount: "discount" };
    const expanded = aliases[q] ?? q;
    return tools.filter(t => `${t.name} ${t.description} ${t.category} ${t.urdu}`.toLowerCase().includes(expanded)).slice(0, 5);
  }, [query]);
  return (
    <div id="find-tool" className="relative mx-auto mt-8 max-w-2xl text-left">
      <Search className="pointer-events-none absolute left-5 top-4 text-slate-400" size={22} />
      <label htmlFor="tool-search" className="sr-only">Search calculators</label>
      <input id="tool-search" value={query} onChange={e => setQuery(e.target.value)} placeholder="What do you want to calculate?" className="h-14 w-full rounded-2xl border border-slate-200 bg-white pl-14 pr-5 text-base shadow-[0_12px_32px_rgba(15,42,67,.08)] outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100" />
      {query && <div className="absolute top-[62px] z-20 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">
        {results.length ? results.map(tool => <Link key={tool.slug} href={`/tools/${tool.slug}`} className="flex items-center justify-between rounded-xl px-4 py-3 hover:bg-emerald-50"><span><strong className="block text-sm text-[#102a43]">{tool.name}</strong><small className="text-slate-500">{tool.category}</small></span><ArrowRight size={17} className="text-emerald-700" /></Link>) : <p className="p-4 text-sm text-slate-500">No tool found. Try salary, filer, bijli, marla or profit.</p>}
      </div>}
    </div>
  );
}
