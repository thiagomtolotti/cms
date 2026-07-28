import client from "@/types/client";
import type { CreateBlogPostDTO } from "./createBlogPost";
import MultiPartFormDataSerializer from "@/lib/MultiPartFormDataSerializer";

export interface UpdateBlogPostDTO extends Omit<
  CreateBlogPostDTO,
  "coverImage"
> {
  coverImage?: File | null;
}

export default async function updateBlogPost(data: UpdateBlogPostDTO) {
  const bodyData = {
    title: data.title,
    slug: data.slug,
    author: data.author,
    date: data.date,
  };

  return await client.PUT("/api/posts", {
    body: {
      data: JSON.stringify(bodyData),
      image: data.coverImage as any,
      markdown: data.markdown as any,
    },
    bodySerializer: MultiPartFormDataSerializer,
  });
}
