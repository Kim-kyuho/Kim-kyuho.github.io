// src/app/blog/[slug]/page.tsx

import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { getAllPosts } from "@/lib/posts";
import Link from "next/link";


// 정적 경로 생성
export async function generateStaticParams() {
  const files = await fs.readdir(path.join(process.cwd(), "posts"));
  return files.map((file) => ({
    slug: file.replace(/\.md$/, ""),
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = await getAllPosts();
  const currentIndex = posts.findIndex((p) => p.slug === slug);
  const prevPost = posts[currentIndex + 1];
  const nextPost = posts[currentIndex - 1];
  const recentPosts = posts.filter((p) => p.slug !== slug).slice(0, 3);

  const filePath = path.join(process.cwd(), "posts", `${slug}.md`);
  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    const { content, data } = matter(fileContent);

    return (
      <article className="max-w-3xl mx-auto py-12 px-4 prose dark:prose-invert">
        <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
        <p className="text-sm text-muted-foreground mb-8">{data.date}</p>
        <MarkdownRenderer content={content} />  

        <div className="text-white px-4 py-2 rounded">
          {prevPost ? (
            <Link href={`/blog/${prevPost.slug}`} className="bg-sky-500 hover:bg-sky-700">
              ← prev
            </Link>
          ) : <div />}
          {nextPost ? (
            <Link href={`/blog/${nextPost.slug}`} className="bg-sky-500 hover:bg-sky-700">
              next →
            </Link>
          ) : <div />}
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2">📌 다른 글도 읽어보세요</h2>
          <ul className="space-y-2">
            {recentPosts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="text-blue-500 hover:underline">
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </article>
    );
  } catch {
    notFound();
  }
}