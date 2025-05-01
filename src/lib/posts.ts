// src/lib/posts.ts
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export async function getAllPosts() {
  const filenames = await fs.readdir(postsDirectory);

  const posts = await Promise.all(
    filenames.map(async (filename) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = await fs.readFile(filePath, "utf8");
      const { data } = matter(fileContents);

      return {
        title: data.title,
        date: data.date,
        summary: data.summary,
        slug: filename.replace(/\.md$/, ""),
      };
    })
  );

  return posts;
}