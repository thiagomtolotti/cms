import type { PostMetadata } from "../lib/fetchMetadata";
import { useEffect, useState } from "react";

import fetchMetadata from "../lib/fetchMetadata";

export default function usePostMetadata(slug: string) {
  const [metadata, setMetadata] = useState<PostMetadata | null>(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    setIsPending(true);
    setMetadata(null);

    fetchMetadata(slug)
      .then((metadata) => {
        setMetadata(metadata);
      })
      .finally(() => setIsPending(false));
  }, [slug]);

  return { metadata, isPending };
}
