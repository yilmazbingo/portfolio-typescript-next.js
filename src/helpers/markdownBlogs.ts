// fs and path can be used only in getServerSide code. otherwise it will throw error
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { IBlog } from "@/types/interfaces";

export const postsDirectory = path.join(process.cwd(), "src", "data", "posts");

// this returns all the filenames in given directory.
export function getPostsFiles() {
  const files = fs.readdirSync(postsDirectory);
  return files;
}
//
export function getPostData(postIdentifier: string): IBlog {
  const postSlug = postIdentifier.replace(/\.md$/, ""); // removes the file extension
  const filePath = path.join(postsDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent) as any;
  data.content = content;

  const post: IBlog = { ...data };
  return post;
}

export function getAllPosts() {
  const postFiles = getPostsFiles();
  const allPosts = postFiles.map((postFile) => {
    return getPostData(postFile);
  });
  const sortedPosts = allPosts.sort((postA, postB) =>
    postA.createdAt > postB.createdAt ? -1 : 1
  );
  return sortedPosts;
}

export function getFeaturedPosts() {
  const allPosts = getAllPosts();
  const featuredPosts = allPosts.filter((post) => post.isFeatured);
  return featuredPosts;
}

export function getPostsByField(field: string) {
  const allPosts = getAllPosts();
  const fieldPosts = allPosts.filter((post) => post.field === field);
  return fieldPosts;
}
