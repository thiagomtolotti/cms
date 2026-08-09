from typing import Awaitable, Callable

from fastapi import HTTPException, Request

from src.core.auth.auth_repository import AuthRepository
from src.core.auth.token import Token


def logged_middleware(
    auth_repo: AuthRepository, should_fail: bool = True
) -> Callable[[Request], Awaitable[bool]]:
    async def _middleware(request: Request):
        try:
            token = request.headers.get("Authorization")

            if not token:
                raise ValueError("Authorization token is missing")

            token_obj = Token.from_string(token)
            valid = await auth_repo.is_valid_token(token_obj)

            if not valid:
                raise ValueError("Invalid token")

            return bool(token_obj)
        except Exception as e:
            if should_fail:
                raise HTTPException(status_code=401, detail=str(e))

            return False

    return _middleware
