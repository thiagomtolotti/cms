import client from "@/types/client";

export default async function listTransactions() {
  const { data } = await client.GET("/api/finance");

  return data;
}
