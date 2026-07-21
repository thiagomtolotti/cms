import BlogPostContent from "./contexts/blog-post/components/content";

function App() {
  return <BlogPage />;
}

function BlogPage() {
  const slug = window.location.pathname.split("/").pop();

  if (!slug) {
    return <h1>No slug provided</h1>;
  }

  return <BlogPostContent slug={slug} />;
}

export default App;
