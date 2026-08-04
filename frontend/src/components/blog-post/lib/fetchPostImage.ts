export default async function getPostImage(slug: string) {
  return `/api/posts/${slug}/image`;
}
