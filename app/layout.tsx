import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LocaleProvider from "@/components/LocaleProvider";
import LanguageToggle from "@/components/LanguageToggle";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { APP_NAME, APP_DESCRIPTION } from "@/lib/data";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  formatDetection: { telephone: false, date: false, email: false, address: false },
  title: `${APP_NAME}: Build, manage, and deploy websites`,
  description: APP_DESCRIPTION,
  openGraph: {
    title: `${APP_NAME}: Build, manage, and deploy websites`,
    description: APP_DESCRIPTION,
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[var(--background)] text-[var(--foreground)] antialiased`}>
        <LocaleProvider>
          <Navbar />
          {children}
          <Footer />
          <LanguageToggle />
        </LocaleProvider>
      </body>
    </html>
  );
}