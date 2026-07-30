import { useQuery } from "@tanstack/react-query";
import listPosts from "../lib/listPosts";

export default function useListPosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => listPosts(),
  });
}
