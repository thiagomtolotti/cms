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
    this.clearToken();
  }

  public saveTokens(tokens?: Keycloak.KeycloakTokenParsed) {
    if (this.token || tokens?.token) {
      sessionStorage.setItem("kc_token", tokens?.token ?? this.token!);
    }
    if (this.refreshToken || tokens?.refreshToken) {
      sessionStorage.setItem(
        "kc_refreshToken",
        tokens?.refreshToken ?? this.refreshToken!,
      );
    }
    if (this.idToken || tokens?.idToken) {
      sessionStorage.setItem("kc_idToken", tokens?.idToken ?? this.idToken!);
    }
  }

  public clearToken() {
    sessionStorage.removeItem("kc_token");
    sessionStorage.removeItem("kc_refreshToken");
    sessionStorage.removeItem("kc_idToken");
  }
}

const keycloak = new KeycloakService({
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  url: import.meta.env.VITE_KEYCLOAK_BASE_URL,
});

// @ts-ignore
window.keycloak = keycloak;

export default keycloak;
