import type { AxiosInstance } from "axios";

export class ApiError extends Error {
  detail: string;
  status: number;

  constructor(detail: string, status: number) {
    super(detail);
    this.detail = detail;
    this.status = status;
  }
}

class ErrorMiddleware {
  private static instance: ErrorMiddleware | null = null;

  private constructor(client: AxiosInstance) {
    client.interceptors.response.use(
      (response) => response,
      (error) => {
        const detail =
          error.response?.data?.detail ??
          "Houve um erro desconhecido. Por favor tente novamente";
        const status = error.response?.status ?? 0;
        return Promise.reject(new ApiError(detail, status));
      },
    );
  }

  public static use(client: AxiosInstance): ErrorMiddleware {
    if (!ErrorMiddleware.instance) {
      ErrorMiddleware.instance = new ErrorMiddleware(client);
    }

    return ErrorMiddleware.instance;
  }
}

export default ErrorMiddleware;
