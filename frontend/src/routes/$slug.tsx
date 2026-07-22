import type { Post } from "../contexts/blog-post/types/post";

import fetchPost from "../contexts/blog-post/lib/fetchPost";

import { createFileRoute, useLoaderData } from "@tanstack/react-router";

export const Route = createFileRoute("/$slug")({
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
  const post: Post = useLoaderData({ from: Route.id });

  return (
    <section className="flex flex-col gap-4">
      <img
        className="max-h-70 object-cover object-center mb-8"
        src={post.imageUrl}
      />

      <div className="w-full max-w-3xl mx-auto flex flex-col gap-4">
        <div className="flex flex-col gap-4 mb-4">
          <h1>{post.title}</h1>
          <span>
            {post.date.toLocaleDateString("pt-BR")} - {post.author}
          </span>
        </div>

        <div
          className="flex flex-col gap-4"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </section>
  );
}
