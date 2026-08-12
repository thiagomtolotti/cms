import type { components } from "@/types/api";
import client from "@/types/client";

export default async function createTransaction(
  transaction: components["schemas"]["Transaction"],
) {
  return await client.POST("/api/finance", {
    body: transaction,
  });
}
