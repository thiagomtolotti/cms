import { createRootRoute, HeadContent, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <html>
        <head>
          <HeadContent />
        </head>
        <body>
          <Outlet />
          <TanStackRouterDevtools />
        </body>
      </html>
    </>
  ),
});
