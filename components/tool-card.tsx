import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Tool } from "@/lib/tools";

export function ToolCard({ tool }: { tool: Tool }) {
  const Icon = tool.icon;
  return (
    <Link href={`/tools/${tool.slug}`} className="group flex min-h-52 flex-col rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-[0_16px_38px_rgba(15,42,67,.09)]">
      <div className="flex items-start justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-50 text-[#087f5b]"><Icon size={21} /></span><ArrowUpRight size={18} className="text-slate-300 transition group-hover:text-[#087f5b]" /></div>
      <div className="mt-auto pt-7"><p className="text-xs font-bold uppercase tracking-[.12em] text-[#087f5b]">{tool.category}</p><div className="min-h-[4.35rem]"><h3 className="mt-2 text-lg font-extrabold tracking-tight text-[#102a43]">{tool.name}</h3><p className="mt-1 w-fit font-urdu text-sm leading-6 text-slate-500" dir="auto">{tool.urdu}</p></div><p className="mt-3 text-sm leading-6 text-slate-600">{tool.description}</p></div>
    </Link>
  );
}
