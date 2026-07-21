import useCreateBlogPost from "../hooks/useCreateBlogPost";

export default function CreatePostForm() {
  const { create } = useCreateBlogPost();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    create(formData);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Título do post"
        className="p-4 w-full text-2xl"
        name="title"
        required
      />

      <div className="flex gap-6">
        <input type="text" placeholder="slug" name="slug" required />
        <input type="text" placeholder="Autor" name="author" required />
        <input
          type="date"
          placeholder="Data de publicação"
          name="date"
          required
        />
      </div>

      <label
        htmlFor="cover-image"
        className="cursor-pointer text-lg font-semibold"
      >
        Imagem de capa
      </label>
      <input
        type="file"
        placeholder="Imagem de capa"
        id="cover-image"
        name="coverImage"
        accept="image/*"
        required
      />

      <label
        htmlFor="markdown"
        className="cursor-pointer text-lg font-semibold"
      >
        Markdown do post
      </label>
      <input
        type="file"
        placeholder="Markdown do post"
        id="markdown"
        name="markdown"
        accept=".md"
        required
      />

      <div className="mt-8 ml-auto">
        <button type="submit">Criar Post</button>
      </div>
    </form>
  );
}
