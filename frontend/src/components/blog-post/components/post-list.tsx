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
import type { components } from "@/types/api";
import { Link } from "@tanstack/react-router";

export default function PostList() {
  const { data } = useListPosts();

  return (
    <Table>
      <TableCaption>Lista de Posts.</TableCaption>
      <TableHeader>
        <TableRow className="[&>th]:font-bold">
          <TableHead className="w-full">Título</TableHead>
          <TableHead>Título</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.posts.map((post) => (
          <PostList.TableRow key={post.title} post={post} />
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
  return (
    <TableRow>
      <TableCell>{post.title}</TableCell>
      <TableCell>{post.slug}</TableCell>
      <TableCell>{post.status}</TableCell>
      <TableCell className="text-right">
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
