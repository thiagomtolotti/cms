import { useMutation } from "@tanstack/react-query";
import queryClient from "@/lib/queryClient";

import updateTransaction from "../lib/updateTransaction";
import createTransaction from "../lib/createTransaction";

import { toast } from "sonner";

import type { components } from "@/types/api";

export default function useMaintainTransaction(id?: string) {
  const update = useMutation({
    mutationFn: async (transaction: components["schemas"]["Transaction"]) =>
      updateTransaction(id!, transaction),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast.success("Transação atualizada com sucesso!");
    },
    onError: (error: Error) => {
      console.error(error);
      toast.error("Erro ao atualizar transação!");
    },
  });

  const create = useMutation({
    mutationFn: async (transaction: components["schemas"]["Transaction"]) =>
      createTransaction(transaction),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
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
