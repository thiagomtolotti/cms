from dataclasses import dataclass
from typing import Self

from src.exceptions import InvalidTokenError


@dataclass(frozen=True)
class Token:
    value: str
    type: str = "Bearer"

    @classmethod
    def from_string(cls, token: str) -> Self:
        try:
            type, value = token.split(" ")
        except ValueError:
            raise InvalidTokenError("Invalid token format")

        if type.lower() != "bearer":
            raise InvalidTokenError("Invalid token type")

        return cls(value=value, type=type)
