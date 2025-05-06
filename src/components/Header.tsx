'use client';

import Link from "next/link";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Bars3Icon } from '@heroicons/react/24/outline';

const AuthStatus = dynamic(() => import("./AuthStatus"), { ssr: false });

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="px-6 py-4 shadow-md bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          <Link href="/" className="transition duration-300 hover:scale-105 hover:text-sky-500 font-mono">•kyu.log</Link>
        </h1>
        <button
          className="sm:hidden text-lg text-gray-700 dark:text-gray-200"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Bars3Icon className="w-6 h-6" />
        </button>
        <div className="hidden sm:flex items-center gap-6 text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
          <Link href="/about" className="hover:text-sky-500 transition">About</Link>
          <Link href="/projects" className="hover:text-sky-500 transition">Projects</Link>
          <Link href="/blog" className="hover:text-sky-500 transition">Blog</Link>
          <Link href="/contact" className="hover:text-sky-500 transition">Contact</Link>
          <AuthStatus />
        </div>
      </div>
      {menuOpen && (
        <div className="flex flex-col sm:hidden mt-4 gap-2 text-base text-gray-700 dark:text-gray-300 divide-y divide-gray-200 dark:divide-gray-700">
          <Link href="/about" className="py-2 hover:text-sky-500 transition">About</Link>
          <Link href="/projects" className="py-2 hover:text-sky-500 transition">Projects</Link>
          <Link href="/blog" className="py-2 hover:text-sky-500 transition">Blog</Link>
          <Link href="/contact" className="py-2 hover:text-sky-500 transition">Contact</Link>
          <div className="py-2"><AuthStatus /></div>
        </div>
      )}
    </header>
  );
}