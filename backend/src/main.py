from typing import Any

import markdown

from pathlib import Path
from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware

from src.exceptions import EntityNotFoundError
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


ROOT_PATH = Path(__file__).parent.parent
DATA_PATH = ROOT_PATH / "data"

repo: PostRepository = InMemoryPostRepository()


@app.get("/{post_slug}", response_class=HTMLResponse)
def get_post(post_slug: str):
    post = repo.get_from_slug(post_slug)

    file_path = DATA_PATH / post.file

    with open(file_path, "r") as file:
        content = file.read()

    html = markdown.markdown(content)

    return html


def entity_not_found_error_handler(_: Any, exc: Exception):
    return HTMLResponse(
        content="<h1>404 Not Found</h1>",
        status_code=404,
    )


app.add_exception_handler(
    EntityNotFoundError,
    entity_not_found_error_handler,
)
