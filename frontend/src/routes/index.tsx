import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomeComponent,

  head: () => ({
    meta: [{ title: "Home" }],
  }),
});

function HomeComponent() {
  return "Hello World";
}
