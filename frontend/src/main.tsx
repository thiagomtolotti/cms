import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ReactKeycloakProvider } from "react-keycloak-easy";
import keycloak from "./lib/keycloak";

const queryClient = new QueryClient();

const router = createRouter({ routeTree });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactKeycloakProvider authClient={keycloak}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ReactKeycloakProvider>
  </StrictMode>,
);
