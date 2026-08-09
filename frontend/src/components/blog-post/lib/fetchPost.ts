import type { Post } from "../types/post";

import fetchMetadata from "./fetchMetadata";
import fetchPostContent from "./fetchPostContent";
import fetchPostImage from "./fetchPostImage";

export default async function fetchPost(
  slug: string,
  config?: { markdown?: boolean },
): Promise<Post> {
  const promises = await Promise.all([
    fetchMetadata(slug),
    fetchPostContent(slug, config),
  ]);

  let imageUrl: string | null = null;
  try {
    const imageBlob = await fetchPostImage(slug);
    imageUrl = URL.createObjectURL(imageBlob);
  } catch (e) {
    console.error("Error fetching post image:", e);
  }

  return {
    author: promises[0].author,
    content: promises[1]!,
    date: new Date(promises[0].date),
    imageUrl: imageUrl,
    slug: slug,
    title: promises[0].title,
    status: promises[0].status,
  };
}
