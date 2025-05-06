// src/components/Header.tsx
'use client';

import Link from "next/link";
import dynamic from "next/dynamic";

const AuthStatus = dynamic(() => import("./AuthStatus"), { ssr: false });

export default function Header() {
  return (
    <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 px-6 py-4 shadow-md bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-700">
      <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
        <Link href="/" className="transition duration-300 hover:scale-105 hover:text-sky-500 font-mono">•kyu.log</Link>
      </h1>
      <nav className="flex flex-wrap items-center gap-6 text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
        <Link href="/about" className="hover:text-sky-500 transition">About</Link>
        <Link href="/projects" className="hover:text-sky-500 transition">Projects</Link>
        <Link href="/blog" className="hover:text-sky-500 transition">Blog</Link>
        <Link href="/contact" className="hover:text-sky-500 transition">Contact</Link>
      </nav>
      <div className="mt-2 sm:mt-0">
        <AuthStatus />
      </div>
    </header>
  );
}