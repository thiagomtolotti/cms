import "./post.css";

import useBlogPost from "../hooks/useBlogPost";

interface BlogPostContentProps {
  slug: string;
}

export default function BlogPostContent({ slug }: BlogPostContentProps) {
  const { content, isPending, error } = useBlogPost(slug);

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <section
        className="blog-post-error"
        dangerouslySetInnerHTML={{ __html: error }}
      />
    );
  }

  return (
    <section
      className="blog-post"
      dangerouslySetInnerHTML={{ __html: content || "" }}
    />
  );
}
