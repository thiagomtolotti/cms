import useBlogPost from "../hooks/useBlogPost";

interface BlogPostContentProps {
  slug: string;
}

export default function BlogPostContent({ slug }: BlogPostContentProps) {
  const content = useBlogPost(slug);

  return <section dangerouslySetInnerHTML={{ __html: content || "" }} />;
}
