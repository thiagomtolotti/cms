import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function PostList() {
  return (
    <Table>
      <TableCaption>Lista de Posts.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-25">Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <PostList.TableRow></PostList.TableRow>
        <TableRow></TableRow>
      </TableBody>
    </Table>
  );
}

PostList.TableRow = () => {
  return (
    <TableRow>
      <TableCell>Post 1</TableCell>
      <TableCell>Draft</TableCell>
      <TableCell className="text-right">
        <button className="text-blue-500 hover:underline">Edit</button>
      </TableCell>
    </TableRow>
  );
};
