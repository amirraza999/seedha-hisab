import type { MetadataRoute } from "next";
import { tools } from "@/lib/tools";
import { guideCategories, guides } from "@/lib/guides";
import { SITE_URL } from "@/lib/seo";

const infoPages = [
  "about",
  "contact",
  "methodology",
  "sources",
  "editorial-policy",
  "corrections-policy",
  "privacy-policy",
  "terms",
  "disclaimer",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-09-11");
  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      images: [
        `${SITE_URL}/images/pakistan-money-calculators-hero.webp`,
        `${SITE_URL}/images/cod-ecommerce-profit-tools.webp`,
        `${SITE_URL}/images/property-bills-personal-finance.webp`,
      ],
    },
    {
      url: `${SITE_URL}/tools`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/guides`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...tools.map((tool) => ({
      url: `${SITE_URL}/tools/${tool.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...guides.map((guide) => ({
      url: `${SITE_URL}/guides/${guide.slug}`,
      lastModified,
      changeFrequency:
        guide.freshness === "Evergreen"
          ? ("yearly" as const)
          : ("monthly" as const),
      priority: 0.8,
    })),
    ...guideCategories.map((category) => ({
      url: `${SITE_URL}/guides/${category.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...infoPages.map((page) => ({
      url: `${SITE_URL}/${page}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.4,
    })),
  ];
}
