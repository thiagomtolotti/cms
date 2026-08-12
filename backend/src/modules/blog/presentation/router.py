from typing import Annotated

from fastapi import APIRouter, Depends, File, Form, Request, UploadFile
from fastapi.responses import FileResponse, HTMLResponse, JSONResponse
from pydantic import Json

from src.core.auth.auth_repository import AuthRepository
from src.core.middleware.logged_middleware import logged_middleware
from src.modules.blog.application.post_service import PostService
from src.modules.blog.presentation.types import (
    FileDTO,
    ListPostsResponseDTO,
    MaintainPostRequestDTO,
    PostMetadataResponseDTO,
)


class PostRouter(APIRouter):
    def __init__(
        self,
        service: PostService,
        auth_repo: AuthRepository,
    ):
        self.service = service
        self.auth_repo = auth_repo

        super().__init__(prefix="/posts")

        self.add_api_route(
            "/{post_slug}",
            self.get_post,
            response_class=HTMLResponse,
            methods=["GET"],
        )

        self.add_api_route(
            "/{post_slug}/markdown",
            self.get_post_markdown,
            response_class=FileResponse,
            methods=["GET"],
        )

        self.add_api_route(
            "/{post_slug}/metadata",
            self.get_post_metadata,
            response_class=JSONResponse,
            response_model=PostMetadataResponseDTO,
            methods=["GET"],
        )

        self.add_api_route(
            "/{post_slug}/image",
            self.get_post_image,
            response_class=FileResponse,
            methods=["GET"],
        )

        self.add_api_route(
            "/",
            self._list,
            response_class=JSONResponse,
            response_model=ListPostsResponseDTO,
            methods=["GET"],
            dependencies=[Depends(logged_middleware(auth_repo))],
        )

        self.add_api_route(
            "/validate-slug/{slug}",
            self.validate_slug,
            response_class=JSONResponse,
            methods=["GET"],
            dependencies=[Depends(logged_middleware(auth_repo))],
        )

        self.add_api_route(
            "/",
            self.create_post,
            response_class=JSONResponse,
            methods=["POST"],
            dependencies=[Depends(logged_middleware(auth_repo))],
        )

        self.add_api_route(
            "/",
            self.update_post,
            response_class=JSONResponse,
            methods=["PUT"],
            dependencies=[Depends(logged_middleware(auth_repo))],
        )

        self.add_api_route(
            "/{post_slug}",
            self._delete,
            response_class=JSONResponse,
            methods=["DELETE"],
            dependencies=[Depends(logged_middleware(auth_repo))],
        )

    async def _check_logged(self, request: Request) -> bool:
        middleware_fn = logged_middleware(self.auth_repo, should_fail=False)

        return await middleware_fn(request)

    async def get_post(self, post_slug: str, request: Request):
        is_logged = await self._check_logged(request)

        html = self.service.get_post_content(
            post_slug,
            published_only=not is_logged,
        )

        return html

    async def get_post_markdown(self, post_slug: str, request: Request):
        is_logged = await self._check_logged(request)

        markdown = self.service.get_post_markdown_path(
            post_slug,
            published_only=not is_logged,
        )

        return FileResponse(
            path=markdown,
            media_type="text/markdown",
            filename=f"{post_slug}.md",
        )

    async def get_post_metadata(
        self, post_slug: str, request: Request
    ) -> PostMetadataResponseDTO:
        is_logged = await self._check_logged(request)

        post = self.service.get_post(
            post_slug,
            published_only=not is_logged,
        )

        return PostMetadataResponseDTO.from_domain(post)

    async def get_post_image(self, post_slug: str):
        path = self.service.get_post_image_path(post_slug, published_only=False)

        if not path:
            return JSONResponse(
                status_code=404,
                content={"message": "Post image not found."},
            )

        return FileResponse(
            path=path,
            media_type="image/jpeg",
            filename=path.name,
        )

    def create_post(
        self,
        data: Annotated[Json[MaintainPostRequestDTO], Form()],
        markdown: Annotated[UploadFile, File()],
        image: Annotated[UploadFile | None, File()] = None,
    ):
        self.service.create_post(
            data,
            image=FileDTO.from_upload_file(
                image,
                required_mime_types=["image/"],
            )
            if image
            else None,
            markdown=FileDTO.from_upload_file(
                markdown,
                required_mime_types=["text/markdown"],
            ),
        )

        return {"message": "Post created successfully"}

    def update_post(
        self,
        data: Annotated[Json[MaintainPostRequestDTO], Form()],
        markdown: Annotated[UploadFile, File()],
        image: Annotated[UploadFile | None, File()] = None,
    ):
        self.service.update_post(
            data,
            image=FileDTO.from_upload_file(
                image,
                required_mime_types=["image/"],
            )
            if image
            else None,
            markdown=FileDTO.from_upload_file(
                markdown,
                required_mime_types=["text/markdown"],
            ),
        )

        return {"message": "Post updated successfully"}

    def validate_slug(self, slug: str):
        self.service.validate_slug(slug)

        return {"message": "Slug is available."}

    def _list(self):
        posts = self.service.list_posts()

        return ListPostsResponseDTO.from_domain(posts)

    def _delete(self, post_slug: str):
        self.service.delete_post(post_slug)

        return {"message": "Post deleted successfully"}
