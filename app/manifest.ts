import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Seedha Hisab — Pakistan Calculators",
    short_name: "Seedha Hisab",
    description:
      "Transparent Pakistan tax, salary, business, bill, property and personal-finance calculators.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f9fc",
    theme_color: "#102a43",
    lang: "en-PK",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
