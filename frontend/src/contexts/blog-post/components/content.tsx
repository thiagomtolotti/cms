import { useEffect } from "react";

import useBlogPost from "../hooks/useBlogPost";
import usePostMetadata from "../hooks/usePostMetadata";

import getPostImage from "../lib/fetchPostImage";
import type { components } from "../../../types/api";

interface BlogPostContainerProps {
  slug: string;
}

export default function BlogPostContainer({ slug }: BlogPostContainerProps) {
  const { data: content, isPending, error } = useBlogPost(slug);
  const { data: metadata, isPending: isMetadataPending } =
    usePostMetadata(slug);

  useEffect(() => {
    const title = window.document.querySelector("title");
    const originalTitle = title?.textContent || "Blog Post";

    if (!title) return;

    title.textContent = metadata?.title || "Blog Post";

    return () => {
      title.textContent = originalTitle;
    };
  }, [metadata?.title]);

  return (
    <section className="flex flex-col w-full mx-auto mb-16">
      {(isPending || isMetadataPending) && <p>Loading...</p>}

      {error && (
        <div className="error" dangerouslySetInnerHTML={{ __html: error }} />
      )}

      {content && metadata && (
        <BlogPostContent slug={slug} content={content} metadata={metadata} />
      )}
    </section>
  );
}

interface BlogPostContentProps {
  slug: string;
  content: string;
  metadata: components["schemas"]["PostMetadataResponseDTO"];
}

function BlogPostContent({ slug, content, metadata }: BlogPostContentProps) {
  return (
    <section className="flex flex-col gap-4">
      <img
        className="max-h-70 object-cover object-center mb-8"
        src={getPostImage(slug)}
      />

      <div className="w-full max-w-3xl mx-auto flex flex-col gap-4">
        {metadata && (
          <TitleArea
            title={metadata.title}
            author={metadata.author}
            date={metadata.date}
          />
        )}

        {content && (
          <div
            className="flex flex-col gap-4"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
      </div>
    </section>
  );
}

interface TitleAreaProps {
  title: string;
  author: string;
  date: string;
}

function TitleArea({ title, author, date }: TitleAreaProps) {
  return (
    <div className="flex flex-col gap-4 mb-4">
      <h1>{title}</h1>
      <span>
        {new Date(date).toLocaleDateString("pt-BR")} - {author}
      </span>
    </div>
  );
}
