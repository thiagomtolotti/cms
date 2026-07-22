import { createFileRoute } from "@tanstack/react-router";
import CreatePostForm from "../../contexts/blog-post/components/create-post-form";

export const Route = createFileRoute("/create/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <CreatePostPage />;
}

function CreatePostPage() {
  return (
    <section className="flex flex-col gap-8 max-w-4xl mx-auto my-16">
      <h1 className="w-full mb-8">Crie um novo post</h1>

      <CreatePostForm />
    </section>
  );
}
