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
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import useDeletePost from "../hooks/useDeletePost";
import { useState } from "react";

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
          <TableHead className="text-right w-0!">Ações</TableHead>
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
        <div className="flex gap-2 ml-auto! w-min">
          {post.status !== "deleted" && <EditPostAction slug={post.slug} />}
          {post.status !== "deleted" && <DeletePostAction slug={post.slug} />}
        </div>
      </TableCell>
    </TableRow>
  );
};

interface EditPostActionProps {
  slug: string;
}

function EditPostAction({ slug }: EditPostActionProps) {
  return (
    <Link to={`/${slug}/editar`}>
      <Button size="icon" variant="ghost">
        <Edit />
      </Button>
    </Link>
  );
}

interface DeletePostActionProps {
  slug: string;
}

function DeletePostAction({ slug }: DeletePostActionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync } = useDeletePost(slug);

  const handleDelete = async () => {
    await mutateAsync();
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => console.log(`Delete post with slug: ${slug}`)}
        >
          <Trash />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir Post</AlertDialogTitle>

          <AlertDialogDescription>
            Você tem certeza que deseja excluir este post? Esta ação não pode
            ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={handleDelete}>
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
