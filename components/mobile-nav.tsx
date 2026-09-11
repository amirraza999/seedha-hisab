"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const links = [
  ["All Tools", "/tools"],
  ["Tax & Salary", "/tools/salary-tax-calculator-pakistan"],
  ["Business", "/tools/cod-profit-calculator"],
  ["Bills", "/tools/electricity-bill-calculator-pakistan"],
  ["Property", "/tools/marla-to-square-feet-calculator"],
  ["Personal Finance", "/tools/zakat-calculator-pakistan"],
  ["Guides", "/guides"],
  ["Methodology", "/methodology"],
] as const;

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-700 transition hover:border-emerald-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-100 xl:hidden"
          aria-label="Open navigation menu"
        >
          <Menu size={19} />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[min(88vw,22rem)] bg-white p-0">
        <SheetHeader className="border-b border-slate-200 p-6 pr-12 text-left">
          <SheetTitle className="text-xl font-black text-[#102a43]">
            Seedha <span className="text-[#087f5b]">Hisab</span>
          </SheetTitle>
          <SheetDescription>Pakistan money calculators</SheetDescription>
        </SheetHeader>
        <nav className="grid gap-2 p-4" aria-label="Mobile navigation">
          {links.map(([label, href]) => (
            <SheetClose asChild key={href}>
              <Link
                href={href}
                className="rounded-xl px-4 py-3.5 text-base font-bold text-slate-700 transition hover:bg-emerald-50 hover:text-[#087f5b] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-100"
              >
                {label}
              </Link>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
