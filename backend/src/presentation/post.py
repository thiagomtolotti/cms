import markdown
from pathlib import Path

from fastapi import APIRouter
from fastapi.responses import HTMLResponse

from src.dependencies import repo, file_repo

post_router = APIRouter(prefix="/posts")


@post_router.get("/{post_slug}", response_class=HTMLResponse)
def get_post(post_slug: str):
    post = repo.get_from_slug(post_slug)

    content = file_repo.get_from_path(Path(post.file))
    content = content.decode("utf-8")

    html = markdown.markdown(content)

    return html
