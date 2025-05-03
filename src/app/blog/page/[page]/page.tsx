// src/app/blog/page/[page]/page.tsx

import { getAllPosts } from "@/lib/posts";
import Link from "next/link";
import { notFound } from "next/navigation";

const POSTS_PER_PAGE = 5;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  return Array.from({ length: totalPages }, (_, i) => ({ page: String(i + 1) }));
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const allPosts = await getAllPosts();
  const sortedPosts = allPosts.sort((a, b) => b.date.localeCompare(a.date));
  const { page } = await params;
  const currentPage = parseInt(page, 10);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const paginatedPosts = sortedPosts.slice(startIndex, endIndex);

  if (paginatedPosts.length === 0) return notFound();

  return (
    <section className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Page {currentPage}</h1>
      <ul className="space-y-6">
        {paginatedPosts.map((post) => (
          <li key={post.slug} className="border-b pb-4">
            <h2 className="text-xl font-semibold">
              <Link href={`/blog/${post.slug.toLowerCase()}`} className="hover:underline">
                {post.title}
              </Link>
            </h2>
            <p className="text-sm text-muted-foreground">{post.date}</p>
            <p className="mt-2">{post.summary}</p>
          </li>
        ))}
      </ul>

      {/* Pagination links */}
      <div className="mt-8 space-x-2">
        {currentPage > 1 && (
          <Link href={`/blog/page/${currentPage - 1}`} className="px-2 py-1 border rounded">
            Previous
          </Link>
        )}
        {endIndex < allPosts.length && (
          <Link href={`/blog/page/${currentPage + 1}`} className="px-2 py-1 border rounded">
            Next
          </Link>
        )}
      </div>
    </section>
  );
}
