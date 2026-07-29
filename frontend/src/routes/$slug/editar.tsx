import { createFileRoute, useLoaderData } from "@tanstack/react-router";

import fetchPost from "@/components/blog-post/lib/fetchPost";
import type { Post } from "@/components/blog-post/types/post";

import MaintainPostForm from "@/components/blog-post/components/maintain-post-form";
import ProtectedRoute from "@/components/auth/components/protected-route";

export const Route = createFileRoute("/$slug/editar")({
  component: RouteComponent,
  loader: async ({ params }): Promise<Post> => fetchPost(params.slug),
});

function RouteComponent() {
  const post: Post = useLoaderData({ from: Route.id });

  return (
    <ProtectedRoute>
      <section className="flex flex-col gap-8 max-w-4xl mx-auto my-16">
        <h1 className="w-full mb-8">Editar post</h1>

        <MaintainPostForm post={post} />
      </section>
    </ProtectedRoute>
  );
}
