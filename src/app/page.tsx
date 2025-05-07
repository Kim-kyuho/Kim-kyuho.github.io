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
    <section className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6">こんにちは！👋</h1>
      <p className="text-lg leading-7 text-gray-700 dark:text-white mb-4">
        はじめまして、Webエンジニアのキム・ギュホと申します。Web開発を通じて「使いやすく、価値のあるサービスを作ること」にやりがいを感じており、常に学び続ける姿勢を大切にしています。<br />
        C#、Java、ASP.NET、Oracle DB、SQL Serverなどを用いた業務システムの開発経験があり、現在はReactやNext.jsなどの最新技術にも積極的に取り組んでいます。<br />
        日本語能力試験N1および韓国の情報処理技師資格を保有しています。
      </p>
      <p className="text-lg leading-7 text-gray-700 dark:text-white mb-4">
        下記のリンクから、私が担当したプロジェクトをご確認いただけます。
      </p>
      <Link
        href="/projects"
        className="inline-block mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        View Projects →
      </Link>
      <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-4">📝 Latest Posts</h2>        <ul className="space-y-3">
          {latestPosts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:underline">
                {post.title}
              </Link>
              <p className="text-sm text-gray-500">{post.date}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}