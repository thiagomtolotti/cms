import type { components } from "@/types/api";

import useListPosts from "../hooks/useListPosts";
import { Link, useNavigate } from "@tanstack/react-router";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import PostStatusBadge from "./post-status-badge";

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
