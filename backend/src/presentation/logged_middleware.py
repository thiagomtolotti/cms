from typing import Awaitable, Callable

from fastapi import HTTPException, Request

from src.domain.auth_repository import AuthRepository
from src.domain.token import Token


def logged_middleware(
    auth_repo: AuthRepository,
) -> Callable[[Request], Awaitable[Token]]:
    async def _logged_middleware(request: Request):
        token = request.headers.get("Authorization")

        if not token:
            raise HTTPException(status_code=401, detail="Missing authorization token")

        token_obj = Token.from_string(token)
        valid = await auth_repo.is_valid_token(token_obj)

        if not valid:
            raise HTTPException(status_code=401, detail="Invalid authorization token")

        return token_obj

    return _logged_middleware
