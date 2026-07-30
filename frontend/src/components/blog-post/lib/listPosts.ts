import client from "@/types/client";

export default async function listPosts() {
  const { data } = await client.GET("/api/posts/");

  return data!;
}
