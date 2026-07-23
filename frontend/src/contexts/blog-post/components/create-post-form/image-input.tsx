import { useEffect, useState } from "react";

export default function ImageInput() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    setPreviewUrl((current) => {
      if (current) URL.revokeObjectURL(current);
      return file ? URL.createObjectURL(file) : null;
    });
  }

  return (
    <>
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
        onChange={handleImageChange}
        required
      />

      {previewUrl && (
        <img
          src={previewUrl}
          alt="Pré-visualização da imagem de capa"
          className="max-h-64 w-auto rounded-md object-cover"
        />
      )}
    </>
  );
}
