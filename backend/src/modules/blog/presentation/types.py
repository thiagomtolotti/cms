from datetime import datetime
from typing import Self

from fastapi import UploadFile
from pydantic import BaseModel

from src.core.exceptions import InvalidObjectError
from src.modules.blog.domain.post import Post, PostStatus


class PostMetadataResponseDTO(BaseModel):
    title: str
    author: str
    date: str
    slug: str
    status: PostStatus

    @classmethod
    def from_domain(cls, post: Post) -> Self:
        return cls(
            title=post.title,
            author=post.author,
            slug=post.slug,
            date=post.date.isoformat(),
            status=post.status,
        )


class MaintainPostRequestDTO(BaseModel):
    title: str
    author: str
    date: datetime
    slug: str
    status: PostStatus


class FileDTO(BaseModel):
    filename: str
    content: bytes

    @classmethod
    def from_upload_file(
        cls,
        file: UploadFile,
        *,
        required_mime_types: list[str] | None = None,
    ) -> Self:
        if not file.filename or not file.content_type:
            raise InvalidObjectError(
                "File must have a filename and content type.",
            )

        if required_mime_types:
            for mime_type in required_mime_types:
                if not file.content_type.startswith(mime_type):
                    raise InvalidObjectError(
                        f"Invalid file extension. Allowed extensions: {', '.join(required_mime_types)}",
                    )

        return cls(
            filename=file.filename,
            content=file.file.read(),
        )


class ListPostsResponseDTO(BaseModel):
    posts: list[PostMetadataResponseDTO]

    @classmethod
    def from_domain(cls, posts: list[Post]) -> Self:
        return cls(
            posts=[PostMetadataResponseDTO.from_domain(post) for post in posts],
        )
