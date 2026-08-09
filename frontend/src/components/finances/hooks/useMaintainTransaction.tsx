import { useMutation } from "@tanstack/react-query";
import createTransaction from "../lib/createTransaction";
import type { components } from "@/types/api";

export default function useMaintainTransaction() {
  return useMutation({
    mutationFn: async (transaction: components["schemas"]["Transaction"]) =>
      createTransaction(transaction),
  });
}
