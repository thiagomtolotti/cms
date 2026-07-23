import { useQuery } from "@tanstack/react-query";

export default function useValidateSlug(slug: string) {
  return useQuery({
    queryKey: ["validate-slug", slug],
    queryFn: async () => {
      const response = await fetch(`/api/posts/validate-slug/${slug}`);

      return response.ok;
    },
    enabled: slug.length > 0,
    select: (isValid) => typeof isValid === "boolean" && isValid,
  });
}
