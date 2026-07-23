import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import { toast } from "sonner";

import type { CreateBlogPostDTO } from "../lib/createBlogPost";
import createBlogPost from "../lib/createBlogPost";

export default function useCreateBlogPost() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: CreateBlogPostDTO) => {
      createBlogPost(data);

      return data.slug;
    },
    onSuccess: (slug) => {
      toast.success("Post criado com sucesso!");
      navigate({ to: `/${slug}` });
    },
  });
}
