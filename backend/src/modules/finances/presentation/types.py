from datetime import datetime
from typing import Self

from pydantic import BaseModel

from src.modules.finances.domain.transaction import Transaction, TransactionType


class MaintainTransactionRequestDTO(BaseModel):
    description: str
    amount: int
    date: datetime
    type: TransactionType
    category: str | None

    @classmethod
    def to_domain(cls, dto: Self) -> Transaction:
        return Transaction(
            description=dto.description,
            amount=dto.amount,
            date=dto.date,
            type=dto.type,
            category=dto.category,
        )


class ListTransactionsResponseDTO(BaseModel):
    transactions: list[Transaction]

    @classmethod
    def from_domain(cls, transactions: list[Transaction]) -> Self:
        return cls(transactions=transactions)


class SankeyNodeDTO(BaseModel):
    id: str
    label: str


class SankeyLinkDTO(BaseModel):
    source: str
    target: str
    value: int


class GetSankeyResponseDTO(BaseModel):
    nodes: list[SankeyNodeDTO]
    links: list[SankeyLinkDTO]
