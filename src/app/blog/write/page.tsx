"use client";

import { useState } from "react";

export default function WritePage() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateForm = () => {
    if (!title || !summary || !content) {
      setErrorMessage("제목, 요약, 내용을 모두 입력해주세요.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handlePublish = async () => {
    if (!validateForm()) return;

    setIsPublishing(true);

    try {
      const res = await fetch("/api/write", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, summary, content, tags, category }),
      });

      if (res.ok) {
        setSuccessMessage("✅ 업로드 성공!");
        setTitle("");
        setSummary("");
        setContent("");
        setTags("");
        setCategory("");
      } else {
        const errorText = await res.json(); // 응답을 JSON으로 처리
        setErrorMessage(`❌ 업로드 실패...\n${JSON.stringify(errorText)}`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(`❌ 네트워크 오류: ${error.message}`);
      } else {
        setErrorMessage("❌ 알 수 없는 오류 발생");
      }
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">✍️ Write a New Blog Post</h1>

      <div>
        <label className="block font-semibold mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter the title"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Summary</label>
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Write a short summary"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Tags (comma-separated)</label>
        <textarea
          value={tags}
          onChange={(e) =>
            setTags(
              e.target.value
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean)
                .join(", ")
            )
          }
          className="w-full p-2 border rounded"
          placeholder="e.g. react, nextjs, typescript"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter category"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Markdown Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-60 p-2 border rounded"
          placeholder="Write your post in markdown..."
        />
      </div>

      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      {successMessage && <div className="text-green-500">{successMessage}</div>}

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
