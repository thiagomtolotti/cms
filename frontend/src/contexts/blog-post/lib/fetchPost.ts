import type { Post } from "../types/post";

import fetchMetadata from "./fetchMetadata";
import fetchPostContent from "./fetchPostContent";
import getPostImage from "./fetchPostImage";

export default async function fetchPost(slug: string): Promise<Post> {
  const promises = await Promise.all([
    fetchMetadata(slug),
    fetchPostContent(slug),
  ]);

  if (!promises[0] || !promises[1]) {
    throw new Error("Failed to fetch post data.");
  }

  return {
    author: promises[0].author,
    content: promises[1],
    date: new Date(promises[0].date),
    imageUrl: getPostImage(slug),
    slug: slug,
    title: promises[0].title,
  };
}
