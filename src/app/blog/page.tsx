// src/app/blog/page.tsx

import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

// ✅ 정적 빌드 가능하게 비동기 서버 컴포넌트
export default async function BlogPage() {
  const posts = await getAllPosts();

  // ✅ 정적 필터링: 전체 카테고리/태그 목록 추출
  const categories = Array.from(new Set(posts.map((p) => p.category)));
  const tags = Array.from(new Set(posts.flatMap((p) => p.tags)));

  return (
    <section className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>

      {/* ✅ 카테고리 필터 */}
      <div className="mb-4 space-x-2">
        <span className="font-semibold">Category:</span>
        <Link href="/blog" className="px-2 py-1 border rounded">All</Link>
        {categories.map((cat) => (
          <Link
            key={cat}
            href={`/blog/category/${cat}`}
            className="px-2 py-1 border rounded"
          >
            {cat}
          </Link>
        ))}
      </div>

      {/* ✅ 태그 필터 */}
      <div className="mb-8 space-x-2">
        <span className="font-semibold">Tags:</span>
        {tags.map((tag) => (
          <Link
            key={tag}
            href={`/blog/tag/${tag}`}
            className="inline-block px-2 py-1 text-sm border rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            #{tag}
          </Link>
        ))}
      </div>

      {/* ✅ 전체 글 목록 렌더링 */}
      <ul className="space-y-6">
        {posts.map((post) => (
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
