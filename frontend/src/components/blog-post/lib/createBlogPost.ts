import MultiPartFormDataSerializer from "@/lib/MultiPartFormDataSerializer";
import type { components } from "@/types/api";
import client from "@/types/client";

export interface CreateBlogPostDTO {
  title: string;
  slug: string;
  author: string;
  date: string;
  coverImage: File;
  markdown: File;
}

export default async function createBlogPost(data: CreateBlogPostDTO) {
  const bodyData: components["schemas"]["CreatePostRequestDTO"] = {
    title: data.title,
    slug: data.slug,
    author: data.author,
    date: data.date,
    status: "published",
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
