import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";

import deletePost from "../lib/deletePost";
import queryClient from "@/lib/queryClient";

export default function useDeletePost(slug: string) {
  return useMutation({
    mutationFn: () => deletePost(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post excluído com sucesso!");
    },
    onError: (error) => {
      console.error("Erro ao excluir o post:", error);
      toast.error("Erro ao excluir o post. Por favor, tente novamente.");
    },
  });
}
