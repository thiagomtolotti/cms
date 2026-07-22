import createBlogPost from "../lib/createBlogPost";

export default function useCreateBlogPost() {
  async function create(data: FormData, markdown: string) {
    const title = data.get("title") as string;
    const slug = data.get("slug") as string;
    const author = data.get("author") as string;
    const date = data.get("date") as string;
    const coverImage = data.get("coverImage") as File;
    const markdownFile = new File([markdown], "post.md", {
      type: "text/markdown",
    });

    createBlogPost({
      title,
      slug,
      author,
      date,
      coverImage,
      markdown: markdownFile,
    });
  }

  return {
    create,
  };
}
