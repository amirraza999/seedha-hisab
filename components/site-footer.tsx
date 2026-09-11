import Link from "next/link";

const links = [
  ["All Tools", "/tools"],
  ["Guides", "/guides"],
  ["About", "/about"],
  ["Contact", "/contact"],
  ["Methodology", "/methodology"],
  ["Sources", "/sources"],
  ["Editorial Policy", "/editorial-policy"],
  ["Corrections Policy", "/corrections-policy"],
  ["Privacy Policy", "/privacy-policy"],
  ["Terms", "/terms"],
  ["Disclaimer", "/disclaimer"],
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-[#0b2136] text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1fr_2fr]">
        <div>
          <p className="text-xl font-extrabold text-white">
            Seedha <span className="text-emerald-400">Hisab</span>
          </p>
          <p className="mt-3 max-w-sm text-sm leading-6">
            Clear calculators for Pakistan, with visible formulas, dates and
            sources.
          </p>
        </div>
        <nav
          className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3"
          aria-label="Footer navigation"
        >
          {links.map(([label, href]) => (
            <Link key={href} className="hover:text-white" href={href}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-slate-400">
        © 2026 Seedha Hisab. Independent calculators; not affiliated with FBR or
        any government authority.
      </div>
    </footer>
  );
}
