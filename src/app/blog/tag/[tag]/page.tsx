// src/app/blog/tag/[tag]/page.tsx
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions

import { getAllPosts } from "@/lib/posts";
import Link from "next/link";
import { notFound } from "next/navigation";

// 정적 경로 생성 함수 수정
export async function generateStaticParams(): Promise<{ tag: string }[]> {
  const posts = await getAllPosts();
  const tags = Array.from(new Set(posts.flatMap((post) => post.tags || [])));
  console.log("정적 생성할 태그:", tags); // 여기서 "잡담"이 보이는지 확인
  return tags.map((tag) => ({ tag }));
}

// 페이지 함수 수정
// 페이지 함수
export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const posts = await getAllPosts();
  const filtered = posts.filter((post) => post.tags.includes(tag));

  if (filtered.length === 0) return notFound();

  return (
    <section className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">#{tag} 태그</h1>
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