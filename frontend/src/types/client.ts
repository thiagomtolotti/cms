import createClient, { type Middleware } from "openapi-fetch";
import type { paths } from "./api";

type ApiError = {
  detail?: {
    loc: (string | number)[];
    msg: string;
    type: string;
    input?: unknown;
    ctx?: {} | undefined;
  }[];
};

async function getApiError(response: Response): Promise<Error> {
  try {
    // Clone response because body can only be read once
    const errorData: ApiError = await response.clone().json();
    const errorDetail = errorData?.detail;

    if (!errorDetail) {
      return new Error(`Request failed with status ${response.status}`);
    }

    if (typeof errorDetail === "string") {
      return new Error(errorDetail);
    }

    if (Array.isArray(errorDetail)) {
      const message = errorDetail.map((item) => item.msg).join(", ");
      return new Error(message);
    }
  } catch {
    const text = await response.text();
    return new Error(text || `Request failed with status ${response.status}`);
  }

  return new Error("An unknown error occurred.");
}

const client = createClient<paths>();

const errorMiddleware: Middleware = {
  async onResponse({ response }) {
    if (!response.ok) {
      throw await getApiError(response);
    }

    return response;
  },
};

client.use(errorMiddleware);

export default client;
