// typed-client.ts
import axios from "axios";

import type { AxiosInstance, AxiosRequestConfig } from "axios";
import type { paths } from "./api";

import AuthMiddleware from "./auth_middleware";
import ErrorMiddleware from "./error_middleware";

// ---- Type helpers ----

type PathsWithMethod<M extends string> = {
  [P in keyof paths]: M extends keyof paths[P] ? P : never;
}[keyof paths];

type Params<
  P extends keyof paths,
  M extends keyof paths[P],
> = paths[P][M] extends { parameters: infer Pa } ? Pa : never;

// A highly resilient type transformer for openapi-typescript shapes
type DeepConvertBinary<T> = T extends Blob | File
  ? T
  : T extends { format: "binary" }
    ? File | Blob
    : T extends object
      ? {
          [K in keyof T]: T[K] extends string
            ? File | Blob | string
            : DeepConvertBinary<T[K]>;
        }
      : T;

type RequestBody<
  P extends keyof paths,
  M extends keyof paths[P],
> = paths[P][M] extends {
  requestBody?: { content: { "application/json": infer B } };
}
  ? DeepConvertBinary<B>
  : paths[P][M] extends {
        requestBody?: { content: { "multipart/form-data": infer B } };
      }
    ? DeepConvertBinary<B>
    : never;

type SuccessResponse<
  P extends keyof paths,
  M extends keyof paths[P],
> = paths[P][M] extends {
  responses: {
    [S in 200 | 201 | 204]: { content: { "application/json": infer R } };
  };
}
  ? R
  : paths[P][M] extends {
        responses: { 200: { content: { "application/json": infer R } } };
      }
    ? R
    : any; // Fallback to any if the response is empty text, file downloads, etc.

// ---- Input shape per method ----

type GetInput<P extends keyof paths> =
  Params<P, "get"> extends never
    ? { axiosConfig?: AxiosRequestConfig }
    : { params: Params<P, "get">; axiosConfig?: AxiosRequestConfig };

type PostInput<P extends keyof paths> = {
  body?: RequestBody<P, "post">;
  params?: Params<P, "post">;
  axiosConfig?: AxiosRequestConfig;
};

type PatchInput<P extends keyof paths> = {
  body?: RequestBody<P, "patch">;
  params?: Params<P, "patch">;
  axiosConfig?: AxiosRequestConfig;
};

type PutInput<P extends keyof paths> = {
  body?: RequestBody<P, "put">;
  params?: Params<P, "put">;
  axiosConfig?: AxiosRequestConfig;
};

type DeleteInput<P extends keyof paths> = {
  params?: Params<P, "delete">;
  axiosConfig?: AxiosRequestConfig;
};

function interpolatePath(url: string, pathParams?: Record<string, unknown>) {
  if (!pathParams) return url;
  return url.replace(/\{(\w+)\}/g, (_, key) => String(pathParams[key]));
}

function splitPathAndQueryParams(params?: Record<string, unknown>) {
  const { path, query, ...otherParams } = params || {};
  return {
    path: path as Record<string, unknown> | undefined,
    flatParams: {
      ...otherParams,
      ...(query && typeof query === "object"
        ? (query as Record<string, unknown>)
        : {}),
    },
  };
}

// ---- Client factory ----

function createClient(baseURL?: string, defaults?: AxiosRequestConfig) {
  const instance: AxiosInstance = axios.create({ baseURL, ...defaults });

  // Expose the instance so interceptors etc. are still accessible
  const client = {
    instance,

    async GET<P extends PathsWithMethod<"get">>(
      url: P,
      input: GetInput<P> = {} as GetInput<P>,
    ) {
      const { axiosConfig, ...rest } = input as any;
      const { path, flatParams } = splitPathAndQueryParams(rest.params);

      const response = await instance.get<SuccessResponse<P, "get">>(
        interpolatePath(url, path),
        {
          params: flatParams,
          ...axiosConfig,
        },
      );
      return response;
    },

    async POST<P extends PathsWithMethod<"post">>(
      url: P,
      input: PostInput<P> = {},
    ) {
      const { body, params, axiosConfig } = input;
      const { path, flatParams } = splitPathAndQueryParams(params as any);

      // Detect if the request body is likely meant to be multipart/form-data
      // (e.g., if it contains a File, Blob, or if you want to pass it manually via config)
      const isFormData =
        body &&
        typeof body === "object" &&
        Object.values(body).some((v) => v instanceof File || v instanceof Blob);

      const response = await instance.post<SuccessResponse<P, "post">>(
        interpolatePath(url, path),
        body,
        {
          params: flatParams,
          ...axiosConfig,
          headers: {
            ...(isFormData ? { "Content-Type": "multipart/form-data" } : {}),
            ...axiosConfig?.headers,
          },
        },
      );
      return response;
    },

    async PATCH<P extends PathsWithMethod<"patch">>(
      url: P,
      input: PatchInput<P> = {},
    ) {
      const { body, params, axiosConfig } = input;
      const { path, flatParams } = splitPathAndQueryParams(params as any);
      const response = await instance.patch<SuccessResponse<P, "patch">>(
        interpolatePath(url, path),
        body,
        { params: flatParams, ...axiosConfig },
      );
      return response;
    },

    async PUT<P extends PathsWithMethod<"put">>(
      url: P,
      input: PutInput<P> = {},
    ) {
      const { body, params, axiosConfig } = input;
      const { path, flatParams } = splitPathAndQueryParams(params as any);
      // Detect if the request body is likely meant to be multipart/form-data
      // (e.g., if it contains a File, Blob, or if you want to pass it manually via config)
      const isFormData =
        body &&
        typeof body === "object" &&
        Object.values(body).some((v) => v instanceof File || v instanceof Blob);

      const response = await instance.put<SuccessResponse<P, "put">>(
        interpolatePath(url, path),
        body,
        {
          params: flatParams,
          ...axiosConfig,
          headers: {
            ...(isFormData ? { "Content-Type": "multipart/form-data" } : {}),
            ...axiosConfig?.headers,
          },
        },
      );
      return response;
    },

    async DELETE<P extends PathsWithMethod<"delete">>(
      url: P,
      input: DeleteInput<P> = {},
    ) {
      const { params, axiosConfig } = input;
      const { path, flatParams } = splitPathAndQueryParams(params as any);
      const response = await instance.delete<SuccessResponse<P, "delete">>(
        interpolatePath(url, path),
        { params: flatParams, ...axiosConfig },
      );
      return response;
    },
  };

  return client;
}

const client = createClient();

ErrorMiddleware.use(client.instance);
AuthMiddleware.use(client.instance);

export default client;
