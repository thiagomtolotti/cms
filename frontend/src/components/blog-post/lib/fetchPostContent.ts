import client from "@/types/client";

export default async function fetchPostContent(slug: string) {
  const res = await client.GET("/api/posts/{post_slug}", {
    params: { path: { post_slug: slug } },
    parseAs: "text",
  });

  return res.data;
}
