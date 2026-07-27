import type { AxiosInstance } from 'axios'

class AuthMiddleware {
  private static instance: AuthMiddleware | null = null

  private constructor(client: AxiosInstance) {
    client.interceptors.request.use((config) => {
      const token = this.token

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      return config
    })
  }

  public static use(client: AxiosInstance): AuthMiddleware {
    if (!AuthMiddleware.instance) {
      AuthMiddleware.instance = new AuthMiddleware(client)
    }

    return AuthMiddleware.instance
  }

  private get token(): string | null {
    const OIDC_STORAGE_KEY = `oidc.user:${import.meta.env.VITE_KEYCLOAK_BASE_URL}/realms/${import.meta.env.VITE_KEYCLOAK_REALM}:${import.meta.env.VITE_KEYCLOAK_CLIENT_ID}`

    const oidcData = sessionStorage.getItem(OIDC_STORAGE_KEY)

    if (oidcData) {
      const parsed = JSON.parse(oidcData)
      const token: string | null = parsed.access_token

      return token
    }

    return null
  }
}

export default AuthMiddleware
