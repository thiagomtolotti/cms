from pydantic import BaseModel


class PingResponseDTO(BaseModel):
    message: str
    version: str
