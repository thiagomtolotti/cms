import "./post.css";

import useBlogPost from "../hooks/useBlogPost";
import usePostMetadata from "../hooks/usePostMetadata";
import { useEffect } from "react";
import getPostImage from "../lib/fetchPostImage";

interface BlogPostContentProps {
  slug: string;
}

export default function BlogPostContent({ slug }: BlogPostContentProps) {
  const { content, isPending, error } = useBlogPost(slug);
  const { metadata } = usePostMetadata(slug);

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
    <section className="blog-post">
      {isPending && <p>Loading...</p>}

      {error && (
        <div className="error" dangerouslySetInnerHTML={{ __html: error }} />
      )}

      <img className="image" src={getPostImage(slug)} />

      {metadata && (
        <TitleArea
          title={metadata.title}
          author={metadata.author}
          date={metadata.date}
        />
      )}

      {content && (
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
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
    <div className="title">
      <h1>{title}</h1>
      <span className="metadata">
        {new Date(date).toLocaleDateString("pt-BR")} - {author}
      </span>
    </div>
  );
}
