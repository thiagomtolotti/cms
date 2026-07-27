import client from "@/types/client";
import type { CreateBlogPostDTO } from "./createBlogPost";

export interface UpdateBlogPostDTO extends Omit<
  CreateBlogPostDTO,
  "coverImage"
> {
  coverImage: File | null;
}

export default async function updateBlogPost(data: UpdateBlogPostDTO) {
  const dataWithoutFiles = {
    title: data.title,
    slug: data.slug,
    author: data.author,
    date: data.date,
  };

  console.log("Updating blog post with data:", dataWithoutFiles);
  console.log("Cover image:", data.coverImage);
  console.log("Markdown file:", data.markdown.text());

  return client.PUT("/api/posts", {
    body: {
      data: JSON.stringify(dataWithoutFiles),
      image: data.coverImage as string | null,
      markdown: data.markdown,
    },
  });
}
