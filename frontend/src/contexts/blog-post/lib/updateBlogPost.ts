import type { CreateBlogPostDTO } from "./createBlogPost";

export interface UpdateBlogPostDTO extends Omit<
  CreateBlogPostDTO,
  "coverImage"
> {
  coverImage: File | null;
}

export default function updateBlogPost(data: UpdateBlogPostDTO) {
  const formData = new FormData();

  const dataWithoutFiles = {
    title: data.title,
    slug: data.slug,
    author: data.author,
    date: data.date,
  };
  formData.append("data", JSON.stringify(dataWithoutFiles));

  if (data.coverImage) {
    formData.append("image", data.coverImage);
  }

  formData.append("markdown", data.markdown);

  return fetch(`/api/posts`, {
    method: "PUT",
    body: formData,
  });
}
