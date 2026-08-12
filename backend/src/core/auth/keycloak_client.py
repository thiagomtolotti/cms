import httpx
from pydantic import BaseModel

from src.core.exceptions import IdentityProviderException


class KeycloakLoginResponse(BaseModel):
    access_token: str
    refresh_token: str
    expires_in: int  # seconds
    refresh_expires_in: int  # seconds
    id_token: str
    token_type: str
    scope: str


class KeycloakAPIClient:
    def __init__(self, base_url: str, realm_name: str, client_id: str):
        self.get_client = httpx.AsyncClient

        self.url = f"{base_url}/realms/{realm_name}"

        self.client_id = client_id

    async def get_jwks_certificates(self):
        endpoint = f"{self.url}/protocol/openid-connect/certs"

        try:
            async with self.get_client() as client:
                response = await client.get(endpoint)
                response.raise_for_status()
        except httpx.HTTPStatusError as exc:
            raise IdentityProviderException(
                f"Error connecting to Keycloak: {exc}",
            )
        except httpx.RequestError as exc:
            raise IdentityProviderException(
                f"Error connecting to Keycloak: {exc}",
            )

        return response.json()
