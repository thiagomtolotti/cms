export type TransactionType = "income" | "expense";

export interface Transaction {
  description: string;
  amount: number;
  date: Date;
  transactionType: TransactionType;
}
