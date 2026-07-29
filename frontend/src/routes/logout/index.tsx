import { createFileRoute } from "@tanstack/react-router";
import { useKeycloak } from "@react-keycloak/web";

export const Route = createFileRoute("/logout/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { keycloak } = useKeycloak();

  keycloak.logout({
    redirectUri: window.location.origin,
  });

  return null;
}
