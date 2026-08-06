import type { paths } from "@/types/api";
import client from "@/types/client";

export default async function fetchPostContent(
  slug: string,
  config?: { markdown?: boolean },
): Promise<string> {
  const endpoint: keyof paths = config?.markdown
    ? "/api/posts/{post_slug}/markdown"
    : "/api/posts/{post_slug}";

  const res = await client.GET(endpoint, {
    params: { path: { post_slug: slug } },
    parseAs: "text",
  });

  return res.data!;
}
