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
import { Badge } from "@/components/ui/badge";
import DeleteTransaction from "./delete_transaction";
import MaintainTransaction from "./maintain_transaction";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

export default function TransactionList() {
  const { data } = useListTransactions();

  return (
    <div className="rounded-xl border border-dashed border-border p-2 xl:p-6 text-sm text-muted-foreground w-full">
      <Table className="text-xs xl:text-sm xl:[&_td]:px-0">
        <TableCaption>Lista de transações</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Descrição</TableHead>
            <TableHead className="max-md:hidden">Valor</TableHead>
            <TableHead className="max-md:hidden">Data</TableHead>
            <TableHead className="max-md:hidden">Tipo</TableHead>
            <TableHead className="max-md:hidden">Categoria</TableHead>
            <TableHead className="w-0">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((transaction) => (
            <TransactionList.Item
              key={transaction.id}
              transaction={transaction}
            />
          ))}

          {data?.length === 0 && (
            <TableRow className="hover:bg-transparent">
              <TableCell
                colSpan={5}
                className="text-center text-muted-foreground py-12"
              >
                Nenhuma transação encontrada.
              </TableCell>
            </TableRow>
          )}

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
      <TableCell>
        <p className="text-wrap">{transaction.description}</p>
      </TableCell>
      <TableCell className="max-md:hidden">
        {transaction.amount.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </TableCell>
      <TableCell className="max-md:hidden">
        {new Date(transaction.date).toLocaleDateString("pt-BR")}
      </TableCell>
      <TableCell className="max-md:hidden">
        <TransactionTypeBadge type={transaction.type} />
      </TableCell>
      <TableCell className="max-md:hidden">{transaction.category}</TableCell>
      <TableCell className="flex gap-2 items-center">
        <MaintainTransaction
          transaction={transaction}
          render={
            <Button variant="secondary" size="icon">
              <Edit />
            </Button>
          }
        />
        <DeleteTransaction id={transaction.id!} />
      </TableCell>
    </TableRow>
  );
};

interface TransactionTypeBadgeProps {
  type: components["schemas"]["Transaction"]["type"];
}

function TransactionTypeBadge({ type }: TransactionTypeBadgeProps) {
  const props: Record<
    components["schemas"]["Transaction"]["type"],
    React.HTMLProps<unknown>["className"]
  > = {
    expense: "bg-red-100 text-red-700 border-red-300",
    income: "bg-green-100 text-green-800 border-green-300",
  };

  return (
    <Badge className={props[type]}>{humanReadableTransactionType[type]}</Badge>
  );
}

const humanReadableTransactionType: Record<
  components["schemas"]["Transaction"]["type"],
  string
> = {
  expense: "Despesa",
  income: "Receita",
};
