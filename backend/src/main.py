from typing import Any


from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware


from .presentation.post import post_router

from .exceptions import EntityNotFoundError


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


app.include_router(post_router)


# --- ERROR HANDLERS ---
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
