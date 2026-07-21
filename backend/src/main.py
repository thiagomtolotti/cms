import markdown

from pathlib import Path
from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware

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


@app.get("/{post_slug}", response_class=HTMLResponse)
def get_post(post_slug: str):
    file_path = DATA_PATH / f"{post_slug}.md"

    if not file_path.exists():
        return HTMLResponse(content="<h1>404 Not Found</h1>", status_code=404)

    with open(file_path, "r") as file:
        content = file.read()

    html = markdown.markdown(content)

    return html
