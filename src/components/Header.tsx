// src/components/Header.tsx
'use client';

import Link from "next/link";
import dynamic from "next/dynamic";

const AuthStatus = dynamic(() => import("./AuthStatus"), { ssr: false });

export default function Header() {
  return (
    <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 p-4 sm:px-8 border-b border-gray-200 dark:border-gray-700">
      <h1 className="text-xl font-bold text-foreground">
        <Link href="/" className="text-xl font-bold transition duration-300 hover:scale-105 hover:text-sky-500 font-mono">•kyu.log</Link>
      </h1>
      <nav className="space-x-4 text-sm sm:text-base">
        <Link href="/about" className="hover:underline">About</Link>
        <Link href="/projects" className="hover:underline">Projects</Link>
        <Link href="/blog" className="hover:underline">Blog</Link>
        <Link href="/contact" className="hover:underline">Contact</Link>
      </nav>
      <div className="mt-2 sm:mt-0">
        <AuthStatus />
      </div>
    </header>
  );
}