import type { components } from "@/types/api";
import client from "@/types/client";

export default async function fetchSankeyData(): Promise<
  components["schemas"]["GetSankeyResponseDTO"]
> {
  const { data } = await client.GET("/api/finance/sankey");

  return data!;
}
