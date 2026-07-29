import client from "@/types/client";
import type { components } from "../../../types/api";

export default async function fetchMetadata(
  slug: string,
): Promise<components["schemas"]["PostMetadataResponseDTO"]> {
  const res = await client.GET("/api/posts/{post_slug}/metadata", {
    params: { path: { post_slug: slug } },
  });

  return res.data!;
}
