import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$slug/editar")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/$slug/editar"!</div>;
}
