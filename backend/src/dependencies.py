from .infra.file.disk import DiskFileRepository
from .infra.post.inmemory import InMemoryPostRepository

from .domain.file_repository import FileRepository
from .domain.post_repository import PostRepository

repo: PostRepository = InMemoryPostRepository()
file_repo: FileRepository = DiskFileRepository()
