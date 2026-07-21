import markdown

from pathlib import Path
from fastapi import FastAPI
from fastapi.responses import HTMLResponse

app = FastAPI()


@app.get("/")
def ping():
    return {"message": "CMS service is alive!"}


@app.get("/{post_slug}", response_class=HTMLResponse)
def get_post(post_slug: str):
    file_path = Path(__file__).parent / "data" / f"{post_slug}.md"

    with open(file_path, "r") as file:
        content = file.read()

    html = markdown.markdown(content)

    return html
