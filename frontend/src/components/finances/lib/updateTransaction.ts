import type { components } from "@/types/api";
import client from "@/types/client";

export default async function updateTransaction(
  id: string,
  transaction: components["schemas"]["Transaction"],
) {
  await client.PUT("/api/finance/{transaction_id}", {
    params: { path: { transaction_id: id } },
    body: transaction,
  });
}
