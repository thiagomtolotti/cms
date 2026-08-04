import { useMutation } from "@tanstack/react-query";
import deletePost from "../lib/deletePost";
import { toast } from "sonner";
import { queryClient } from "@/main";

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
