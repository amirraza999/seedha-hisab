import { ToolCard } from "@/components/tool-card";
import { categories, categoryBlurb, categorySlug, tools } from "@/lib/tools";

export function ToolsByCategory() {
  return (
    <>
      <nav
        aria-label="Calculator categories"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {categories.map((category) => (
          <a
            key={category}
            href={`#${categorySlug(category)}`}
            className="shrink-0 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-[#102a43] hover:border-emerald-400 hover:text-[#087f5b]"
          >
            {category}
          </a>
        ))}
      </nav>
      <div className="mt-8 space-y-10">
        {categories.map((category) => (
          <section
            key={category}
            id={categorySlug(category)}
            className="scroll-mt-24"
          >
            <div className="mb-4">
              <h2 className="text-xl font-black text-[#102a43]">{category}</h2>
              <p className="mt-1 text-sm text-slate-500">
                {categoryBlurb[category]}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {tools
                .filter((t) => t.category === category)
                .map((t) => (
                  <ToolCard key={t.slug} tool={t} />
                ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
