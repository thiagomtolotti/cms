import ProtectedRoute from "@/components/auth/components/protected-route";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/financas/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ProtectedRoute>
      <main className="grid grid-cols-12 max-w-5xl mx-auto">
        <TransactionList />
      </main>
    </ProtectedRoute>
  );
}

function TransactionList() {
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
          <TableRow>
            <TableCell>Mercado</TableCell>
            <TableCell>R$ 100,00</TableCell>
            <TableCell>{new Date().toLocaleDateString("pt-BR")}</TableCell>
            <TableCell>Despesa</TableCell>
            <TableCell>
              <button className="text-blue-500 hover:underline">Editar</button>
              <button className="text-red-500 hover:underline ml-2">
                Excluir
              </button>
            </TableCell>
          </TableRow>

          <TableRow />
        </TableBody>
      </Table>
    </div>
  );
}
