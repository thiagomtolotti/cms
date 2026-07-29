import Keycloak from "keycloak-js";

class KeycloakService extends Keycloak {
  constructor(config: Keycloak.KeycloakConfig) {
    super(config);

    this.token = sessionStorage.getItem("kc_token") ?? undefined;
    this.refreshToken = sessionStorage.getItem("kc_refreshToken") ?? undefined;
    this.idToken = sessionStorage.getItem("kc_idToken") ?? undefined;
  }

  public async login(options?: Keycloak.KeycloakLoginOptions) {
    await super.login(options);
    this.saveTokens();
  }

  public async logout(options?: Keycloak.KeycloakLogoutOptions) {
    await super.logout(options);
    this.clearTokens();
  }

  private saveTokens() {
    if (this.token) {
      sessionStorage.setItem("kc_token", this.token);
    }
    if (this.refreshToken) {
      sessionStorage.setItem("kc_refreshToken", this.refreshToken);
    }
    if (this.idToken) {
      sessionStorage.setItem("kc_idToken", this.idToken);
    }
  }

  private clearTokens() {
    sessionStorage.removeItem("kc_token");
    sessionStorage.removeItem("kc_refreshToken");
    sessionStorage.removeItem("kc_idToken");
  }
}

const keycloakService = new KeycloakService({
  clientId: "frontend",
  realm: "blog",
  url: "https://auth.thiagotolotti.com",
});

export default keycloakService;
