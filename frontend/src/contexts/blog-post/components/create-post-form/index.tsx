import { useRef } from "react";
import useCreateBlogPost from "../../hooks/useCreateBlogPost";

import { Button } from "../../../../components/ui/button";

import MarkdownEditor, { type MarkdownEditorHandle } from "../markdown-editor";
import SlugInput from "./slug-input";
import ImageInput from "./image-input";

export default function CreatePostForm() {
  const editorRef = useRef<MarkdownEditorHandle>(null);

  const { mutateAsync, isPending } = useCreateBlogPost();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const markdown = editorRef.current?.getMarkdown() || "";
    const formData = new FormData(e.currentTarget);
    const markdownFile = new File([markdown], "post.md", {
      type: "text/markdown",
    });

    await mutateAsync({
      title: formData.get("title") as string,
      slug: formData.get("slug") as string,
      author: formData.get("author") as string,
      date: formData.get("date") as string,
      coverImage: formData.get("coverImage") as File,
      markdown: markdownFile,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10">
      <ImageInput />

      <div className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Título do post"
          className="p-4 w-full text-3xl border-none outline-none"
          name="title"
          required
        />

        <div className="flex gap-6">
          <input
            type="date"
            placeholder="Data de publicação"
            name="date"
            required
          />
          <input type="text" placeholder="Autor" name="author" required />
          <SlugInput />
        </div>
      </div>

      <MarkdownEditor ref={editorRef} />

      <div className="mt-8 ml-auto">
        <Button type="submit" isLoading={isPending}>
          Criar Post
        </Button>
      </div>
    </form>
  );
}
