import PostList from "@/components/blog-post/components/post-list";
import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin" }],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted-foreground">Workspace</p>
        <h2 className="text-3xl font-semibold tracking-tight">
          Lista de Posts
        </h2>
        <p className="max-w-2xl text-muted-foreground">
          Lista de posts criados, rascunhos e publicados. Você pode editar ou
          criar novos posts a partir daqui.
        </p>
      </div>

      {/* <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Posts" value="12" />
        <StatCard label="Drafts" value="3" />
        <StatCard label="Published" value="9" />
      </div> */}

      <div className="ml-auto">
        <Link to="/create">
          <Button>
            <Plus />
            Criar post
          </Button>
        </Link>
      </div>

      <div className="rounded-xl border border-dashed border-border p-6 text-sm text-muted-foreground">
        <PostList />
      </div>
    </div>
  );
}

// function StatCard({ label, value }: { label: string; value: string }) {
//   return (
//     <div className="rounded-xl border border-border bg-muted/20 p-5">
//       <p className="text-sm text-muted-foreground">{label}</p>
//       <p className="mt-2 text-2xl font-semibold">{value}</p>
//     </div>
//   );
// }
