import ProtectedRoute from "@/components/auth/components/protected-route";
import { cn } from "@/lib/utils";
import client from "@/types/client";
import { useQuery } from "@tanstack/react-query";
import {
  Link,
  Outlet,
  createFileRoute,
  useLocation,
} from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin" }],
  }),
  component: RouteComponent,
});

const CONFIG: Record<string, string> = {
  "/admin": "Lista de posts",
  "/admin/financas": "Finanças",
  "/qr-code": "QR code",
};

function RouteComponent() {
  const { pathname } = useLocation();

  return (
    <ProtectedRoute>
      <main className="mx-auto grid min-h-dvh w-full max-w-7xl gap-6 md:grid-cols-[280px_minmax(0,1fr)] md:p-8">
        <aside className="rounded-2xl border border-border bg-background p-6 hidden xl:flex flex-col">
          <p className="text-sm font-medium text-muted-foreground">Admin</p>
          <h1 className="mt-2 text-2xl font-semibold">Dashboard</h1>

          <nav className="mt-8 flex flex-col gap-2 text-sm">
            {Object.entries(CONFIG).map(([path, label]) => (
              <Link
                key={path}
                to={path}
                className={cn(
                  "rounded-lg px-3 py-2 hover:bg-muted transition-colors",
                  {
                    "bg-primary/10 text-primary": pathname === path,
                  },
                )}
              >
                {label}
              </Link>
            ))}
          </nav>

          <Version className="mt-auto text-right" />
        </aside>

        <section className="min-w-0 rounded-2xl border border-border bg-background p-6 md:p-8 col-span-2 xl:col-span-1">
          <Outlet />
        </section>
      </main>
    </ProtectedRoute>
  );
}

function useVersion() {
  return useQuery({
    queryKey: ["version"],
    queryFn: async () => await client.GET("/api/"),
    select: (data) => data.data?.version,
  });
}

function Version({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  const { data: version } = useVersion();

  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props}>
      v {version}
    </p>
  );
}
