'use client';

import Link from "next/link";

const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? '/portfolio-blog' : '';

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 sm:px-8 border-b border-gray-200 dark:border-gray-700">
      <h1 className="text-xl font-bold text-foreground">
        <Link href={`${basePath}/`}>Kyuho</Link>
      </h1>
      <nav className="space-x-4 text-sm sm:text-base">
        <Link className="hover:underline" href={`${basePath}/about`}>About</Link>
        <Link className="hover:underline" href={`${basePath}/projects`}>Projects</Link>
        <Link className="hover:underline" href={`${basePath}/blog`}>Blog</Link>
        <Link className="hover:underline" href={`${basePath}/contact`}>Contact</Link>
      </nav>
    </header>
  );
}