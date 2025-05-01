// src/app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <section className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6">안녕하세요! 👋</h1>
      <p className="text-lg leading-7 text-gray-700 dark:text-gray-300 mb-4">
        저는 웹 개발자 김규호입니다. C#, Java, ASP.NET, SQL Server를 기반으로 한 다양한 시스템을 개발해왔습니다. 
        최근엔 React와 Next.js를 중심으로 새로운 기술을 배우고 있습니다.
      </p>
      <p className="text-lg leading-7 text-gray-700 dark:text-gray-300 mb-4">
        아래 링크를 통해 제가 진행한 프로젝트들을 확인해보세요!
      </p>
      <Link
        href="/projects"
        className="inline-block mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        프로젝트 보러가기 →
      </Link>
    </section>
  );
}