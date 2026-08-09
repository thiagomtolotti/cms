import { useKeycloak } from "@react-keycloak/web";

import fetchPost from "@/components/blog-post/lib/fetchPost";

import type { Post } from "@/components/blog-post/types/post";

import { cn } from "@/lib/utils";

import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import PostStatusBadge from "@/components/blog-post/components/post-status-badge";

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
  const post: Post = useLoaderData({ from: Route.id });

  return (
    <section className="flex flex-col gap-4 w-full max-w-3xl mb-16 px-6 mx-auto">
      <ImageArea imageUrl={post.imageUrl} />

      <TitleArea post={post} />

      <ContentArea content={post.content} />
    </section>
  );
}

interface TitleAreaProps {
  post: Post;
}

function TitleArea({ post }: TitleAreaProps) {
  const { keycloak } = useKeycloak();

  return (
    <div className="flex flex-col gap-4 mb-4">
      <h1 className="text-4xl font-semibold">{post.title}</h1>

      <span className="flex items-center gap-x-4 gap-y-2 flex-wrap">
        {post.date.toLocaleDateString("pt-BR")} - {post.author}
        {keycloak.authenticated && <PostStatusBadge status={post.status} />}
      </span>
    </div>
  );
}

interface ImageAreaProps {
  imageUrl: string | null;
}

function ImageArea({ imageUrl }: ImageAreaProps) {
  if (!imageUrl) return null;

  return (
    <div
      className={cn(
        "mb-8 aspect-video max-w-3xl w-full mx-auto",
        "overflow-hidden shadow-md rounded-lg lg:rounded-xl",
        "flex items-center justify-center",
      )}
    >
      <img className="w-full h-full object-cover" src={imageUrl} />
    </div>
  );
}

function ContentArea({ content }: { content: string }) {
  return (
    <div
      className="flex flex-col gap-4"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
