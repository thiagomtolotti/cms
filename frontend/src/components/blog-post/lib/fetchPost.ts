import type { Post } from "../types/post";

import fetchMetadata from "./fetchMetadata";
import fetchPostContent from "./fetchPostContent";
import getPostImage from "./fetchPostImage";

export default async function fetchPost(slug: string): Promise<Post> {
  const promises = await Promise.all([
    fetchMetadata(slug),
    fetchPostContent(slug),
    getPostImage(slug),
  ]);

  promises.forEach((promise) => {
    if (promise instanceof Error) {
      throw new Error(
        `Error fetching post data for slug "${slug}": ${promise.message}`,
      );
    }
  });

  return {
    author: promises[0].author,
    content: promises[1]!,
    date: new Date(promises[0].date),
    imageUrl: URL.createObjectURL(promises[2]!),
    slug: slug,
    title: promises[0].title,
  };
}
