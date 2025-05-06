// src/app/about/page.tsx
export default function AboutPage() {
    return (
      <section className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6">About Me</h1>
        <p className="text-lg leading-7 text-gray-700 dark:text-gray-300 mb-4">
          はじめまして。私はWebエンジニアとして、業務システムの開発に携わってきました。
        </p>
        <p className="text-lg leading-7 text-gray-700 dark:text-gray-300 mb-4">
          現在はReactやNext.jsをはじめとしたモダンなWeb技術にも関心を持ち、ブログを通じて継続的に学習し、知見を共有しています。
        </p>
        <p className="text-lg leading-7 text-gray-700 dark:text-gray-300 mb-4">
          技術を通じて社会に価値を提供し、信頼されるエンジニアを目指して日々努力しています。
        </p>
        <p className="text-lg leading-7 text-gray-700 dark:text-gray-300">
          より良い開発者、そして人として成長し、社会に貢献できる存在でありたいと考えています。どうぞよろしくお願いいたします。
        </p>
        <div className="mt-8">
          <p className="text-lg leading-7 text-gray-700 dark:text-gray-300 mb-2">
            保有資格：日本語能力試験N1、韓国 情報処理技師
          </p>
          <p className="text-lg leading-7 text-gray-700 dark:text-gray-300">
            使用スキル：C#、Java、JavaScript、ASP.NET、SQL Server、React、Next.js、Oracle DB など
          </p>
        </div>
      </section>
    );
  }