import { useState } from "react";
import type { components } from "@/types/api";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import MaintainTransactionForm from "./maintain_transaction_form";
import type { DialogTriggerProps } from "@base-ui/react";

interface MaintainTransactionProps {
  transaction?: components["schemas"]["Transaction"];
  render: DialogTriggerProps["render"];
}

export default function MaintainTransaction({
  render,
  transaction,
}: MaintainTransactionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const title = transaction ? "Editar Transação" : "Criar Transação";

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger render={render} />

      <DialogContent className="max-sm:w-screen max-sm:h-screen max-sm:max-w-none! max-sm:rounded-none">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>

          <MaintainTransactionForm
            onSuccess={() => setIsOpen(false)}
            transaction={transaction}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
