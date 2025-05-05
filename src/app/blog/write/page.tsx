// src/app/blog/write/page.tsx

"use client";

import { useState } from "react";

export default function WritePage() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublish = async () => {
    if (!title || !summary || !content) {
      alert("제목, 요약, 내용을 모두 입력해주세요.");
      return;
    }

    setIsPublishing(true);

    const res = await fetch("/api/write", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, summary, content, tags, category }),
    });

    setIsPublishing(false);

    if (res.ok) {
      alert("✅ 업로드 성공!");
    } else {
      const errorText = await res.text();
      alert("❌ 업로드 실패...\n" + errorText);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">✍️ Write New Post</h1>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <textarea
        placeholder="Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <textarea
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <textarea
        placeholder="Markdown Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-60 p-2 border rounded"
      />
      <button
        onClick={handlePublish}
        disabled={isPublishing}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {isPublishing ? "업로드 중..." : "Publish to GitHub"}
      </button>
    </div>
  );
}
