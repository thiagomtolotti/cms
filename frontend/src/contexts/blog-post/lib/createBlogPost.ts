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
  const body = {
    title: data.title,
    slug: data.slug,
    author: data.author,
    date: data.date,
  };

  return await client.POST("/api/posts", {
    body: {
      data: JSON.stringify(body),
      image: data.coverImage,
      markdown: data.markdown,
    },
  });
}
