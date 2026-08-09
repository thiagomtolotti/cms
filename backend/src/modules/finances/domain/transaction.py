from datetime import datetime
from enum import Enum
from uuid import UUID, uuid4

from pydantic import BaseModel, Field


class TransactionType(Enum):
    INCOME = "income"
    EXPENSE = "expense"


class Transaction(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    description: str
    amount: int
    date: datetime
    type: TransactionType
