import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Alkan Sigorta",
    template: "%s | Alkan Sigorta",
  },
  description: "Alkan Sigorta - Poliçe, başvuru ve tahsilat yönetim sistemi",
  keywords: ["sigorta", "poliçe", "başvuru", "tahsilat", "alkan"],
  authors: [{ name: "Alkan Sigorta" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#1A3A5C",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-inter antialiased bg-background-light text-text-primary">
        {children}
      </body>
    </html>
  );
}
