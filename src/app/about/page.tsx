// src/app/about/page.tsx
export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8"> {/* Optional container centering */}
      {/* Introduction Section (Top Card) */}
      <div className="bg-sky-200 shadow-xl shadow-sky-200/50 dark:bg-gray-800 rounded-xl p-6 mb-8">
        <p className="text-lg leading-7 text-blue-950 dark:text-gray-100">
          Webエンジニアの**KYU**と申します。Web開発を通じて使いやすく、
          価値のあるサービスを作ることにやりがいを感じており、常に学び続ける姿勢を大切にしています。
        </p>
        <p className="text-lg leading-7 text-blue-950 dark:text-gray-100 mt-4">
          C#、Java、ASP.NET、Oracle DB、SQL Server などを用いた業務システムの開発経験があり、
          現在は React や Next.js などの最新技術にも積極的に取り組んでいます。
        </p>
      </div>

      {/* Qualifications & Skills Section (Bottom Card) */}
      <div className="bg-pink-200 shadow-xl shadow-pink-200/50 dark:bg-gray-800  rounded-xl p-3 mb-8">
        <p className="text-lg leading-7 text-red-950 dark:text-gray-100 mb-1">
          <strong>保有資格:</strong> 日本語能力試験N1、(韓国)情報処理技師資格
        </p>
      </div>
      <div className ="bg-teal-300 shadow-xl shadow-teal-300/50 dark:bg-gray-800  rounded-xl p-3">
        <p className="text-lg font-bold text-yellow-950 dark:text-gray-100 mb-2">
          使用スキル:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {[
            { src: "csharp.svg", label: "C#" },
            { src: "java.svg", label: "Java" },
            { src: "javascript.svg", label: "JavaScript" },
            { src: "react.svg", label: "React" },
            { src: "nextjs.svg", label: "Next.js" }, 
            { src: "aspnet.svg", label: "ASP.NET" },
            { src: "oracle.svg", label: "Oracle DB" },
            { src: "sqlserver.svg", label: "SQL Server" }    
          ].map((tech, idx) => (
            <div
              key={idx}
              className={`flex items-center space-x-3 p-4 rounded-lg shadow-md bg-white/50 dark:bg-gray-900 transition-transform hover:scale-105 ${
                idx % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              <img src={`/tech-icons/${tech.src}`} alt={tech.label} className="w-7 h-7" />
              <span className="text-gray-800 dark:text-gray-100 font-medium">{tech.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}