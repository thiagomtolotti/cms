import client from "@/types/client";

export default async function fetchPostImage(slug: string): Promise<Blob> {
  const { data } = await client.GET("/api/posts/{post_slug}/image", {
    params: { path: { post_slug: slug } },
    parseAs: "blob",
  });

  return data as Blob;
}
