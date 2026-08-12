from typing import Any, cast

import jwt
from jwt import DecodeError, ExpiredSignatureError, InvalidTokenError

from cryptography.hazmat.primitives.asymmetric.rsa import RSAPublicKey

from src.core.auth.auth_repository import AuthRepository
from src.core.auth.token import Token
from src.core.exceptions import IdentityProviderException

from .keycloak_client import KeycloakAPIClient


class KeycloakAuthRepository(AuthRepository):
    def __init__(self, base_url: str, realm_name: str, client_id: str):
        self._cached_jwks: dict[str, Any] | None = None
        self.client = KeycloakAPIClient(base_url, realm_name, client_id)

    async def is_valid_token(
        self,
        token: Token,
    ) -> bool:
        payload = await self._get_token_payload(token.value)

        return bool(payload)

    async def _get_token_payload(self, token: str) -> dict[str, Any]:
        try:
            unverified_header = jwt.get_unverified_header(token)
            kid = unverified_header.get("kid")

            jwks = await self._get_jwks(kid=kid)
            key = next((k for k in jwks["keys"] if k["kid"] == kid), None)

            if not key:
                raise IdentityProviderException("Public key not found in JWKS")

            public_key = cast(
                RSAPublicKey,
                jwt.algorithms.RSAAlgorithm.from_jwk(key),  # type: ignore
            )
            payload = jwt.decode(
                token,
                public_key,
                algorithms=["RS256"],
                audience="account",
            )

            return payload

        except ExpiredSignatureError or DecodeError or InvalidTokenError:
            raise IdentityProviderException("Invalid token")
        except Exception as exc:
            raise IdentityProviderException(f"Error decoding token: {exc}")

    async def _get_jwks(self, kid: str | None = None) -> dict[str, Any]:
        if self._cached_jwks is not None:
            if kid is None:
                return self._cached_jwks
            elif any(k["kid"] == kid for k in self._cached_jwks.get("keys", [])):
                return self._cached_jwks

        print("Fetching JWKS certificates...")

        jwks = await self.client.get_jwks_certificates()
        self._cached_jwks = jwks

        return jwks
