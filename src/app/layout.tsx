import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/AppProviders";
import { PORTFOLIO_DATA } from "@/data/portfolio";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
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
  icons: {
    icon: [
      { url: "favicon.svg", type: "image/svg+xml" },
      { url: "icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "apple-icon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  colorScheme: "light dark",
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
      className={`${plusJakartaSans.variable} ${jetbrainsMono.variable} light`}
      data-theme="light"
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('tanbir_theme')||'light';document.documentElement.classList.remove('dark','light');document.documentElement.classList.add(t);document.documentElement.setAttribute('data-theme',t);document.documentElement.style.colorScheme=t;}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans antialiased selection:bg-neutral-500/25 selection:text-white transition-colors duration-300">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
