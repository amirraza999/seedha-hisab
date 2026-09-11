import Link from "next/link";
import type { Metadata } from "next";
import { Search } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};
export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto grid min-h-[65vh] max-w-2xl place-items-center px-4 text-center">
        <div>
          <Search className="mx-auto text-[#087f5b]" size={38} />
          <p className="eyebrow mt-5">404</p>
          <h1 className="mt-3 text-4xl font-black text-[#102a43]">
            This page does not calculate.
          </h1>
          <p className="mt-4 text-slate-600">
            The link may be old or mistyped. Browse the tools or guides to find
            what you need.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href="/tools"
              className="inline-flex rounded-xl bg-[#102a43] px-5 py-3 font-bold text-white hover:bg-[#163b5e]"
            >
              Explore all tools
            </Link>
            <Link
              href="/guides"
              className="inline-flex rounded-xl border border-slate-300 px-5 py-3 font-bold text-[#102a43] hover:border-emerald-400"
            >
              Browse guides
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
