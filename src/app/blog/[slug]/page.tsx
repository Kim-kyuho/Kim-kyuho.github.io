import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { getAllPosts } from "@/lib/posts";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


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
  const [session, { slug }] = await Promise.all([
    getServerSession(authOptions),
    params,
  ]);

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

        {session?.user?.isAdmin && (
          <div className="flex justify-end mb-4">
            <Link
              href={`/blog/edit/${slug}`}
              className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
            >
              Edit
            </Link>
          </div>
        )}

        <div className="flex justify-between font-bold drop-shadow">
          {prevPost ? (
            <Link href={`/blog/${prevPost.slug}`} className="hover:underline">
              ← prev
            </Link>
          ) : <div />}
          {nextPost ? (
            <Link href={`/blog/${nextPost.slug}`} className="hover:underline">
              next →
            </Link>
          ) : <div />}
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2">📌 Read More Posts</h2>
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
        <div className="mt-6 text-center">
            <Link href="/blog" className="inline-block px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded">
              View All Posts →
            </Link>
          </div>
      </article>
    );
  } catch {
    notFound();
  }
}