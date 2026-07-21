import os
from typing import Any


from fastapi import FastAPI, APIRouter
from fastapi.responses import HTMLResponse, JSONResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware

from .infra.db.migrate import migrate_sqlite

from .presentation.post import post_router

from .exceptions import EntityNotFoundError

migrate_sqlite()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_router = APIRouter(prefix="/api")
api_router.include_router(post_router)


@api_router.get("/")
def ping():
    return {"message": "CMS service is alive!"}


app.include_router(api_router)


# --- ERROR HANDLERS ---
def not_found_error_handler(_: Any, exc: Exception):
    return HTMLResponse(
        content="<h1>404 Not Found</h1>",
        status_code=404,
    )


@app.get("/{catchall:path}")
def serve_spa(catchall: str):
    if catchall.startswith("api/"):
        return JSONResponse({"detail": "Not Found"}, status_code=404)

    # Check if the requested file exists natively in the frontend folder (e.g., favicon.ico)
    file_path = os.path.join("data/frontend", catchall)
    if os.path.exists(file_path) and os.path.isfile(file_path):
        return FileResponse(file_path)

    # Otherwise, return index.html so TanStack Router can handle the page route on the client side
    return FileResponse("data/frontend/index.html")


app.add_exception_handler(
    EntityNotFoundError,
    not_found_error_handler,
)
app.add_exception_handler(
    FileNotFoundError,
    not_found_error_handler,
)


def start():
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)


if __name__ == "__main__":
    start()
