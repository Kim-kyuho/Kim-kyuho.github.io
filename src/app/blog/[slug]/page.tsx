// src/app/blog/[slug]/page.tsx
import React from "react";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"; // 스타일도 설치 필요


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
  const filePath = path.join(process.cwd(), "posts", `${slug}.md`);
  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    const { content, data } = matter(fileContent);

    return (
      <article className="max-w-3xl mx-auto py-12 px-4 prose dark:prose-invert">
        <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
        <p className="text-sm text-muted-foreground mb-8">{data.date}</p>
        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
          {content}
        </ReactMarkdown>
      </article>
    );
  } catch {
    notFound();
  }
}