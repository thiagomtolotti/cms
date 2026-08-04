import client from "@/types/client";
import type { CreateBlogPostDTO } from "./createBlogPost";
import MultiPartFormDataSerializer from "@/lib/MultiPartFormDataSerializer";
import type { components } from "@/types/api";

export interface UpdateBlogPostDTO extends Omit<
  CreateBlogPostDTO,
  "coverImage"
> {
  coverImage?: File | null;
}

export default async function updateBlogPost(data: UpdateBlogPostDTO) {
  const bodyData: components["schemas"]["MaintainPostRequestDTO"] = {
    title: data.title,
    slug: data.slug,
    author: data.author,
    date: data.date,
    status: data.status,
  };

  return await client.PUT("/api/posts/", {
    body: {
      data: JSON.stringify(bodyData),
      image: data.coverImage as any, // eslint-disable-line @typescript-eslint/no-explicit-any
      markdown: data.markdown as any, // eslint-disable-line @typescript-eslint/no-explicit-any
    },
    bodySerializer: MultiPartFormDataSerializer,
  });
}
