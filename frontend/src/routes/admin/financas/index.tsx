import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import ProtectedRoute from "@/components/auth/components/protected-route";

import TransactionList from "@/components/finances/components/transaction_list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import MaintainTransactionForm from "@/components/finances/components/maintain_transaction_form";
import SankeyCustomNodeExample from "@/components/finances/components/transaction_chart";

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

        <SankeyCustomNodeExample />

        <AddTransaction />

        <TransactionList />
      </main>
    </ProtectedRoute>
  );
}

function AddTransaction() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="ml-auto col-span-1 mt-12">
      <Dialog onOpenChange={setIsOpen} open={isOpen}>
        <DialogTrigger>
          <Button>
            <Plus />
            Criar Transação
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Transação</DialogTitle>

            <MaintainTransactionForm onSuccess={() => setIsOpen(false)} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
