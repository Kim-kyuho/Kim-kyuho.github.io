// tailwind.config.js
module.exports = {
    darkMode: "class",
    content: [
      "./src/**/*.{js,ts,jsx,tsx,mdx}",
      "./posts/**/*.{md,mdx}",      // 블로그 글까지 포함
      "./public/**/*.html"          // 혹시 정적 html 쓰는 경우까지 커버
    ],
    theme: {
      extend: {
        typography: {
          DEFAULT: {
            css: {
              'code': {
                color: '#e11d48', // 예시: rose-600
                backgroundColor: '#f3f4f6', // gray-100
                padding: '0.2em 0.4em',
                borderRadius: '0.25rem',
                fontWeight: '500',
              },
              'pre code': {
                backgroundColor: '#111827', // ✅ gray-900 같은 더 진한 회색
                color: '#f9fafb',
                padding: '1em',
                borderRadius: '0.5rem',
                overflowX: 'auto',
              },
              pre: {
                backgroundColor: '#1f2937', // gray-800
                color: '#f9fafb',
                padding: '1em',
                borderRadius: '0.5rem',
                overflowX: 'auto',
              },
            },
          },
        },
      },
    },
    plugins: [require('@tailwindcss/typography')],
    
  };