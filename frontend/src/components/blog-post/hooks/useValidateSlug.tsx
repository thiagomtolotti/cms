import client from "@/types/client";
import { useQuery } from "@tanstack/react-query";

export default function useValidateSlug(slug: string, enabled: boolean = true) {
  return useQuery({
    queryKey: ["validate-slug", slug],
    queryFn: async () => {
      try {
        await client.GET("/api/posts/validate-slug/{slug}", {
          params: { path: { slug } },
        });

        return true;
      } catch (error) {
        return false;
      }
    },
    enabled: slug.length > 0 && enabled,
  });
}
