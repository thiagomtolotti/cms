import { createFileRoute } from "@tanstack/react-router";
import MaintainPostForm from "../../contexts/blog-post/components/maintain-post-form";

import ProtectedRoute from "@/contexts/auth/components/protected-route";

export const Route = createFileRoute("/create/")({
  head: () => ({
    meta: [{ title: "Criar Post" }],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ProtectedRoute>
      <CreatePostPage />
    </ProtectedRoute>
  );
}

function CreatePostPage() {
  return (
    <section className="flex flex-col gap-8 max-w-4xl mx-auto my-16">
      <h1 className="w-full mb-8">Crie um novo post</h1>

      <MaintainPostForm />
    </section>
  );
}
