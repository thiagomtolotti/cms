import { useMutation } from "@tanstack/react-query";

import type { CreateBlogPostDTO } from "../lib/createBlogPost";
import createBlogPost from "../lib/createBlogPost";

export default function useCreateBlogPost() {
  return useMutation({
    mutationFn: async (data: CreateBlogPostDTO) => createBlogPost(data),
  });
}
