import { createFileRoute, useLoaderData } from "@tanstack/react-router";

import fetchPost from "@/components/blog-post/lib/fetchPost";
import type { Post } from "@/components/blog-post/types/post";

import MaintainPostForm from "@/components/blog-post/components/maintain-post-form";
import ProtectedRoute from "@/components/auth/components/protected-route";

export const Route = createFileRoute("/$slug/editar")({
  component: RouteComponent,
  staleTime: 0,
  loader: async ({ params }): Promise<Post> =>
    fetchPost(params.slug, { markdown: true }),
  pendingComponent: () => <p>Loading...</p>,
  errorComponent: () => <p>Houve um erro ao carregar o post</p>,
});

function RouteComponent() {
  const post: Post = useLoaderData({ from: Route.id });

  return (
    <ProtectedRoute>
      <section className="flex flex-col gap-4 max-w-3xl mx-auto mt-0 my-4 px-6">
        <h1 className="w-full text-xs uppercase font-semibold text-muted-foreground">
          Editar post
        </h1>

        <MaintainPostForm post={post} />
      </section>
    </ProtectedRoute>
  );
}
