from .application.post import PostService
from .domain.file_repository import FileRepository
from .domain.post_repository import PostRepository
from .infra.file.disk import DiskFileRepository
from .infra.post.sqlite import SQLitePostRepository
from .presentation.post import PostRouter

repo: PostRepository = SQLitePostRepository()
file_repo: FileRepository = DiskFileRepository()

post_service = PostService(repo, file_repo)
post_router = PostRouter(post_service)
