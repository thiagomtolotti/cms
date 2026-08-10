import ProtectedRoute from "@/components/auth/components/protected-route";
import { Link, Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin" }],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ProtectedRoute>
      <main className="mx-auto grid min-h-dvh w-full max-w-7xl gap-6 p-4 md:grid-cols-[280px_minmax(0,1fr)] md:p-8">
        <aside className="rounded-2xl border border-border bg-background p-6">
          <p className="text-sm font-medium text-muted-foreground">Admin</p>
          <h1 className="mt-2 text-2xl font-semibold">Dashboard</h1>

          <nav className="mt-8 flex flex-col gap-2 text-sm">
            <Link
              className="rounded-lg px-3 py-2 hover:bg-background"
              to="/admin"
            >
              Visão geral
            </Link>
            <Link
              className="rounded-lg px-3 py-2 hover:bg-background"
              to="/create"
            >
              Criar post
            </Link>
            <Link
              className="rounded-lg px-3 py-2 hover:bg-background"
              to="/qr-code"
            >
              QR code
            </Link>
          </nav>
        </aside>

        <section className="min-w-0 rounded-2xl border border-border bg-background p-6 md:p-8">
          <Outlet />
        </section>
      </main>
    </ProtectedRoute>
  );
}
