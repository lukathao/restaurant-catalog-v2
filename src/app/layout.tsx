import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from 'next/image'
import StickyHeader from "./components/header/header.component";
import StickyFooter from "./components/footer/footer.component";

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
      <body className={inter.className}>
        <StickyHeader />
        <main className="bg-white">
          {children}
        </main>
        <StickyFooter />
      </body>
    </html>
  );
}
