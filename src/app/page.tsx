// src/app/page.tsx
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default async function HomePage() {
  const posts = await getAllPosts();
  const latestPosts = posts
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 5);

  return (
    <section className="max-w-3xl mx-auto px-4 py-8">
      {/* Introduction Section */}
      <div className="bg-sky-200 shadow-xl shadow-sky-200/50 dark:bg-gray-800 rounded-xl p-6 mb-8">
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
          className="inline-block mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          View Projects →
        </Link>
      </div>

      {/* Latest Posts Section */}
      <div className="bg-indigo-200 shadow-xl shadow-indigo-300/50 dark:bg-gray-800 rounded-xl p-6">
        <h2 className="text-2xl font-semibold mb-4 text-shadow-indigo-900 dark:text-gray-100">📝 最新の投稿</h2>
        <ul className="space-y-3">
          {latestPosts.map((post) => (
            <li
              key={post.slug}
              className="bg-white/50 dark:bg-white/10 backdrop-blur-md p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="text-emerald-900 dark:text-white font-semibold hover:underline"
              >
                {post.title}
              </Link>
              <p className="text-sm text-gray-600 dark:text-gray-300">{post.date}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}