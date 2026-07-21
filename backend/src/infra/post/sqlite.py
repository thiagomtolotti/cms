from datetime import datetime
from pathlib import Path

from src.domain.post import Post
from src.exceptions import EntityNotFoundError
from src.domain.post_repository import PostRepository


def get_connection():
    import sqlite3

    from src.constants import DATA_PATH

    DB_PATH = DATA_PATH / "database.db"

    conn = sqlite3.connect(DB_PATH)

    return conn


class SQLitePostRepository(PostRepository):
    def get_from_slug(self, slug: str) -> Post:
        with get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(
                "SELECT * FROM posts WHERE slug = ? LIMIT 1",
                (slug,),
            )
            row = cursor.fetchone()

            if row is None:
                raise EntityNotFoundError("Post not found")

            post = Post(
                id=row[0],
                title=row[1],
                slug=row[2],
                author=row[3],
                date=datetime.fromisoformat(row[4]),
                file=Path(row[5]),
                image=Path(row[6]),
            )

            return post

    def create(self, post: Post) -> None:
        with get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(
                """
                INSERT INTO posts (id, title, slug, author, date, file_path, image_path)
                VALUES (?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    str(post.id),
                    post.title,
                    post.slug,
                    post.author,
                    post.date.isoformat(),
                    str(post.file),
                    str(post.image),
                ),
            )
            conn.commit()
