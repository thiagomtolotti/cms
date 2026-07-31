from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict

from src.constants import ROOT_PATH


class Settings(BaseSettings):
    keycloak_base_url: str = Field(validation_alias="VITE_KEYCLOAK_BASE_URL")
    keycloak_realm: str = Field(validation_alias="VITE_KEYCLOAK_REALM")
    keycloak_client_id: str = Field(validation_alias="VITE_KEYCLOAK_CLIENT_ID")

    model_config = SettingsConfigDict(
        env_file=ROOT_PATH.parent / ".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()  # type: ignore
