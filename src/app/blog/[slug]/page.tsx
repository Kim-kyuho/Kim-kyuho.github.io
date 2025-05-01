// src/app/blog/[slug]/page.tsx
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import Markdown from "markdown-to-jsx";
import type { JSX } from "react";

// 정적 경로 생성
export async function generateStaticParams() {
  const files = await fs.readdir(path.join(process.cwd(), "posts"));
  return files.map((file) => ({
    slug: file.replace(/\.md$/, ""),
  }));
}

// 여기서 params의 타입을 Promise<{ slug: string }> 으로 맞춰준다
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<JSX.Element> {
  // Next.js가 넘겨준 params를 await 해서 실제 slug를 꺼낸다
  const { slug } = await params;
  const filePath = path.join(process.cwd(), "posts", `${slug}.md`);

  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    const { content, data } = matter(fileContent);

    return (
      <article className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
        <p className="text-sm text-muted-foreground mb-8">{data.date}</p>
        <div className="prose dark:prose-invert">
          <Markdown>{content}</Markdown>
        </div>
      </article>
    );
  } catch {
    notFound();
  }
}