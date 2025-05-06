"use client";
// app/layout.tsx

import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kyuho's Portfolio Blog",
  description: "Developer portfolio and tech blog",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-foreground`}>
        <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
          <Header />
          <SessionProvider>
            <html lang="en">
              <body>{children}</body>
            </html>
          </SessionProvider>
          <main className="p-4 sm:p-8">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}