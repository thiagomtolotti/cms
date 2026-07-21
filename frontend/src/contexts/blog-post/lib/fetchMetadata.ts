export interface PostMetadata {
  title: string;
  author: string;
  date: string;
}

export default async function fetchMetadata(
  slug: string,
): Promise<PostMetadata> {
  const response = await fetch(`http://localhost:8000/posts/${slug}/metadata`);

  return await response.json();
}
