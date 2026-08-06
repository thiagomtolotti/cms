from datetime import datetime
from enum import Enum
from pathlib import Path
from uuid import UUID, uuid4

from pydantic import BaseModel, Field


class PostStatus(Enum):
    DRAFT = "draft"
    PUBLISHED = "published"


class Post(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    slug: str
    title: str
    author: str
    date: datetime
    image: Path
    file: Path
    status: PostStatus
