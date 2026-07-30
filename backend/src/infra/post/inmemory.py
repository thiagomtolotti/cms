from datetime import datetime
from pathlib import Path
from uuid import uuid4

from src.domain.post import Post, PostStatus
from src.domain.post_repository import PostRepository
from src.exceptions import EntityNotFoundError


class InMemoryPostRepository(PostRepository):
    def __init__(self):
        self.posts: list[Post] = [
            Post(
                id=uuid4(),
                title="This is a test markdown file",
                author="Thiago Tolotti",
                date=datetime(year=2026, month=7, day=21, hour=11, minute=14, second=0),
                file=Path("test.md"),
                image=Path("image.jpg"),
                slug="test",
                status=PostStatus.PUBLISHED,
            )
        ]

    def get_from_slug(self, slug: str) -> Post:
        for post in self.posts:
            if post.slug == slug:
                return post

        raise EntityNotFoundError("Post not found")

    def create(self, post: Post) -> None:
        self.posts.append(post)

    def update(self, post: Post) -> None:
        for i, existing_post in enumerate(self.posts):
            if existing_post.slug == post.slug:
                self.posts[i] = post
                return

        raise EntityNotFoundError("Post not found")

    def exists(self, slug: str) -> bool:
        for post in self.posts:
            if post.slug == slug:
                return True

        return False
