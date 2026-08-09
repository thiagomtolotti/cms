import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import useMaintainTransaction from "../hooks/useMaintainTransaction";
import type { components } from "@/types/api";

export default function MaintainTransactionForm() {
  const { mutateAsync } = useMaintainTransaction();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const description = formData.get("description") as string;
    const amount = parseFloat(formData.get("amount") as string);
    const date = new Date(formData.get("date") as string);
    const transactionType = formData.get(
      "transactionType",
    ) as components["schemas"]["Transaction"]["type"];

    await mutateAsync({
      description,
      amount,
      date: date.toISOString(),
      type: transactionType,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="my-4 mt-8 grid grid-cols-2 gap-6">
      <Input
        name="description"
        placeholder="Descrição"
        className="col-span-2"
        required
      />
      <Input name="amount" placeholder="Valor" required />
      <Input name="date" type="date" placeholder="Data" required />
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
