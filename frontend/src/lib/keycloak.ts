import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  clientId: "frontend",
  realm: "blog",
  url: "https://auth.thiagotolotti.com",
});

export default keycloak;
