import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Noto_Nastaliq_Urdu } from "next/font/google";
import "./globals.css";
import { coreKeywords, SITE_NAME, SITE_URL } from "@/lib/seo";

const gaId = process.env.NEXT_PUBLIC_GA_ID;
const gscVerification = process.env.NEXT_PUBLIC_GSC_VERIFICATION;

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const notoNastaliqUrdu = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-urdu",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: "Pakistan Calculators for Tax, Salary & Business | Seedha Hisab",
    template: "%s | Seedha Hisab",
  },
  description:
    "Free Pakistan calculators for salary tax, net pay, freelancers, COD profit, electricity bills, land conversion, Zakat and discounts.",
  keywords: coreKeywords,
  category: "finance",
  creator: "Seedha Hisab Editorial",
  publisher: SITE_NAME,
  referrer: "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Pakistan Calculators for Tax, Salary & Business",
    description:
      "Calculate Pakistan salary tax, net pay, COD profit, bills, land area, Zakat and discounts with visible formulas and sources.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Seedha Hisab Pakistan calculators",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pakistan Calculators for Tax, Salary & Business",
    description:
      "Free Pakistan calculators with transparent formulas, dates and sources.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
  ...(gscVerification
    ? { verification: { google: gscVerification } }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-PK" className={`${inter.variable} ${notoNastaliqUrdu.variable}`}>
      <body className="antialiased">
        {children}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
