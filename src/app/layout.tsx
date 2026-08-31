import type { Metadata } from "next";
import Link from "next/link";
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
  title: "Autonomy Regulation Atlas",
  description:
    "A jurisdiction-by-jurisdiction atlas of autonomous mobility regulation and its operational impact.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <footer className="border-t border-black/10 bg-[#f7f7f4] text-[#171717]">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-6 py-5 text-xs text-black/45 sm:flex-row sm:items-center sm:justify-between lg:px-10">
            <span>© 2026 Kristina Shefer · Autonomy Regulation Atlas · All rights reserved.</span>
            <Link href="/terms" className="hover:text-black">
              Terms of Use
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
