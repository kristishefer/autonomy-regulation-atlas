import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GlobalNavigation } from "@/app/i18n/GlobalNavigation";
import { LocaleProvider } from "@/app/i18n/LocaleProvider";
import { getRequestLocale } from "@/app/i18n/request-locale";
import "./globals.css";
import "./home/fox-constellation-proof.css";

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
    "Connecting autonomous-mobility technology, regulatory requirements and lawful deployment across jurisdictions.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const locale = await getRequestLocale();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LocaleProvider locale={locale}>
          <GlobalNavigation />
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
