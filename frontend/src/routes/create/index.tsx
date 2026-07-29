import { createFileRoute } from "@tanstack/react-router";
import MaintainPostForm from "../../contexts/blog-post/components/maintain-post-form";

import useProtectedRoute from "@/contexts/auth/hooks/useProtectedRoute";

export const Route = createFileRoute("/create/")({
  head: () => ({
    meta: [{ title: "Criar Post" }],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { isPending } = useProtectedRoute();

  if (isPending) {
    return "Carregando...";
  }

  return <CreatePostPage />;
}

function CreatePostPage() {
  return (
    <section className="flex flex-col gap-8 max-w-4xl mx-auto my-16">
      <h1 className="w-full mb-8">Crie um novo post</h1>

      <MaintainPostForm />
    </section>
  );
}
