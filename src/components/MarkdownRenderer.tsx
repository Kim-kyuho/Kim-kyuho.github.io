// src/components/MarkdownRenderer.tsx
import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css"; // 원하는 테마로 바꿔도 OK

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="prose dark:prose-invert">
      <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}