import { createRootRoute, HeadContent, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Toaster } from "sonner";

export const Route = createRootRoute({
  component: () => (
    <>
      <HeadContent />
      <Outlet />
      {import.meta.env.DEV && <TanStackRouterDevtools />}
      <Toaster />
    </>
  ),
});
