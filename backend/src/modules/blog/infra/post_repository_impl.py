from datetime import datetime
from pathlib import Path

from src.core.constants import DATA_PATH
from src.core.exceptions import EntityNotFoundError
from src.modules.blog.domain.post import Post, PostStatus
from src.modules.blog.domain.post_repository import PostRepository


def get_connection():
    import sqlite3

    DB_PATH = DATA_PATH / "database.db"

    conn = sqlite3.connect(DB_PATH)

    return conn


class SQLitePostRepository(PostRepository):
    def get_from_slug(self, slug: str, published_only: bool = True) -> Post:
        query = """
            SELECT id, title, slug, author, date, file_path, image_path, status
            FROM posts
            WHERE slug = :slug
            AND (:published_only = 0 OR status = 'published')
            LIMIT 1
        """

        with get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(query, {"slug": slug, "published_only": published_only})
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
                image=Path(row[6]) if row[6] else None,
                status=PostStatus(row[7]),
            )

            return post

    def create(self, post: Post) -> None:
        with get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(
                """
                INSERT INTO posts (id, title, slug, author, date, file_path, image_path, status)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    str(post.id),
                    post.title,
                    post.slug,
                    post.author,
                    post.date.isoformat(),
                    str(post.file),
                    str(post.image) if post.image else None,
                    post.status.value,
                ),
            )
            conn.commit()

    def exists(self, slug: str) -> bool:
        with get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(
                "SELECT 1 FROM posts WHERE slug = ? LIMIT 1",
                (slug,),
            )
            row = cursor.fetchone()

            return row is not None

    def update(self, post: Post) -> None:
        if not self.exists(post.slug):
            raise EntityNotFoundError("Post not found")

        with get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(
                """
                UPDATE posts
                SET title = ?, author = ?, date = ?, file_path = ?, image_path = ?, status = ?
                WHERE slug = ?
                """,
                (
                    post.title,
                    post.author,
                    post.date.isoformat(),
                    str(post.file),
                    str(post.image) if post.image else None,
                    post.status.value,
                    post.slug,
                ),
            )
            conn.commit()

    def list_(self) -> list[Post]:
        with get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM posts")
            rows = cursor.fetchall()

            posts = [
                Post(
                    id=row[0],
                    title=row[1],
                    slug=row[2],
                    author=row[3],
                    date=datetime.fromisoformat(row[4]),
                    file=Path(row[5]),
                    image=Path(row[6]) if row[6] else None,
                    status=PostStatus(row[7]),
                )
                for row in rows
            ]

            return posts

    def delete(self, slug: str) -> None:
        if not self.exists(slug):
            raise EntityNotFoundError("Post not found")

        with get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(
                "DELETE FROM posts WHERE slug = ?",
                (slug,),
            )
            conn.commit()
