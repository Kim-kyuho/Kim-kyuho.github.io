// app/layout.tsx

import "./globals.css";
import Providers from "./providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";


export const metadata = {
  title: "Kyuho's Portfolio Blog",
  description: "Developer portfolio and tech blog",
  icons:{
    icon: "/favicon.png?v=2",
    apple: "/apple-touch-icon.png?v=2",
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="shortcut icon" href="/favicon.png?v=3" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png?v=3" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=3" />
        <link rel="apple-touch-icon-precomposed" href="/apple-touch-icon.png?v=3" />
      </head>
      <body className={`bg-background text-foreground font-extrabold antialiased`}>
        <Providers>
          <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
            <Header />
            <main className="p-4 sm:p-8 overflow-x-hidden">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}