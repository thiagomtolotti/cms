import { createFileRoute } from "@tanstack/react-router";

import ProtectedRoute from "@/components/auth/components/protected-route";

import TransactionList from "@/components/finances/components/transaction_list";
import SankeyChart from "@/components/finances/components/transaction_chart";
import MaintainTransaction from "@/components/finances/components/maintain_transaction";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/admin/financas/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ProtectedRoute>
      <main className="grid gap-8 mx-auto">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-muted-foreground">Workspace</p>
          <h2 className="text-3xl font-semibold tracking-tight">
            Gestão de Finanças Pessoais
          </h2>
        </div>

        <SankeyChart />

        <MaintainTransaction
          render={
            <Button className={"md:ml-auto"}>
              <Plus />
              Criar Transação
            </Button>
          }
        />

        <TransactionList />
      </main>
    </ProtectedRoute>
  );
}
