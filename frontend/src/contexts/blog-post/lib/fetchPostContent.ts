export default async function fetchPostContent(slug: string) {
  const response = await fetch(`/api/posts/${slug}`);

  return response;
}
