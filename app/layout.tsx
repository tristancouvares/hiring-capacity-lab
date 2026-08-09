import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://tristancouvares.github.io/hiring-capacity-lab";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Hiring Capacity Lab — Synthetic Talent Operations Model",
  description:
    "An interactive, synthetic model for exploring the relationship between hiring demand, recruiting throughput, and backlog.",
  applicationName: "Hiring Capacity Lab",
  authors: [{ name: "Tristan Couvares", url: "https://tristancouvares.com" }],
  creator: "Tristan Couvares",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "talent operations",
    "hiring capacity",
    "workforce planning",
    "React",
    "data visualization",
  ],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Hiring Capacity Lab",
    description:
      "See what happens when hiring demand grows faster than recruiting capacity.",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Hiring Capacity Lab — a synthetic talent operations model",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hiring Capacity Lab",
    description:
      "An interactive model of hiring demand, throughput, and backlog.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#11110f",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
