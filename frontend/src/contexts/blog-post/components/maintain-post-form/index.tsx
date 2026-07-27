import { useRef } from "react";
import useMaintainBlogPost from "../../hooks/useMaintainBlogPost";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import MarkdownEditor from "../markdown-editor";
import type { MarkdownEditorHandle } from "../markdown-editor";

import SlugInput from "./slug-input";
import ImageInput from "./image-input";

import type { Post } from "../../types/post";

interface MaintainPostFormProps {
  post?: Post;
}

export default function MaintainPostForm({ post }: MaintainPostFormProps) {
  const editorRef = useRef<MarkdownEditorHandle>(null);

  const { mutateAsync, isPending } = useMaintainBlogPost(post?.slug);
  const isEditing = !!post;
  const buttonText = isEditing ? "Atualizar Post" : "Criar Post";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const markdown = editorRef.current?.getMarkdown() || "";
    const formData = new FormData(e.currentTarget);
    const markdownFile = new File([markdown], "post.md", {
      type: "text/markdown",
    });

    let coverImage = formData.get("coverImage") as File | null;
    coverImage = coverImage && coverImage.size > 0 ? coverImage : null;

    await mutateAsync({
      title: formData.get("title") as string,
      slug: (formData.get("slug") as string) ?? post?.slug,
      author: formData.get("author") as string,
      date: formData.get("date") as string,
      coverImage: coverImage as File,
      markdown: markdownFile,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10">
      <ImageInput defaultValue={post?.imageUrl} />

      <div className="flex flex-col gap-2">
        <Input
          type="text"
          placeholder="Título do post"
          className="w-full text-3xl! border-none outline-none my-8"
          name="title"
          defaultValue={post?.title}
          required
        />

        <div className="flex gap-6 my-4">
          <FieldInput
            type="date"
            name="date"
            placeholder="Data de publicação"
            defaultValue={post?.date.toISOString().split("T")[0]}
            required
          />
          <FieldInput
            type="text"
            name="author"
            placeholder="Autor"
            title="Autor"
            defaultValue={post?.author}
            required
          />

          <SlugInput defaultValue={post?.slug} />
        </div>
      </div>

      <MarkdownEditor ref={editorRef} defaultValue={post?.content} />

      <div className="mt-8 ml-auto">
        <Button type="submit" isLoading={isPending}>
          {buttonText}
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
