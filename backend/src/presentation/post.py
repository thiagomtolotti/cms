import markdown
from pathlib import Path

from fastapi import APIRouter
from fastapi.responses import HTMLResponse, JSONResponse, FileResponse

from src.presentation.types import PostMetadataResponseDTO
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
