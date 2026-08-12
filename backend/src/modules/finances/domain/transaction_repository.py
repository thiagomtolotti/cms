from abc import ABC, abstractmethod
from uuid import UUID

from ..domain.transaction import Transaction


class TransactionRepository(ABC):
    @abstractmethod
    def list_(self) -> list[Transaction]: ...

    @abstractmethod
    def create(self, transaction: Transaction) -> None: ...

    @abstractmethod
    def update(self, transaction: Transaction) -> None: ...

    @abstractmethod
    def delete(self, id: UUID) -> None: ...

    @abstractmethod
    def exists(self, id: UUID) -> bool: ...
