import type { Metadata } from "next";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://cheapflightworld.com"),
  title: {
    default: "CheapFlightWorld",
    template: "%s | CheapFlightWorld",
  },
  description:
    "Book cheap flights, hotels, cars, and vacation packages with fast search, real-time deals, and friendly travel support.",
  applicationName: "CheapFlightWorld",
  authors: [{ name: "CheapFlightWorld", url: "https://cheapflightworld.com" }],
  creator: "CheapFlightWorld",
  publisher: "CheapFlightWorld",
  keywords: [
    "cheap flights",
    "flight deals",
    "hotel booking",
    "car rental",
    "vacation packages",
    "travel deals",
    "budget travel",
    "flight search",
  ],
  openGraph: {
    title: "CheapFlightWorld",
    description:
      "Book cheap flights, hotels, cars, and vacation packages with fast search, real-time deals, and friendly travel support.",
    url: "https://cheapflightworld.com",
    siteName: "CheapFlightWorld",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://cheapflightworld.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CheapFlightWorld travel deals",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CheapFlightWorld",
    description:
      "Book cheap flights, hotels, cars, and vacation packages with fast search, real-time deals, and friendly travel support.",
    creator: "@CheapFlightWorld",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "hsl(216, 100%, 97%)" },
    { media: "(prefers-color-scheme: dark)", color: "hsl(234, 24%, 18%)" },
  ],
};
import { Navbar } from "@/components/home/navbar";
import { Footer } from "@/components/home/footer";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full  flex flex-col">
      <Navbar/>
        {children}
        <Footer/>
        </body>
    </html>
  );
}
