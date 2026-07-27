export interface CreateBlogPostDTO {
  title: string;
  slug: string;
  author: string;
  date: string;
  coverImage: File;
  markdown: File;
}

export default async function createBlogPost(data: CreateBlogPostDTO) {
  const formData = new FormData();

  const dataWithoutFiles = {
    title: data.title,
    slug: data.slug,
    author: data.author,
    date: data.date,
  };
  formData.append("data", JSON.stringify(dataWithoutFiles));
  formData.append("image", data.coverImage);
  formData.append("markdown", data.markdown);

  return await fetch("/api/posts", {
    method: "POST",
    body: formData,
  });
}
