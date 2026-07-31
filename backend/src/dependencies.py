from .application.post import PostService
from .domain.auth_repository import AuthRepository
from .domain.file_repository import FileRepository
from .domain.post_repository import PostRepository
from .infra.auth.keycloak import KeycloakAuthRepository
from .infra.file.disk import DiskFileRepository
from .infra.post.sqlite import SQLitePostRepository
from .presentation.post import PostRouter
from .settings import settings

auth_repo: AuthRepository = KeycloakAuthRepository(
    base_url=settings.keycloak_base_url,
    client_id=settings.keycloak_client_id,
    realm_name=settings.keycloak_realm,
)

repo: PostRepository = SQLitePostRepository()
file_repo: FileRepository = DiskFileRepository()

post_service = PostService(repo, file_repo)
post_router = PostRouter(post_service, auth_repo)
