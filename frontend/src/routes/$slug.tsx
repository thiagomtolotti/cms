import { createFileRoute } from "@tanstack/react-router";
import BlogPostContainer from "../contexts/blog-post/components/content";

export const Route = createFileRoute("/$slug")({
  component: RouteComponent,
});

function RouteComponent() {
  return <BlogPostContainer slug={Route.useParams().slug} />;
}
