import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./lib/keycloak";

export const queryClient = new QueryClient();

const router = createRouter({ routeTree });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={{
        checkLoginIframe: false,
      }}
      onTokens={(tokens) => keycloak.saveTokens(tokens)}
      onEvent={(e, err) => {
        console.log("onEvent", e, err);

        if (e === "onAuthLogout" || e === "onAuthRefreshError") {
          keycloak.logout();
        }
      }}
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ReactKeycloakProvider>
  </StrictMode>,
);
