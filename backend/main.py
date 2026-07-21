from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def ping():
    return {"message": "CMS service is alive!"}


@app.get("/{post_slug}")
def get_post(post_slug: str):
    print(f"Received request for post: {post_slug}")

    return {"message": f"Request received for post: {post_slug}"}
