from datetime import datetime
from pathlib import Path
from uuid import UUID, uuid4
from pydantic import BaseModel, Field


class Post(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    slug: str
    title: str
    author: str
    date: datetime
    image: Path
    file: Path
