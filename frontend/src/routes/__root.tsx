import LoginButton from "@/components/auth/components/login-button";
import { createRootRoute, HeadContent, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Toaster } from "sonner";

export const Route = createRootRoute({
  component: () => (
    <>
      <HeadContent />

      <Navigation />

      <Outlet />

      {import.meta.env.DEV && <TanStackRouterDevtools />}
      <Toaster />
    </>
  ),
});

function Navigation() {
  return (
    <nav className=" p-4 flex gap-4 items-center w-full max-w-7xl mx-auto">
      <div className="ml-auto">
        <LoginButton />
      </div>
    </nav>
  );
}
