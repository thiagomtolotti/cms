import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import { toast } from "sonner";

import type { MaintainBlogPostDTO } from "../lib/createBlogPost";
import createBlogPost from "../lib/createBlogPost";

export default function useMaintainBlogPost(slug?: string) {
  const navigate = useNavigate();

  const create = useMutation({
    mutationFn: async (data: MaintainBlogPostDTO) => {
      createBlogPost(data);

      return data.slug;
    },
    onSuccess: (slug) => {
      toast.success("Post criado com sucesso!");
      navigate({ to: `/${slug}` });
    },
    onError: (error) => {
      toast.error(`Erro ao criar o post: ${error}`);
    },
  });

  const update = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mutationFn: async (_: MaintainBlogPostDTO) => {
      throw new Error("Update functionality not implemented yet");
    },
    onSuccess: (slug) => {
      toast.success("Post atualizado com sucesso!");
      navigate({ to: `/${slug}` });
    },
    onError: (error) => {
      toast.error(`Erro ao atualizar o post: ${error}`);
    },
  });

  return slug ? update : create;
}
