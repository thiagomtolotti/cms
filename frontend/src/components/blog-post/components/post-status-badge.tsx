import type { components } from "@/types/api";
import humanReadableStatus from "@/types/humanReadableStatus";
import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

interface PostStatusBadgeProps {
  status: components["schemas"]["PostStatus"];
}

export default function PostStatusBadge({ status }: PostStatusBadgeProps) {
  const props: Record<
    components["schemas"]["PostStatus"],
    React.HTMLProps<unknown>["className"]
  > = {
    draft: "bg-yellow-100 text-yellow-700 border-yellow-300",
    published: "bg-green-100 text-green-800 border-green-300",
  };

  return (
    <Badge className={cn(props[status], "border border-solid")}>
      {humanReadableStatus[status]}
    </Badge>
  );
}
