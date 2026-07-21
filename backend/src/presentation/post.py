from typing import Annotated

import markdown
from pathlib import Path

from fastapi import APIRouter, Form, UploadFile
from fastapi.responses import HTMLResponse, JSONResponse, FileResponse

from src.domain.post import Post
from src.presentation.types import (
    CreatePostRequestDTO,
    PostMetadataResponseDTO,
)
from src.dependencies import repo, file_repo

post_router = APIRouter(prefix="/posts")


@post_router.get(
    "/{post_slug}",
    response_class=HTMLResponse,
)
def get_post(post_slug: str):
    post = repo.get_from_slug(post_slug)

    content = file_repo.get_from_path(Path(post.file))
    content = content.decode("utf-8")

    html = markdown.markdown(content)

    return html


@post_router.get(
    "/{post_slug}/metadata",
    response_class=JSONResponse,
)
def get_post_metadata(post_slug: str):
    post = repo.get_from_slug(post_slug)

    return PostMetadataResponseDTO.from_domain(post)


@post_router.get(
    "/{post_slug}/image",
    response_class=FileResponse,
)
def get_post_image(post_slug: str):
    post = repo.get_from_slug(post_slug)

    path = file_repo.get_complete_path(post.image)

    return FileResponse(
        path=path,
        media_type="image/jpeg",
        filename=path.name,
    )


@post_router.post("/")
def create_post(
    data: Annotated[str, Form()],
    image: UploadFile,
    markdown: UploadFile,
):
    dto = CreatePostRequestDTO.model_validate_json(data)

    if (
        not image.filename
        or image.filename.lower().endswith((".jpg", ".jpeg", ".png")) is False
    ):
        return JSONResponse(
            status_code=400,
            content={"message": "Invalid image format. Only JPG and PNG are allowed."},
        )

    if not markdown.filename or not markdown.filename.lower().endswith(".md"):
        return JSONResponse(
            status_code=400,
            content={"message": "Invalid markdown format. Only .md files are allowed."},
        )

    image_path = Path(image.filename)
    markdown_path = Path(markdown.filename)

    file_repo.save(image_path, image.file.read())
    file_repo.save(markdown_path, markdown.file.read())

    post = Post(
        author=dto.author,
        title=dto.title,
        slug=dto.slug,
        date=dto.date,
        image=image_path,
        file=markdown_path,
    )

    repo.create(post)

    return {"message": "Post created successfully"}
