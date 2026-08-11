import math
from uuid import UUID

from src.core.exceptions import EntityNotFoundError
from src.modules.finances.domain.transaction import Transaction, TransactionType
from src.modules.finances.domain.transaction_repository import TransactionRepository
from src.modules.finances.presentation.types import (
    GetSankeyResponseDTO,
    SankeyNodeDTO,
    SankeyNodeTargetDTO,
)


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

    def get_sankey_data(self) -> GetSankeyResponseDTO:
        # Entradas devem apontar para salário
        transactions = self.repo.list_()
        income_transactions = [
            t for t in transactions if t.type == TransactionType.INCOME
        ]
        expense_transactions = [
            t for t in transactions if t.type == TransactionType.EXPENSE
        ]

        res = GetSankeyResponseDTO(
            nodes=[
                SankeyNodeDTO(
                    id=str(t.id),
                    label=t.description,
                    targets=[
                        SankeyNodeTargetDTO(
                            id="entradas", value=math.floor(t.amount / 100)
                        ),
                    ],
                )
                for t in income_transactions
            ]
            + [
                SankeyNodeDTO(
                    id="entradas",
                    label="Entradas",
                    targets=[
                        SankeyNodeTargetDTO(
                            id=str(t.id),
                            value=math.floor(t.amount / 100),
                        )
                        for t in expense_transactions
                    ],
                ),
            ]
            + [
                SankeyNodeDTO(
                    id=str(t.id),
                    label=t.description,
                    targets=[],
                )
                for t in expense_transactions
            ]
        )

        return res
