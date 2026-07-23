import { useRef } from "react";
import useCreateBlogPost from "../../hooks/useCreateBlogPost";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import MarkdownEditor from "../markdown-editor";
import type { MarkdownEditorHandle } from "../markdown-editor";

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
        <Input
          type="text"
          placeholder="Título do post"
          className="w-full text-3xl! border-none outline-none my-8"
          name="title"
          required
        />

        <div className="flex gap-6 my-4">
          <FieldInput
            type="date"
            name="date"
            placeholder="Data de publicação"
            required
          />
          <FieldInput
            type="text"
            name="author"
            placeholder="Autor"
            title="Autor"
            required
          />

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

interface FieldInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  name: string;
  title?: string;
}

function FieldInput({ ...props }: FieldInputProps) {
  const componentId = props.id || props.name;

  return (
    <Field data-disabled={props.disabled}>
      <FieldLabel htmlFor={componentId}>
        {props.title || props.placeholder || "Título"}
      </FieldLabel>
      <Input id={componentId} {...props} />
    </Field>
  );
}
