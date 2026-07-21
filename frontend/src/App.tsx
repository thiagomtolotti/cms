import BlogPostContainer from "./contexts/blog-post/components/content";
import CreatePostForm from "./contexts/blog-post/components/create-post-form";

function App() {
  const slug = window.location.pathname.split("/").pop();

  if (!slug) {
    return <h1>No slug provided</h1>;
  }

  if (slug === "create") {
    return <CreatePostPage />;
  }

  return <BlogPage slug={slug} />;
}

interface BlogPageProps {
  slug: string;
}

function BlogPage({ slug }: BlogPageProps) {
  return <BlogPostContainer slug={slug} />;
}

function CreatePostPage() {
  return (
    <section className="flex flex-col gap-8 max-w-4xl mx-auto my-16">
      <h1 className="w-full mb-8">Crie um novo post</h1>

      <CreatePostForm />
    </section>
  );
}

export default App;
