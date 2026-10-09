import Link from "next/link";
import { Calculator } from "lucide-react";
import { MobileNav } from "@/components/mobile-nav";
import { SiteSearch } from "@/components/site-search";
import { categories, categorySlug } from "@/lib/tools";

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
          {categories.map((category) => (
            <Link
              key={category}
              href={`/tools#${categorySlug(category)}`}
              className="hover:text-[#087f5b]"
            >
              {category}
            </Link>
          ))}
          <Link href="/guides" className="font-extrabold text-[#087f5b]">
            Guides
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <SiteSearch />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
