"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

type Post = {
  id: string;
  slug: string;
  title: string;
  summary?: string;
  date: string;
  category?: string;
  tags?: string[];
};

export default function Search() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [query, setQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch("/posts.json")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  const uniqueTags = Array.from(new Set(posts.flatMap((p) => p.tags || [])));
  const uniqueCategories = Array.from(
    new Set(posts.map((p) => p.category).filter((cat): cat is string => !!cat))
  );

  const filtered = posts.filter((post) => {
    const matchesQuery =
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.summary?.toLowerCase().includes(query.toLowerCase());

    const matchesTag = selectedTag ? post.tags?.includes(selectedTag) : true;
    const matchesCategory = selectedCategory ? post.category === selectedCategory : true;

    return matchesQuery && matchesTag && matchesCategory;
  });

  const sorted = [...filtered].sort((a, b) => b.date.localeCompare(a.date));
  const POSTS_PER_PAGE = 5;
  const totalPages = Math.ceil(sorted.length / POSTS_PER_PAGE);
  const paginated = sorted.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  return (
    <div className="p-4 space-y-4">
      {/* Search input */}
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search..."
          className="w-full p-2 pr-10 border border-gray-300 rounded-full"
        />
        <button
          onClick={() => setQuery(inputValue)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black"
          aria-label="Search"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18.5a7.5 7.5 0 006.15-3.85z" />
          </svg>
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="font-semibold text-gray-700">Category:</span>
        <button onClick={() => setSelectedCategory(null)} className="text-sm underline text-gray-500 hover:text-gray-800">
          All
        </button>
        {uniqueCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`text-sm underline hover:text-gray-800 ${selectedCategory === cat ? "font-bold text-gray-900" : "text-gray-500"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tag Filter */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="font-semibold text-gray-700">Tag:</span>
        <button onClick={() => setSelectedTag(null)} className="text-sm underline text-gray-500 hover:text-gray-800">
          All
        </button>
        {uniqueTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`text-sm underline hover:text-gray-800 ${selectedTag === tag ? "font-bold text-gray-900" : "text-gray-500"}`}
          >
            #{tag}
          </button>
        ))}
      </div>

      {/* 결과 리스트 */}
      <ul className="space-y-4">
        {paginated.map((post) => (
          <li key={post.slug} className="border-b pb-2 flex justify-between items-start">
            <div>
              <a href={`/blog/${post.slug}`} className="text-lg font-semibold hover:text-gray-800">
                {post.title}
              </a>
              <p className="text-sm text-gray-500">{post.date} · {post.category}</p>
              <p className="text-sm">{post.summary}</p>
            </div>
            {session?.user?.isAdmin && (
              <button
                className="ml-4 px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                onClick={async () => {
                  const confirmed = confirm(`Are you sure you want to delete "${post.title}"?`);
                  if (!confirmed) return;

                  const res = await fetch("/api/delete", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: post.id }),
                  });

                  if (res.ok) {
                    alert("Post deleted successfully!");
                    location.reload();
                  } else {
                    const error = await res.json();
                    alert("Failed to delete post: " + JSON.stringify(error));
                  }
                }}
              >
                delete
              </button>
            )}
          </li>
        ))}
      </ul>
      <div className="text-right mt-4">
        {session?.user?.isAdmin && (
          <Link
            href="/blog/write"
            className="inline-block bg-blue-200 text-blue-900 font-medium px-4 py-2 rounded hover:bg-blue-300 transition"
          >
            New Post
          </Link>
        )}
      </div>

      <div className="flex gap-2 justify-center mt-6 items-center">
        {currentPage > 1 && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="w-8 h-8 flex items-center justify-center border rounded-full text-sm bg-blue-100 text-blue-800 hover:bg-blue-200"
          >
            ←
          </button>
        )}
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-8 h-8 flex items-center justify-center border rounded-full text-sm transition ${
              currentPage === i + 1
                ? "bg-blue-500 text-white font-semibold"
                : "bg-blue-100 text-blue-800 hover:bg-blue-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
        {currentPage < totalPages && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="w-8 h-8 flex items-center justify-center border rounded-full text-sm bg-blue-100 text-blue-800 hover:bg-blue-200"
          >
            →
          </button>
        )}
      </div>
    </div>
  );
}