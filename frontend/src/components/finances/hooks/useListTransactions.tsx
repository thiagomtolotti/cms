import { useQuery } from "@tanstack/react-query";
import listTransactions from "../lib/listTransactions";

export default function useListTransactions() {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: async () => listTransactions(),
    select: (data) => data?.transactions,
  });
}
