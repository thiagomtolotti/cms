import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useListPosts from "../hooks/useListPosts";

import { Link, useNavigate } from "@tanstack/react-router";

import type { components } from "@/types/api";
import humanReadableStatus from "@/types/humanReadableStatus";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function PostList() {
  const { data } = useListPosts();

  return (
    <Table>
      <TableCaption>Lista de Posts.</TableCaption>
      <TableHeader>
        <TableRow className="[&>th]:font-bold">
          <TableHead>Título</TableHead>
          <TableHead>Slug</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.posts.map((post) => (
          <PostList.TableRow key={post.slug} post={post} />
        ))}

        <TableRow></TableRow>
      </TableBody>
    </Table>
  );
}

interface PostListTableRowProps {
  post: components["schemas"]["PostMetadataResponseDTO"];
}

PostList.TableRow = ({ post }: PostListTableRowProps) => {
  const navigate = useNavigate();

  return (
    <TableRow
      className="cursor-pointer"
      onClick={() => navigate({ to: `/${post.slug}` })}
    >
      <TableCell>{post.title}</TableCell>
      <TableCell>{post.slug}</TableCell>
      <TableCell>
        <PostStatusBadge status={post.status} />
      </TableCell>
      <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
        <Link
          to={`/${post.slug}/editar`}
          className="text-blue-500 hover:underline"
        >
          Editar
        </Link>
      </TableCell>
    </TableRow>
  );
};

interface PostStatusBadgeProps {
  status: components["schemas"]["PostStatus"];
}

function PostStatusBadge({ status }: PostStatusBadgeProps) {
  const props: Record<
    components["schemas"]["PostStatus"],
    React.HTMLProps<unknown>["className"]
  > = {
    draft: "bg-yellow-100 text-yellow-700 border-yellow-300",
    published: "bg-green-100 text-green-800 border-green-300",
    deleted: "bg-red-100 text-red-800 border-red-300",
  };

  return (
    <Badge className={cn(props[status], "border border-solid")}>
      {humanReadableStatus[status]}
    </Badge>
  );
}
