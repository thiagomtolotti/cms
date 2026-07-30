from pathlib import Path
from uuid import uuid4

import markdown

from src.domain.file_repository import FileRepository
from src.domain.post import Post, PostStatus
from src.domain.post_repository import PostRepository
from src.exceptions import EntityAlreadyExistsError, InvalidStatusError
from src.presentation.types import FileDTO, MaintainPostRequestDTO


class PostService:
    def __init__(
        self,
        repo: PostRepository,
        file_repo: FileRepository,
    ) -> None:
        self.repo = repo
        self.file_repo = file_repo

    def get_post_content(self, post_slug: str) -> str:
        post = self.repo.get_from_slug(post_slug)

        content = self.file_repo.get_from_path(Path(post.file))
        content_str = content.decode("utf-8")

        html = markdown.markdown(content_str)

        return html

    def get_post(self, post_slug: str) -> Post:
        post = self.repo.get_from_slug(post_slug)

        return post

    def get_post_image_path(self, post_slug: str) -> Path:
        post = self.get_post(post_slug)
        path = self.file_repo.get_complete_path(post.image)

        return path

    def validate_slug(self, post_slug: str) -> None:
        exists = self.repo.exists(post_slug)

        if exists:
            raise EntityAlreadyExistsError(
                f"Post with slug '{post_slug}' already exists."
            )

    def create_post(
        self,
        dto: MaintainPostRequestDTO,
        image: FileDTO,
        markdown: FileDTO,
    ) -> None:
        if dto.status == PostStatus.DELETED:
            raise InvalidStatusError("Cannot create a post with status 'deleted'.")

        if self.repo.exists(dto.slug):
            raise EntityAlreadyExistsError(
                f"Post with slug '{dto.slug}' already exists."
            )

        id = uuid4()

        image_path = Path(str(id), image.filename)
        markdown_path = Path(str(id), markdown.filename)

        self.file_repo.save(image_path, image.content)
        self.file_repo.save(markdown_path, markdown.content)

        post = Post(
            id=id,
            author=dto.author,
            title=dto.title,
            slug=dto.slug,
            date=dto.date,
            image=image_path,
            file=markdown_path,
            status=dto.status,
        )

        self.repo.create(post)

    def update_post(
        self,
        dto: MaintainPostRequestDTO,
        image: FileDTO | None,
        markdown: FileDTO,
    ) -> None:
        if dto.status == PostStatus.DELETED:
            raise InvalidStatusError("Cannot create a post with status 'deleted'.")

        post = self.repo.get_from_slug(dto.slug)

        image_path = post.image

        if image:
            image_path = Path(str(post.id), image.filename)
            self.file_repo.save(image_path, image.content)

        markdown_path = Path(str(post.id), markdown.filename)

        self.file_repo.save(markdown_path, markdown.content)

        post = Post(
            id=post.id,
            author=dto.author,
            title=dto.title,
            slug=dto.slug,
            date=dto.date,
            status=dto.status,
            image=image_path,
            file=markdown_path,
        )

        print("updating post with data:", post.status)
        self.repo.update(post)

    def list_posts(self) -> list[Post]:
        posts = self.repo.list_()

        return posts
