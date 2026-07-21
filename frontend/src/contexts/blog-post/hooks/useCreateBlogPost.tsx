import createBlogPost from "../lib/createBlogPost";

export default function useCreateBlogPost() {
  async function create(data: FormData) {
    const title = data.get("title") as string;
    const slug = data.get("slug") as string;
    const author = data.get("author") as string;
    const date = data.get("date") as string;
    const coverImage = data.get("coverImage") as File;
    const markdown = data.get("markdown") as File;

    createBlogPost({
      title,
      slug,
      author,
      date,
      coverImage,
      markdown,
    });
  }

  return {
    create,
  };
}
