from src.core.auth.auth_repository import AuthRepository
from src.core.file.file_repository import FileRepository

# ---
from src.modules.blog.application.post_service import PostService
from src.modules.blog.domain.post_repository import PostRepository
from src.modules.blog.infra.sqlite import SQLitePostRepository
from src.modules.blog.presentation.router import PostRouter

# ---
from src.modules.finances.domain.transaction_repository import TransactionRepository
from src.modules.finances.infra.sqlite import SQLiteTransactionRepository
from src.modules.finances.presentation.router import FinancesRouter, TransactionService

from .auth.keycloak import KeycloakAuthRepository
from .file.disk import DiskFileRepository

# ---
from .settings import settings

auth_repo: AuthRepository = KeycloakAuthRepository(
    base_url=settings.keycloak_base_url,
    client_id=settings.keycloak_client_id,
    realm_name=settings.keycloak_realm,
)

post_repo: PostRepository = SQLitePostRepository()
file_repo: FileRepository = DiskFileRepository()

post_service = PostService(post_repo, file_repo)
post_router = PostRouter(post_service, auth_repo)

transaction_repo: TransactionRepository = SQLiteTransactionRepository()
transaction_service = TransactionService(transaction_repo)
finances_router = FinancesRouter(transaction_service)
