import { useEffect, useState } from "react";
import fetchBlogPost from "../lib/fetchBlogPost";

export default function useBlogPost(slug: string) {
  const [isPending, setIsPending] = useState(true);
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsPending(true);

    fetchBlogPost(slug)
      .then((response) => {
        if (response.ok) {
          response.text().then((text) => setContent(text));
        } else {
          setContent(null);
          setError(
            `Error fetching blog post: ${response.status} ${response.statusText}`,
          );
        }
      })
      .finally(() => setIsPending(false));
  }, [slug]);

  return { content, isPending, error };
}
