import Link from "next/link";
import { Calculator, Search } from "lucide-react";
import { MobileNav } from "@/components/mobile-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label="Seedha Hisab home"
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#102a43] text-white">
            <Calculator size={19} />
          </span>
          <span className="text-lg font-extrabold tracking-tight text-[#102a43]">
            Seedha <span className="text-[#087f5b]">Hisab</span>
          </span>
        </Link>
        <nav
          className="hidden items-center gap-5 text-sm font-semibold text-slate-600 xl:flex"
          aria-label="Main navigation"
        >
          <Link href="/tools" className="hover:text-[#087f5b]">
            All Tools
          </Link>
          <Link
            href="/tools/salary-tax-calculator-pakistan"
            className="hover:text-[#087f5b]"
          >
            Tax & Salary
          </Link>
          <Link
            href="/tools/cod-profit-calculator"
            className="hover:text-[#087f5b]"
          >
            Business
          </Link>
          <Link
            href="/tools/electricity-bill-calculator-pakistan"
            className="hover:text-[#087f5b]"
          >
            Bills
          </Link>
          <Link
            href="/tools/marla-to-square-feet-calculator"
            className="hover:text-[#087f5b]"
          >
            Property
          </Link>
          <Link
            href="/tools/zakat-calculator-pakistan"
            className="hover:text-[#087f5b]"
          >
            Personal Finance
          </Link>
          <Link href="/guides" className="font-extrabold text-[#087f5b]">
            Guides
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/#find-tool"
            className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-700 transition hover:border-emerald-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-100"
            aria-label="Search tools"
          >
            <Search size={18} />
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
