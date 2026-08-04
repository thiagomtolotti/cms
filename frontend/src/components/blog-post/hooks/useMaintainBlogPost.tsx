import { useMutation } from "@tanstack/react-query";
import { useCanGoBack, useNavigate, useRouter } from "@tanstack/react-router";

import { toast } from "sonner";

import createBlogPost from "../lib/createBlogPost";
import updateBlogPost from "../lib/updateBlogPost";
import type { CreateBlogPostDTO } from "../lib/createBlogPost";
import type { UpdateBlogPostDTO } from "../lib/updateBlogPost";

export default function useMaintainBlogPost(slug?: string) {
  const router = useRouter();
  const navigate = useNavigate();
  const canGoBack = useCanGoBack();

  const create = useMutation({
    mutationFn: async (data: CreateBlogPostDTO) => {
      await createBlogPost(data);

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
      await updateBlogPost(dto);

      return dto.slug;
    },
    onSuccess: (slug) => {
      toast.success("Post atualizado com sucesso!");

      if (canGoBack) {
        router.history.back();
        return;
      }

      navigate({ to: `/${slug}` });
    },
    onError: (error) => {
      toast.error(`Erro ao atualizar o post: ${error}`);
    },
  });

  return slug ? update : create;
}
