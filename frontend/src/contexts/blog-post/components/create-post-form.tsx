import { useEffect, useRef, useState } from "react";
import useCreateBlogPost from "../hooks/useCreateBlogPost";

import MarkdownEditor, { type MarkdownEditorHandle } from "./markdown-editor";

export default function CreatePostForm() {
  const editorRef = useRef<MarkdownEditorHandle>(null);

  const { mutateAsync } = useCreateBlogPost();

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

          <input type="text" placeholder="slug" name="slug" required />
        </div>
      </div>

      <MarkdownEditor ref={editorRef} />

      <div className="mt-8 ml-auto">
        <button type="submit">Criar Post</button>
      </div>
    </form>
  );
}

function ImageInput() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    setPreviewUrl((current) => {
      if (current) URL.revokeObjectURL(current);
      return file ? URL.createObjectURL(file) : null;
    });
  }

  return (
    <>
      <label
        htmlFor="cover-image"
        className="cursor-pointer text-lg font-semibold"
      >
        Imagem de capa
      </label>
      <input
        type="file"
        placeholder="Imagem de capa"
        id="cover-image"
        name="coverImage"
        accept="image/*"
        onChange={handleImageChange}
        required
      />

      {previewUrl && (
        <img
          src={previewUrl}
          alt="Pré-visualização da imagem de capa"
          className="max-h-64 w-auto rounded-md object-cover"
        />
      )}
    </>
  );
}
