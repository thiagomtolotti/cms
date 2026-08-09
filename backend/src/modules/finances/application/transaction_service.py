from uuid import UUID

from src.modules.finances.domain.transaction import Transaction


class TransactionService:
    def __init__(self):
        self.transactions: list[Transaction] = []

    def list_transactions(self):
        return self.transactions

    def create_transaction(self, transaction: Transaction):
        self.transactions.append(transaction)

        return transaction

    def update_transaction(
        self,
        transaction_id: UUID,
        updated_transaction: Transaction,
    ):
        for index, transaction in enumerate(self.transactions):
            if transaction.id == transaction_id:
                self.transactions[index] = updated_transaction

                return updated_transaction

        raise ValueError(f"Transaction with ID {transaction_id} not found.")

    def delete_transaction(self, transaction_id: UUID):
        for index, transaction in enumerate(self.transactions):
            if transaction.id == transaction_id:
                del self.transactions[index]

                return

        raise ValueError(f"Transaction with ID {transaction_id} not found.")
