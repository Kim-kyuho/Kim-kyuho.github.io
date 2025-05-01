// src/app/blog/[slug]/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import Markdown from "markdown-to-jsx";

export async function generateStaticParams() {
  const files = fs.readdirSync("posts");
  return files.map((file) => ({
    slug: file.replace(/\.md$/, ""),
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const filePath = path.join("posts", `${params.slug}.md`);

  if (!fs.existsSync(filePath)) return notFound();

  const fileContent = fs.readFileSync(filePath, "utf-8");
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
}