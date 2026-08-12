import { useQuery } from "@tanstack/react-query";

import fetchSankeyData from "../lib/fetchSankeyData";
import transformSankeyData from "../lib/transformSankeyData";

export default function useSankeyData() {
  return useQuery({
    queryKey: ["sankey"],
    queryFn: async () => await fetchSankeyData(),
    select: (data) => transformSankeyData(data),
  });
}
