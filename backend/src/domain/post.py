from datetime import datetime
from pathlib import Path
from uuid import UUID
from pydantic import BaseModel


class Post(BaseModel):
    id: UUID
    slug: str
    title: str
    author: str
    date: datetime
    image: Path
    file: Path
