import os
from typing import Any

from fastapi import APIRouter, FastAPI
from fastapi.responses import FileResponse, HTMLResponse, JSONResponse

from .core.constants import DATA_PATH
from .core.db.migrate import migrate_sqlite
from .core.dependencies import post_router
from .core.exceptions import DomainError

migrate_sqlite()

app = FastAPI(redirect_slashes=False)

api_router = APIRouter(prefix="/api")
api_router.include_router(post_router)


@api_router.get("/")
def ping():
    return {"message": "CMS service is alive!"}


app.include_router(api_router)


@app.get("/{catchall:path}")
def serve_spa(catchall: str):
    if catchall.startswith("api/"):
        return JSONResponse({"detail": "Not Found"}, status_code=404)

    FRONTEND_DIR = DATA_PATH / "frontend"

    if not os.path.exists(FRONTEND_DIR):
        return JSONResponse({"detail": "Not Found"}, status_code=404)

    # Check if the requested file exists natively in the frontend folder (e.g., favicon.ico)
    file_path = os.path.join(FRONTEND_DIR, catchall)

    if os.path.exists(file_path) and os.path.isfile(file_path):
        return FileResponse(file_path)

    # Otherwise, return index.html so TanStack Router can handle the page route on the client side
    return FileResponse("data/frontend/index.html")


# --- ERROR HANDLERS ---
def not_found_error_handler(_: Any, exc: Exception):
    return HTMLResponse(
        content="<h1>404 Not Found</h1>",
        status_code=404,
    )


def domain_error_handler(_: Any, exc: Exception):
    if isinstance(exc, DomainError):
        return JSONResponse(
            status_code=exc.status_code,
            content={"message": str(exc)},
        )

    return JSONResponse(
        status_code=400,
        content={"message": str(exc)},
    )


def authentication_error_handler(_: Any, exc: Exception):
    return JSONResponse(
        status_code=401,
        content={"message": str(exc)},
    )


app.add_exception_handler(
    FileNotFoundError,
    not_found_error_handler,
)
app.add_exception_handler(
    NotImplementedError,
    not_found_error_handler,
)
app.add_exception_handler(
    DomainError,
    domain_error_handler,
)


def start():
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)


if __name__ == "__main__":
    start()
