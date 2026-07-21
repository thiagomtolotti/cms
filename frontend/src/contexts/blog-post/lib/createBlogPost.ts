export interface CreateBlogPostDTO {
  title: string;
  slug: string;
  author: string;
  date: string;
  coverImage: File;
  markdown: File;
}

export default async function createBlogPost(data: CreateBlogPostDTO) {
  console.log(data);

  //   return await fetch("http://localhost:8000/posts", {
  //     method: "POST",
  //     body: JSON.stringify(data),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
}
