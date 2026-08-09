import { useMutation } from "@tanstack/react-query";
import createTransaction from "../lib/createTransaction";

import type { Transaction } from "../types/transaction";

export default function useMaintainTransaction() {
  return useMutation({
    mutationFn: async (transaction: Transaction) =>
      createTransaction(transaction),
  });
}
