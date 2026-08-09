from datetime import datetime
from typing import Self

from pydantic import BaseModel

from src.modules.finances.domain.transaction import Transaction, TransactionType


class MaintainTransactionRequestDTO(BaseModel):
    description: str
    amount: int
    date: datetime
    type: TransactionType

    @classmethod
    def to_domain(cls, dto: Self) -> Transaction:
        return Transaction(
            description=dto.description,
            amount=dto.amount,
            date=dto.date,
            type=dto.type,
        )
