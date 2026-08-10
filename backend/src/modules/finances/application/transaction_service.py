from uuid import UUID

from src.core.exceptions import EntityNotFoundError
from src.modules.finances.domain.transaction import Transaction
from src.modules.finances.domain.transaction_repository import TransactionRepository


class TransactionService:
    def __init__(self, repo: TransactionRepository):
        self.repo = repo

    def list_(self):
        return self.repo.list_()

    def create(self, transaction: Transaction):
        self.repo.create(transaction)

    def update(self, transaction: Transaction):
        if not self.repo.exists(transaction.id):
            raise EntityNotFoundError("Transaction not found.")

        self.repo.update(transaction)

    def delete(self, id: UUID):
        if not self.repo.exists(id):
            raise EntityNotFoundError("Transaction not found.")

        self.repo.delete(id)
