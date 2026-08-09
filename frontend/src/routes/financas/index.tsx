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
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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

function MaintainTransactionForm() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit} className="my-4 mt-8 grid grid-cols-2 gap-6">
      <Input
        name="description"
        placeholder="Descrição"
        className="col-span-2"
      />
      <Input name="amount" placeholder="Valor" />
      <Input name="date" type="date" placeholder="Data" />
      <TransactionTypeSelect />

      <div className="col-span-2 ml-auto mt-4">
        <Button type="submit">Criar</Button>
      </div>
    </form>
  );
}

function TransactionTypeSelect() {
  return (
    <RadioGroup
      className="flex gap-8 col-start-2"
      defaultValue="income"
      name="transactionType"
    >
      <div className="flex items-center gap-2">
        <RadioGroupItem value="income" id="income" />
        <label htmlFor="income">Receita</label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="expense" id="expense" />
        <label htmlFor="expense">Saída</label>
      </div>
    </RadioGroup>
  );
}
