import useProtectedRoute from "../hooks/useProtectedRoute";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isPending } = useProtectedRoute();

  if (isPending) {
    return "Carregando...";
  }

  return children;
}
