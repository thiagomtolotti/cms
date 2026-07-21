from typing import Self

from pydantic import BaseModel

from src.domain.post import Post


class PostMetadataResponseDTO(BaseModel):
    title: str
    author: str
    date: str

    @classmethod
    def from_domain(cls, post: Post) -> Self:
        return cls(
            title=post.title,
            author=post.author,
            date=post.date.isoformat(),
        )
