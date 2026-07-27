import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import { toast } from "sonner";

import createBlogPost from "../lib/createBlogPost";
import updateBlogPost from "../lib/updateBlogPost";
import type { CreateBlogPostDTO } from "../lib/createBlogPost";
import type { UpdateBlogPostDTO } from "../lib/updateBlogPost";

export default function useMaintainBlogPost(slug?: string) {
  const navigate = useNavigate();

  const create = useMutation({
    mutationFn: async (data: CreateBlogPostDTO) => {
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
    mutationFn: async (dto: UpdateBlogPostDTO) => {
      updateBlogPost(dto);

      return dto.slug;
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
