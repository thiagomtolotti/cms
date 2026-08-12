from uuid import UUID

from src.core.exceptions import EntityNotFoundError
from src.modules.finances.domain.transaction import Transaction, TransactionType
from src.modules.finances.domain.transaction_repository import TransactionRepository
from src.modules.finances.presentation.types import (
    GetSankeyResponseDTO,
    SankeyLinkDTO,
    SankeyNodeDTO,
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
        transactions = self.repo.list_()

        transaction_nodes: list[SankeyNodeDTO] = [
            SankeyNodeDTO(id=str(t.id), label=t.description) for t in transactions
        ]

        unique_categories = {t.category for t in transactions if t.category}
        category_totals: dict[str, int] = {
            category: sum(t.amount for t in transactions if t.category == category)
            for category in unique_categories
        }

        category_nodes: list[SankeyNodeDTO] = [
            SankeyNodeDTO(id=category, label=category) for category in unique_categories
        ]

        income_node = SankeyNodeDTO(id="income", label="Entradas")

        income_transactions_to_node = [
            SankeyLinkDTO(source=str(t.id), target="income", value=(t.amount // 100))
            for t in transactions
            if t.type == TransactionType.INCOME
        ]

        income_to_transaction_links: list[SankeyLinkDTO] = [
            SankeyLinkDTO(source="income", target=str(t.id), value=(t.amount // 100))
            for t in transactions
            if t.type == TransactionType.EXPENSE and t.category is None
        ]
        income_to_category_links: list[SankeyLinkDTO] = [
            SankeyLinkDTO(source="income", target=category, value=total // 100)
            for category, total in category_totals.items()
        ]
        income_links: list[SankeyLinkDTO] = (
            income_to_transaction_links + income_to_category_links
        )

        category_to_transaction_links: list[SankeyLinkDTO] = [
            SankeyLinkDTO(source=t.category, target=str(t.id), value=(t.amount // 100))
            for t in transactions
            if t.type == TransactionType.EXPENSE and t.category is not None
        ]

        res = GetSankeyResponseDTO(
            nodes=transaction_nodes + category_nodes + [income_node],
            links=income_transactions_to_node
            + income_links
            + category_to_transaction_links,
        )

        return res
