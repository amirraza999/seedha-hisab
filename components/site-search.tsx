"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { tools } from "@/lib/tools";
import { guides } from "@/lib/guides";

export function SiteSearch() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((value) => !value);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  function go(href: string) {
    setOpen(false);
    router.push(href);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search calculators and guides"
        className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-700 transition hover:border-emerald-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-100"
      >
        <Search size={18} />
      </button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Search Seedha Hisab"
        description="Search calculators and guides"
      >
        <CommandInput placeholder="Search calculators and guides…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Calculators">
            {tools.map((tool) => (
              <CommandItem
                key={tool.slug}
                value={`${tool.name} ${tool.description} ${tool.category}`}
                onSelect={() => go(`/tools/${tool.slug}`)}
              >
                {tool.name}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Guides">
            {guides.map((guide) => (
              <CommandItem
                key={guide.slug}
                value={`${guide.title} ${guide.description} ${guide.category}`}
                onSelect={() => go(`/guides/${guide.slug}`)}
              >
                {guide.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
