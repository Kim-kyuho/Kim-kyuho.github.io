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
  // dropdown state for tag/category
  const [showTags, setShowTags] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

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
    <div className="bg-green-200 dark:bg-gray-600 p-6 rounded-3xl shadow-lg shadow-green-300/50">
      {/* Search, Category, Tag Filters */}
      <div className="space-y-1 mb-6">
        {/* Search Input */}
        <div className="relative mb-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search..."
            className="w-full p-2 pr-10 bg-gray-100 border border-gray-300 rounded-full"
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
        <div className="relative">
          <span className="font-semibold text-green-700">Category: </span>
          <button
            onClick={() => setShowCategories(!showCategories)}
            className="inline-block text-xs font-semibold text-green-900 bg-emerald-200 px-1.5 py-0.5 rounded-full shadow-md hover:bg-emerald-300 transition duration-200"
          >
            {selectedCategory || "All"}
          </button>
          {showCategories && (
            <div className="absolute z-10 top-0 left-[14.5%] ml-2 bg-gradient-to-br from-pink-100 via-white to-emerald-100 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 shadow-xl rounded-xl p-3 ring-1 ring-emerald-200 animate-fade-in">
              <button onClick={() => { setSelectedCategory(null); setShowCategories(false); }} className="block px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">All</button>
              {uniqueCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setSelectedCategory(cat); setShowCategories(false); }}
                  className="block px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tag Filter */}
        <div className="relative">
          <span className="font-semibold text-red-600">Tag: </span>
          <button
            onClick={() => setShowTags(!showTags)}
            className="inline-block text-xs font-semibold text-red-900 bg-pink-200 px-1.5 py-0.5 rounded-full shadow-md hover:bg-pink-300 transition duration-200"
          >
            {selectedTag || "All"}
          </button>
          {showTags && (
            <div className="absolute z-10 top-87left-0 mt-1.5 bg-gradient-to-br from-pink-100 via-white to-emerald-100 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 shadow-xl rounded-xl p-3 ring-1 ring-emerald-200 animate-fade-in">
              <button onClick={() => { setSelectedTag(null); setShowTags(false); }} className="block px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">All</button>
              {uniqueTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => { setSelectedTag(tag); setShowTags(false); }}
                  className="block px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Post Results */}
      <ul className="space-y-4">
        {paginated.map((post) => (
          <li
            key={post.slug}
            className="bg-white/60 dark:bg-white/10 backdrop-blur-lg border border-white/30 rounded-xl shadow-md p-4 transition hover:shadow-lg"
          >
            <a href={`/blog/${post.slug}`} className="text-lg font-semibold text-blue-900 dark:text-white hover:underline">
              {post.title}
            </a>
            <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">{post.date} · {post.category}</p>
            <p className="text-sm text-gray-700 dark:text-gray-100 mt-2">{post.summary}</p>
            {session?.user?.isAdmin && (
              <button
                className="ml-4 px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 mt-3"
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

      {/* New Post & Pagination */}
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