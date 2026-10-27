import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { PORTFOLIO_DATA } from "@/data/portfolio";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(PORTFOLIO_DATA.personal.portfolioUrl),
  title: `${PORTFOLIO_DATA.personal.name} — ${PORTFOLIO_DATA.personal.title}`,
  description: PORTFOLIO_DATA.personal.summary,
  authors: [{ name: PORTFOLIO_DATA.personal.name, url: PORTFOLIO_DATA.personal.portfolioUrl }],
  creator: PORTFOLIO_DATA.personal.name,
  keywords: [
    "Tanbir Ahmed",
    "Full-Stack Developer",
    "Laravel",
    "Next.js 16",
    "React 19",
    "Django",
    "WebSockets",
    "Laravel Reverb",
    "Software Engineer",
    "Dhaka, Bangladesh",
    "Idempotent Checkout",
    "Double-Entry Ledgers",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: PORTFOLIO_DATA.personal.portfolioUrl,
    title: `${PORTFOLIO_DATA.personal.name} — ${PORTFOLIO_DATA.personal.headline}`,
    description: PORTFOLIO_DATA.personal.summary,
    siteName: `${PORTFOLIO_DATA.personal.name} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${PORTFOLIO_DATA.personal.name} — ${PORTFOLIO_DATA.personal.title}`,
    description: PORTFOLIO_DATA.personal.summary,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#070a12",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[#070a12] text-[#f8fafc] font-sans antialiased selection:bg-blue-500/30 selection:text-white">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
