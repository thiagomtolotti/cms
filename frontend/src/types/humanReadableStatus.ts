import type { components } from "./api";

const humanReadableStatus: Record<
  components["schemas"]["PostMetadataResponseDTO"]["status"],
  string
> = {
  draft: "Rascunho",
  published: "Publicado",
  deleted: "Excluído",
};

export default humanReadableStatus;
