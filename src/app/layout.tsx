import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StickyHeader from "./components/header/header.component";
import StickyFooter from "./components/footer/footer.component";
import Script from "next/script";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Restaurant Catalog",
  description: "Featured restaurants",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-6S1GHQLBHE"></Script>
        <Script id="google-analytics">
          {
            `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6S1GHQLBHE');
            `
          }
        </Script>
      </head>
      <body className={inter.className}>
        <div className="flex flex-col h-screen justify-between">
          <StickyHeader />
          <main>
            <Suspense fallback={<div>Loading...</div>}>
              {children}
            </Suspense>
          </main>
          <StickyFooter />
        </div>

      </body>
    </html>
  );
}
