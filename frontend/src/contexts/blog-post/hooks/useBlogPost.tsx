import { useQuery } from "@tanstack/react-query";

import fetchBlogPost from "../lib/fetchBlogPost";

export default function useBlogPost(slug: string) {
  return useQuery({
    queryKey: ["blogPost", slug],
    queryFn: async () => {
      const response = await fetchBlogPost(slug);

      return response.text();
    },
  });
}
