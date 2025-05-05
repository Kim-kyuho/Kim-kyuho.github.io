export const dynamic = "force-dynamic";
// src/app/api/write/route.ts

import { NextRequest, NextResponse } from "next/server";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = process.env.REPO_OWNER;
const REPO_NAME = process.env.REPO_NAME;

const validateEnvVars = () => {
  if (!GITHUB_TOKEN || !REPO_OWNER || !REPO_NAME) {
    throw new Error("Missing environment variables: GITHUB_TOKEN, REPO_OWNER, or REPO_NAME");
  }
};

export async function POST(req: NextRequest) {
  try {
    validateEnvVars(); // 환경 변수 검증

    const { title, summary, content, category, tags } = await req.json();

    if (!title || !summary || !content) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const today = new Date().toISOString().split("T")[0];
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9가-힣]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .replace(/-+/g, "-");

    const markdown = `---\ntitle: "${title}"\ndate: "${today}"\nsummary: "${summary}"\ncategory: "${category || ""}"\ntags:\n${(tags || []).map((tag: string) => `  - "${tag}"`).join("\n")}\n---\n\n${content}`;
    const base64 = Buffer.from(markdown, "utf-8").toString("base64");

    const githubRes = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/posts/${slug}.md`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `Add new post: ${title}`,
          content: base64,
        }),
      }
    );

    if (!githubRes.ok) {
      const error = await githubRes.json();
      return NextResponse.json({ error: error.message || "Failed to upload to GitHub" }, { status: 500 });
    }

    return NextResponse.json({ message: "Success", slug }, { status: 201 });
  } catch (err) {
    console.error("GitHub API Error:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}