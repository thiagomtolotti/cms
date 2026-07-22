import fetchMetadata from "../lib/fetchMetadata";
import { useQuery } from "@tanstack/react-query";

export default function usePostMetadata(slug: string) {
  return useQuery({
    queryKey: ["postMetadata", slug],
    queryFn: async () => await fetchMetadata(slug),
  });
}
