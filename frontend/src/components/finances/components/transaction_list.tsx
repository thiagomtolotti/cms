import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useListTransactions from "../hooks/useListTransactions";
import type { components } from "@/types/api";
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
import useDeleteTransaction from "../hooks/useDeleteTransaction";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MaintainTransactionForm from "./maintain_transaction_form";

export default function TransactionList() {
  const { data } = useListTransactions();

  return (
    <div className="col-span-full">
      <Table>
        <TableCaption></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Descrição</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((transaction) => (
            <TransactionList.Item
              key={transaction.id}
              transaction={transaction}
            />
          ))}

          <TableRow />
        </TableBody>
      </Table>
    </div>
  );
}

TransactionList.Item = ({
  transaction,
}: {
  transaction: components["schemas"]["Transaction"];
}) => {
  return (
    <TableRow>
      <TableCell>{transaction.description}</TableCell>
      <TableCell>{transaction.amount}</TableCell>
      <TableCell>
        {new Date(transaction.date).toLocaleDateString("pt-BR")}
      </TableCell>
      <TableCell>{transaction.type}</TableCell>
      <TableCell className="flex gap-2">
        <EditTransaction transaction={transaction} />
        <DeleteTransaction id={transaction.id!} />
      </TableCell>
    </TableRow>
  );
};

interface EditTransactionProps {
  transaction: components["schemas"]["Transaction"];
}

function EditTransaction({ transaction }: EditTransactionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger>
        <Button variant="secondary" size="icon">
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Transação</DialogTitle>

          <MaintainTransactionForm
            transaction={transaction}
            onSuccess={() => setIsOpen(false)}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

interface DeleteTransactionProps {
  id: string;
}

function DeleteTransaction({ id }: DeleteTransactionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync } = useDeleteTransaction();

  async function handleDelete() {
    await mutateAsync(id);

    setIsOpen(false);
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger>
        <Button variant="destructive" size="icon">
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir transação</AlertDialogTitle>
          <AlertDialogDescription>
            Você tem certeza que deseja excluir esta transação? Esta ação não
            pode ser desfeita.
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
