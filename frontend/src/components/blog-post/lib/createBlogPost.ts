import MultiPartFormDataSerializer from "@/lib/MultiPartFormDataSerializer";
import type { components } from "@/types/api";
import client from "@/types/client";

export type CreateBlogPostDTO =
  components["schemas"]["MaintainPostRequestDTO"] & {
    coverImage: File;
    markdown: File;
  };

export default async function createBlogPost(data: CreateBlogPostDTO) {
  const bodyData: components["schemas"]["MaintainPostRequestDTO"] = {
    title: data.title,
    slug: data.slug,
    author: data.author,
    date: data.date,
    status: data.status,
  };

  return await client.POST("/api/posts/", {
    body: {
      data: JSON.stringify(bodyData),
      image: data.coverImage as any, // eslint-disable-line @typescript-eslint/no-explicit-any
      markdown: data.markdown as any, // eslint-disable-line @typescript-eslint/no-explicit-any
    },
    bodySerializer: MultiPartFormDataSerializer,
  });
}
