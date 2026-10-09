import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Tool } from "@/lib/tools";

export function ToolCard({ tool }: { tool: Tool }) {
  const Icon = tool.icon;
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-[0_16px_38px_rgba(15,42,67,.09)]"
    >
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald-50 text-[#087f5b]">
        <Icon size={21} />
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="text-base font-extrabold leading-snug tracking-tight text-[#102a43]">
          {tool.name}
        </h3>
        <p className="w-fit font-urdu text-sm leading-6 text-slate-500" dir="auto">
          {tool.urdu}
        </p>
        <p className="mt-1 text-sm leading-5 text-slate-600">
          {tool.description}
        </p>
      </div>
      <ArrowUpRight
        size={18}
        className="mt-1 shrink-0 text-slate-300 transition group-hover:text-[#087f5b]"
      />
    </Link>
  );
}
