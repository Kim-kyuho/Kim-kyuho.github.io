// src/app/page.tsx
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default async function HomePage() {
  const posts = await getAllPosts();
  const latestPosts = posts
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 3);

  return (
    <section className="max-w-3xl mx-auto px-4 py-8">
      {/* Introduction Section */}
      <div className="bg-white shadow-xl dark:bg-gray-800 rounded-xl p-6 mb-8">
        <h1 className="text-2xl font-bold mb-4 text-blue-950 dark:text-gray-100">
          こんにちは！ <span role="img" aria-label="waving hand">👋</span>
        </h1>
        <p className="text-lg leading-7 text-blue-950 dark:text-gray-100">
          はじめまして、**KYU**と申します！<br />
          コードと格闘しながら、日々「おおっ、動いた！」という小さな感動を糧に生きております。<br />
          毎日少しずつでも学びを積み重ね、昨日の自分よりちょっとだけ成長することを目標に、エンジニア人生を満喫中です。<br />
          バグに泣き、デバッグに笑い、気がつけば夜。そんな毎日ですが、この道のりすべてが、きっと未来の糧になると信じて、今日もエディタを開きます。<br />
          どうぞよろしくお願いします！
        </p>
        <p className="text-lg leading-7 text-blue-950 dark:text-gray-100 mt-4">
          下記のリンクから、私が担当したプロジェクトをご確認いただけます。
        </p>
        <Link
          href="/projects"
          className="inline-block mt-4 px-6 py-2 bg-pink-200 text-pink-950 rounded hover:bg-pink-400 transition active:scale-95 transition-transform"
        >
          View Projects →
        </Link>
      </div>

      {/* Latest Posts Section */}
      <div className="bg-white shadow-xl dark:bg-gray-800 rounded-xl p-6">
        <h2 className="text-2xl font-semibold mb-4 text-shadow-indigo-900 dark:text-gray-100">📝 最新の投稿</h2>
        <ul className="space-y-3">
          {latestPosts.map((post) => (
            <li key={post.slug}>
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block bg-white dark:bg-white/5 p-4 rounded-xl border border-white/70 dark:border-white/20 shadow transition duration-300 ease-in-out hover:bg-indigo-500 hover:shadow-indigo-300 active:scale-95 transition-transform"
              >
                <div>
                  <h3 className="text-lg font-semibold text-blue-900 dark:text-white hover:underline">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-300 dark:hover:text-gray-300 mt-1 inline-block active:scale-95 transition-transform">
                    {post.date}
                    {post.category && (
                      <span className="ml-2 text-green-800 bg-green-100 px-2 py-1 rounded-full text-xs">
                        {post.category}
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-100 dark:hover:text-gray-100 mt-2">{post.summary}</p>
                  {post.tags && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span key={tag} className="text-xs text-pink-700 bg-pink-100 px-2 py-1 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/blog"
          className="mt-6 inline-block px-5 py-2 bg-pink-200 text-pink-950 font-semibold rounded hover:bg-pink-300 transition active:scale-95 transition-transform"
        >
          View All Posts →
        </Link>
      </div>
    </section>
  );
}