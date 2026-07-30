from abc import ABC, abstractmethod

from src.domain.token import Token


class AuthRepository(ABC):
    @abstractmethod
    async def is_valid_token(self, token: Token) -> bool:
        pass
