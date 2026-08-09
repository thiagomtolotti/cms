import { createFileRoute } from "@tanstack/react-router";

import ProtectedRoute from "@/components/auth/components/protected-route";

import TransactionList from "@/components/finances/components/transaction_list";

export const Route = createFileRoute("/financas/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ProtectedRoute>
      <main className="grid grid-cols-12 max-w-5xl mx-auto">
        <TransactionList />
      </main>
    </ProtectedRoute>
  );
}
