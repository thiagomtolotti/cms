import { useKeycloak } from "@react-keycloak/web";
import { useEffect } from "react";

export default function useProtectedRoute() {
  const { keycloak, initialized } = useKeycloak();

  useEffect(() => {
    if (initialized && !keycloak.authenticated) {
      console.log("User not authenticated, redirecting to login...");
      keycloak.login({
        redirectUri: window.location.href,
      });
    }
  }, [keycloak, initialized]);

  return {
    isPending: !initialized || (initialized && !keycloak.authenticated),
  };
}
