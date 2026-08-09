import { createFileRoute } from "@tanstack/react-router";
import MaintainPostForm from "../../components/blog-post/components/maintain-post-form";

import ProtectedRoute from "@/components/auth/components/protected-route";

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
    <section className="flex flex-col gap-4 max-w-3xl mx-auto mb-4 px-6">
      <h1 className="w-full text-xs uppercase font-semibold text-muted-foreground">
        Criar post
      </h1>

      <MaintainPostForm />
    </section>
  );
}
