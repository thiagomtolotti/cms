export default async function fetchBlogPost(slug: string) {
  const response = await fetch(`http://localhost:8000/posts/${slug}`);

  return response;
}
