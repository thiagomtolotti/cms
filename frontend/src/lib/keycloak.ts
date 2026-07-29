import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  clientId: "blog",
  realm: "blog",
  url: "https://auth.thiagotolotti.com",
});

export default keycloak;
