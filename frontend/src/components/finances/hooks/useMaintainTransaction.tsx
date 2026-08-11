import { useMutation } from "@tanstack/react-query";
import queryClient from "@/lib/queryClient";

import updateTransaction from "../lib/updateTransaction";
import createTransaction from "../lib/createTransaction";

import { toast } from "sonner";

import type { components } from "@/types/api";

import toCents from "../lib/toCents";

export default function useMaintainTransaction(id?: string) {
  const update = useMutation({
    mutationFn: async (transaction: components["schemas"]["Transaction"]) =>
      updateTransaction(id!, {
        ...transaction,
        amount: toCents(transaction.amount),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["sankey"] });
      toast.success("Transação atualizada com sucesso!");
    },
    onError: (error: Error) => {
      console.error(error);
      toast.error("Erro ao atualizar transação!");
    },
  });

  const create = useMutation({
    mutationFn: async (transaction: components["schemas"]["Transaction"]) =>
      createTransaction({
        ...transaction,
        amount: toCents(transaction.amount),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["sankey"] });
      toast.success("Transação criada com sucesso!");
    },
    onError: (error: Error) => {
      console.error(error);
      toast.error("Erro ao criar transação!");
    },
  });

  if (id) {
    return update;
  }

  return create;
}
