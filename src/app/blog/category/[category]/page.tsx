// src/app/blog/category/[category]/page.tsx

import { getAllPosts } from "@/lib/posts";
import Link from "next/link";
import { notFound } from "next/navigation";

// Next.js 15 App Router가 기대하는 PageProps 타입에 딱 맞추기 위해
// params를 Promise<{ category: string }>로 선언하고, 내부에서 await 처리합니다.
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  // Next가 넘겨주는 params는 Promise 형태이므로 await로 꺼내 줍니다.
  const { category } = await params;

  const posts = await getAllPosts();
  const filtered = posts.filter((post) => post.category === category);

  if (filtered.length === 0) {
    return notFound();
  }

  return (
    <section className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">{category} 카테고리</h1>
      <ul className="space-y-6">
        {filtered.map((post) => (
          <li key={post.slug} className="border-b pb-4">
            <h2 className="text-xl font-semibold">
              <Link href={`/blog/${post.slug}`} className="hover:underline">
                {post.title}
              </Link>
            </h2>
            <p className="text-sm text-muted-foreground">{post.date}</p>
            <p className="mt-2">{post.summary}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export async function generateStaticParams(): Promise<{ category: string }[]> {
  const posts = await getAllPosts();
  const categories = Array.from(new Set(posts.map((p) => p.category)));
  return categories.map((category) => ({ category }));
}