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
import { useState } from "react";

export const Route = createFileRoute("/admin/financas/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ProtectedRoute>
      <main className="grid gap-8 mx-auto">
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
