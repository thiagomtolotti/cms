from enum import Enum

from pydantic import BaseModel


class TransactionType(Enum):
    INCOME = "income"
    EXPENSE = "expense"


class MaintainTransactionRequestDTO(BaseModel):
    description: str
    amount: int
    date: str
    type: TransactionType
