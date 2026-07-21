export default function CreatePostForm() {
  return (
    <form className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Título do post"
        className="p-4 w-full text-2xl"
        required
      />

      <div className="flex gap-6">
        <input type="text" placeholder="slug" required />
        <input type="text" placeholder="Autor" required />
        <input type="date" placeholder="Data de publicação" required />
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
        required
      />

      <div className="mt-8 ml-auto">
        <button type="submit">Criar Post</button>
      </div>
    </form>
  );
}
