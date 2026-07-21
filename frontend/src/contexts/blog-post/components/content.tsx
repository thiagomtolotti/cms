import "./post.css";

import useBlogPost from "../hooks/useBlogPost";

interface BlogPostContentProps {
  slug: string;
}

export default function BlogPostContent({ slug }: BlogPostContentProps) {
  const content = useBlogPost(slug);

  return (
    <section
      className="blog-post"
      dangerouslySetInnerHTML={{ __html: content || "" }}
    />
  );
}
