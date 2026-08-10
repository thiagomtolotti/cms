import { useMutation } from "@tanstack/react-query";
import deleteTransaction from "../lib/deleteTransaction";
import { toast } from "sonner";
import queryClient from "@/lib/queryClient";

export default function useDeleteTransaction() {
  return useMutation({
    mutationFn: async (id: string) => await deleteTransaction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast.success("Transação excluída com sucesso!");
    },
    onError: (error: Error) => {
      console.error(error);
      toast.error(
        "Houve um erro ao excluir a transação. Por favor, tente novamente.",
      );
    },
  });
}
