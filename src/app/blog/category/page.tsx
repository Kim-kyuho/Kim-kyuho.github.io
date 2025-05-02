// src/app/blog/category/[category]/page.tsx

import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    category: string;
  };
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  const categories = Array.from(new Set(posts.map((p) => p.category)));

  return categories.map((category) => ({ category }));
}

export default async function CategoryPage({ params }: Props) {
  const allPosts = await getAllPosts();
  const filtered = allPosts.filter((post) => post.category === params.category);

  if (filtered.length === 0) return notFound();

  return (
    <section className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">
        “{params.category}” 카테고리의 글
      </h1>

      <div className="mb-6">
        <Link href="/blog" className="text-blue-500 hover:underline">
          ← 전체 글 보기
        </Link>
      </div>

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
