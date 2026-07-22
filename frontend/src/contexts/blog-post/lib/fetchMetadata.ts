import type { components } from "../../../types/api";

export default async function fetchMetadata(
  slug: string,
): Promise<components["schemas"]["PostMetadataResponseDTO"]> {
  const response = await fetch(`/api/posts/${slug}/metadata`);

  return await response.json();
}
