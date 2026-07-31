from typing import Annotated

from fastapi import APIRouter, Depends, File, Form, UploadFile
from fastapi.responses import FileResponse, HTMLResponse, JSONResponse
from pydantic import Json

from src.application.post import PostService
from src.domain.auth_repository import AuthRepository
from src.presentation.types import (
    FileDTO,
    ListPostsResponseDTO,
    MaintainPostRequestDTO,
    PostMetadataResponseDTO,
)

from .logged_middleware import logged_middleware


class PostRouter(APIRouter):
    def __init__(
        self,
        service: PostService,
        auth_repo: AuthRepository,
    ):
        self.service = service

        super().__init__(prefix="/posts")

        self.add_api_route(
            "/{post_slug}",
            self.get_post,
            response_class=HTMLResponse,
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

    def get_post(self, post_slug: str):
        html = self.service.get_post_content(post_slug)

        return html

    def get_post_metadata(self, post_slug: str):
        post = self.service.get_post(post_slug)

        return PostMetadataResponseDTO.from_domain(post)

    def get_post_image(self, post_slug: str):
        path = self.service.get_post_image_path(post_slug)

        return FileResponse(
            path=path,
            media_type="image/jpeg",
            filename=path.name,
        )

    def create_post(
        self,
        data: Annotated[Json[MaintainPostRequestDTO], Form()],
        image: Annotated[UploadFile, File()],
        markdown: Annotated[UploadFile, File()],
    ):
        self.service.create_post(
            data,
            FileDTO.from_upload_file(
                image,
                required_mime_types=["image/"],
            ),
            FileDTO.from_upload_file(
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
            FileDTO.from_upload_file(
                image,
                required_mime_types=["image/"],
            )
            if image
            else None,
            FileDTO.from_upload_file(
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
