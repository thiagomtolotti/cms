import type { paths } from "./api";

type APIUrls = keyof paths;

type ExtractRouteParams<T extends string> =
  T extends `${string}{${infer Param}}${infer Rest}`
    ? { [K in Param]: string | number } & ExtractRouteParams<Rest>
    : Record<never, never>;

export default function makeApiUrl<TPath extends APIUrls>(
  path: TPath,
  ...args: keyof ExtractRouteParams<TPath> extends never
    ? [] // No parameters required
    : [params: ExtractRouteParams<TPath>] // Parameters strictly enforced
): string {
  const params = args[0];
  let url: string = path;

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url = url.replace(`{${key}}`, String(value));
    });
  }

  return url;
}
