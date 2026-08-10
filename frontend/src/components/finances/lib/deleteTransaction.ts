import client from "@/types/client";

export default async function deleteTransaction(id: string) {
  await client.DELETE("/api/finance/{transaction_id}", {
    params: { path: { transaction_id: id } },
  });
}
