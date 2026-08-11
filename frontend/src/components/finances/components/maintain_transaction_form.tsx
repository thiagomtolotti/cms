import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import useMaintainTransaction from "../hooks/useMaintainTransaction";
import type { components } from "@/types/api";
import { useState } from "react";

interface MaintainTransactionFormProps {
  transaction?: components["schemas"]["Transaction"];
  onSuccess?: (transaction: components["schemas"]["Transaction"]) => void;
}

export default function MaintainTransactionForm({
  transaction,
  onSuccess,
}: MaintainTransactionFormProps) {
  const { mutateAsync } = useMaintainTransaction(transaction?.id);

  const buttonLabel = transaction ? "Atualizar" : "Criar";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const description = formData.get("description") as string;
    const amount = parseFloat(
      (formData.get("amount") as string).replace(/,/g, "."),
    );
    const date = new Date(formData.get("date") as string);
    const type = formData.get(
      "transactionType",
    ) as components["schemas"]["Transaction"]["type"];
    const category = formData.get("category") as string | null;

    const transaction: components["schemas"]["Transaction"] = {
      description,
      amount,
      date: date.toISOString(),
      type,
      category,
    };

    await mutateAsync(transaction);

    if (onSuccess) {
      onSuccess(transaction);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-2 gap-6">
      <Input
        name="description"
        placeholder="Descrição"
        className="col-span-2"
        defaultValue={transaction?.description}
        required
      />
      <MonetaryInput
        name="amount"
        placeholder="Valor"
        defaultValue={transaction?.amount}
        required
      />
      <Input
        name="date"
        type="date"
        placeholder="Data"
        defaultValue={
          transaction?.date?.split("T")[0] ??
          new Date().toISOString().split("T")[0]
        }
        required
      />

      <Input
        name="category"
        placeholder="Categoria"
        defaultValue={transaction?.category ?? undefined}
      />

      <TransactionTypeSelect defaultValue={transaction?.type} />

      <div className="col-span-2 ml-auto mt-4">
        <Button type="submit">{buttonLabel}</Button>
      </div>
    </form>
  );
}

interface TransactionTypeSelectProps {
  defaultValue?: components["schemas"]["Transaction"]["type"];
}

function TransactionTypeSelect({ defaultValue }: TransactionTypeSelectProps) {
  return (
    <RadioGroup
      className="flex gap-8"
      defaultValue={defaultValue || "income"}
      name="transactionType"
      required
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

function MonetaryInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const [value, setValue] = useState(props.defaultValue || "");
  const [integer, ...decimals] = value
    .toString()
    .replace(".", ",")
    .replace(/[^\d,]/g, "")
    .split(",");
  const maskedValue =
    decimals.length > 0 ? `${integer},${decimals.join("")}` : integer;

  return (
    <span className="flex gap-2 items-center">
      <p className=" text-muted-foreground font-semibold tracking-wider">R$</p>
      <Input
        value={maskedValue}
        onChange={(e) => {
          setValue(e.target.value);
          props.onChange?.(e);
        }}
        {...props}
      />
    </span>
  );
}
