import { useEffect, useState } from "react";
import fetchBlogPost from "../lib/fetchBlogPost";

export default function useBlogPost(slug: string) {
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogPost(slug).then((response) => {
      if (response.ok) {
        response.text().then((text) => setContent(text));
      } else {
        setContent(null);
      }
    });
  }, [slug]);

  return content;
}
