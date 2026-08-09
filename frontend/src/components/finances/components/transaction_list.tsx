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
      <TableCell>
        <button className="text-blue-500 hover:underline">Editar</button>
        <button className="text-red-500 hover:underline ml-2">Excluir</button>
      </TableCell>
    </TableRow>
  );
};
