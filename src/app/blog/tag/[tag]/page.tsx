// src/app/blog/tag/[tag]/page.tsx

import { getAllPosts } from "@/lib/posts";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams(): Promise<{ tag: string }[]> {
  const posts = await getAllPosts();
  const tags = Array.from(new Set(posts.flatMap((post) => post.tags || [])));
  return tags.map((tag) => ({
    tag: encodeURIComponent(tag),
  }));
}

export default async function TagPage({
    params,
  }: {
    params: Promise<{ tag: string }>;
  }) {
    const { tag } = await params;
    const decodedTag = decodeURIComponent(tag);
    const posts = await getAllPosts();

    const filtered = posts.filter((post) =>
      post.tags.includes(decodedTag)
    );

  if (filtered.length === 0) return notFound();

  return (
    <section className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">#{decodedTag} 태그</h1>
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