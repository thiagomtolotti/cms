import type { Post } from "../types/post";
import fetchMetadata from "./fetchMetadata";
import fetchPostContent from "./fetchPostContent";
import getPostImage from "./fetchPostImage";

export default async function fetchPost(slug: string): Promise<Post> {
  const promises = await Promise.all([
    fetchMetadata(slug),
    fetchPostContent(slug),
  ]);

  return {
    author: promises[0].author,
    content: await promises[1].text(),
    date: new Date(promises[0].date),
    imageUrl: getPostImage(slug),
    slug: slug,
    title: promises[0].title,
  };
}
