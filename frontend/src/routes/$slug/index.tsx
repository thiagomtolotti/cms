import type { Post } from "@/components/blog-post/types/post";

import fetchPost from "@/components/blog-post/lib/fetchPost";

import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { useKeycloak } from "@react-keycloak/web";
import PostStatusBadge from "@/components/blog-post/components/post-status-badge";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/$slug/")({
  component: RouteComponent,
  loader: async ({ params }): Promise<Post> => fetchPost(params.slug),
  head: ({ loaderData }) => {
    return {
      meta: [{ title: loaderData?.title }],
    };
  },
  pendingComponent: () => <p>Loading...</p>,
  errorComponent: () => <p>Houve um erro ao carregar o post</p>,
});

function RouteComponent() {
  const { keycloak } = useKeycloak();
  const post: Post = useLoaderData({ from: Route.id });

  return (
    <section className="flex flex-col gap-4 w-full max-w-3xl mb-16 max-lg:px-8 mx-auto">
      <div
        className={cn(
          "mb-8 max-h-100 max-lg:max-h-[40dvw] max-w-3xl w-full mx-auto",
          "rounded-2xl overflow-hidden shadow-md max-lg:rounded-lg",
          "flex items-center justify-center",
        )}
      >
        <img className="object-cover object-center" src={post.imageUrl} />
      </div>

      <div className="flex flex-col gap-4 mb-4">
        <h1>{post.title}</h1>

        <span className="flex items-center gap-4">
          {post.date.toLocaleDateString("pt-BR")} - {post.author}
          {keycloak.authenticated && <PostStatusBadge status={post.status} />}
        </span>
      </div>

      <div
        className="flex flex-col gap-4"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </section>
  );
}
