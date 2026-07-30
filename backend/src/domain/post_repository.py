from abc import ABC, abstractmethod

from src.domain.post import Post


class PostRepository(ABC):
    @abstractmethod
    def get_from_slug(self, slug: str) -> Post: ...

    @abstractmethod
    def create(self, post: Post) -> None: ...

    @abstractmethod
    def update(self, post: Post) -> None: ...

    @abstractmethod
    def exists(self, slug: str) -> bool: ...

    @abstractmethod
    def list_(self) -> list[Post]: ...
