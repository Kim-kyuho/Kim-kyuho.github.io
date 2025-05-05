"use client";
import type { WritePageProps } from "@/app/types/write";

import { useState, useRef, useEffect } from "react";
import type { PostFormData } from "@/app/types/write";

interface WritePageProps {
  initialData?: PostFormData;
  isEditMode?: boolean;
}
// Internal component handling write/edit logic
export function WritePage({ initialData, isEditMode = false }: WritePageProps = {}) {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Initialize states if in edit mode
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setSummary(initialData.summary);
      setContent(initialData.content);
      setTags(initialData.tags);
      setCategory(initialData.category);
      // Set id if provided
      (function() { /* no direct setter for id, it's read-only */ })();
    }
  }, [initialData]);

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
      const tagArray = tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const endpoint = isEditMode ? "/api/update" : "/api/write";
      const payload = {
        id: isEditMode ? initialData?.id : undefined,
        title,
        summary,
        content,
        tags: tagArray,
        category,
      };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSuccessMessage("✅ 업로드 성공!");
        setTitle("");
        setSummary("");
        setContent("");
        setTags("");
        setCategory("");
        if (isEditMode) {
          setSuccessMessage("✅ 수정 성공!");
        }
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
          onChange={(e) => setTags(e.target.value)}
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

      <div className="flex items-center gap-4 mb-4">
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={async (e) => {
            e.preventDefault();
            const file = e.dataTransfer.files?.[0];
            if (!file || !file.type.startsWith("image/")) return alert("이미지 파일만 올릴 수 있어요!");

            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch("/api/upload-image", {
              method: "POST",
              body: formData,
            });

            if (res.ok) {
              const { url } = await res.json();
              const textarea = textareaRef.current;
              if (!textarea) return;

              const cursorPos = textarea.selectionStart;
              const before = content.slice(0, cursorPos);
              const after = content.slice(cursorPos);
              setContent(`${before}\n\n![image](${url})\n\n${after}`);
            } else {
              alert("이미지 업로드 실패 😢");
            }
          }}
          className="flex-1 border-2 border-dashed border-gray-300 rounded p-6 text-center text-sm text-gray-500 hover:border-blue-400"
        >
          이곳에 이미지를 드래그 앤 드롭하세요
        </div>

        <div className="w-40">
          <label className="block font-bold text-white bg-orange-500 px-3 py-1 rounded mb-1 text-center">
            Select File
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file || !file.type.startsWith("image/")) return alert("이미지 파일만 업로드할 수 있어요!");

              const formData = new FormData();
              formData.append("file", file);

              const res = await fetch("/api/upload-image", {
                method: "POST",
                body: formData,
              });

              if (res.ok) {
                const { url } = await res.json();
                const textarea = textareaRef.current;
                if (!textarea) return;
                const cursorPos = textarea.selectionStart;
                const before = content.slice(0, cursorPos);
                const after = content.slice(cursorPos);
                setContent(`${before}\n\n![image](${url})\n\n${after}`);
              } else {
                alert("이미지 업로드 실패 😢");
              }

              e.target.value = "";
            }}
            className="block w-full"
          />
        </div>
      </div>

      <div>
        <label className="block font-semibold mb-1">Markdown Content</label>
        <textarea
          ref={textareaRef}
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
        {isPublishing 
          ? isEditMode 
            ? "수정 중..." 
            : "업로드 중..." 
          : isEditMode 
            ? "Update Post" 
            : "Publish to GitHub"}
      </button>
    </div>
  );
 }

// Page component for /blog/write route
export default function Page() {
  return <WritePage />;
}
