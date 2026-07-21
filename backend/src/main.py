from typing import Any

import markdown

from pathlib import Path
from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware

from src.domain.file_repository import FileRepository

from src.exceptions import EntityNotFoundError

from src.infra.file.disk import DiskFileRepository
from src.infra.post.inmemory import InMemoryPostRepository

from src.domain.post_repository import PostRepository

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def ping():
    return {"message": "CMS service is alive!"}


repo: PostRepository = InMemoryPostRepository()
file_repo: FileRepository = DiskFileRepository()


@app.get("/{post_slug}", response_class=HTMLResponse)
def get_post(post_slug: str):
    post = repo.get_from_slug(post_slug)

    content = file_repo.get_from_path(Path(post.file))
    content = content.decode("utf-8")

    html = markdown.markdown(content)

    return html


def not_found_error_handler(_: Any, exc: Exception):
    return HTMLResponse(
        content="<h1>404 Not Found</h1>",
        status_code=404,
    )


app.add_exception_handler(
    EntityNotFoundError,
    not_found_error_handler,
)
app.add_exception_handler(
    FileNotFoundError,
    not_found_error_handler,
)
