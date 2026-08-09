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

export const Route = createFileRoute("/financas/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ProtectedRoute>
      <main className="grid grid-cols-12 gap-4 max-w-5xl mx-auto">
        <AddTransaction />

        <TransactionList />
      </main>
    </ProtectedRoute>
  );
}

function AddTransaction() {
  return (
    <div className="col-span-1 col-start-12 mt-12">
      <Dialog>
        <DialogTrigger>
          <Button>
            <Plus />
            Criar Transação
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Transação</DialogTitle>

            <MaintainTransactionForm />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
