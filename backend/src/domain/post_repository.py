from abc import ABC, abstractmethod

from src.domain.post import Post


class PostRepository(ABC):
    @abstractmethod
    def get_from_slug(self, slug: str) -> Post: ...
