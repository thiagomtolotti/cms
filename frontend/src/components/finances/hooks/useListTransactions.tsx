import { useQuery } from "@tanstack/react-query";
import listTransactions from "../lib/listTransactions";

import { fromCents } from "../lib/toCents";

export default function useListTransactions() {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: async () => listTransactions(),
    select: (data) =>
      data?.transactions.map((transaction) => ({
        ...transaction,
        amount: fromCents(transaction.amount),
      })),
  });
}
