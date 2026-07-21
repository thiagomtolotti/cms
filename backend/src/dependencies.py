from .infra.post.sqlite import SQLitePostRepository

from .infra.file.disk import DiskFileRepository

from .domain.file_repository import FileRepository
from .domain.post_repository import PostRepository

repo: PostRepository = SQLitePostRepository()
file_repo: FileRepository = DiskFileRepository()
