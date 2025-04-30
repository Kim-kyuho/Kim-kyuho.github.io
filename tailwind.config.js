// tailwind.config.js
module.exports = {
    darkMode: "class",
    content: [
      "./src/**/*.{js,ts,jsx,tsx,mdx}",
      "./posts/**/*.{md,mdx}",      // 블로그 글까지 포함
      "./public/**/*.html"          // 혹시 정적 html 쓰는 경우까지 커버
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };