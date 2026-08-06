import client from "@/types/client";

export default async function deletePost(slug: string) {
  return await client.DELETE("/api/posts/{post_slug}", {
    params: { path: { post_slug: slug } },
  });
}
