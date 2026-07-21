import "./post.css";

import useBlogPost from "../hooks/useBlogPost";

interface BlogPostContentProps {
  slug: string;
}

export default function BlogPostContent({ slug }: BlogPostContentProps) {
  const { content, isPending, error } = useBlogPost(slug);

  return (
    <section className="blog-post">
      {isPending && <p>Loading...</p>}

      {error && (
        <div className="error" dangerouslySetInnerHTML={{ __html: error }} />
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
