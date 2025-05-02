// src/app/blog/category/[category]/page.tsx

import { getAllPosts } from "@/lib/posts";
import Link from "next/link";
import { notFound } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function CategoryPage(props: any) {
  const category = props.params.category as string;

  const posts = await getAllPosts();
  const filtered = posts.filter((post) => post.category === category);

  if (filtered.length === 0) return notFound();

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

export async function generateStaticParams() {
  const posts = await getAllPosts();
  const categories = Array.from(new Set(posts.map((p) => p.category)));

  return categories.map((category) => ({
    category,
  }));
}
