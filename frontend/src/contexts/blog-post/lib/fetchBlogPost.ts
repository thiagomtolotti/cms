export default async function fetchBlogPost(slug: string) {
  const response = await fetch(`/api/posts/${slug}`);

  return response;
}
