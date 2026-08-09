import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
];

interface ImageInputProps {
  defaultValue?: string | null;
}

export default function ImageInput({ defaultValue }: ImageInputProps) {
  const imageRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<string | null>(defaultValue || null);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (file && file.size > 1 * 1024 * 1024) {
      toast.error("O tamanho da imagem não pode exceder 1MB.");
      e.target.value = "";
      return;
    }

    setValue((current) => {
      if (current) URL.revokeObjectURL(current);
      return file ? URL.createObjectURL(file) : null;
    });
  }

  return (
    <>
      <div
        className={cn(
          "w-full aspect-video flex items-center justify-center",
          !value && "border-2 border-dashed border-muted-foreground",
          "hover:bg-muted transition-colors duration-200 cursor-pointer",
          "rounded-lg lg:rounded-xl shadow-md overflow-hidden relative",
          "hover:[&>.overlay]:opacity-100",
        )}
        onClick={() => imageRef.current?.click()}
      >
        {value ? (
          <img src={value} alt="Imagem de capa" />
        ) : (
          <p className="text-sm text-muted-foreground">
            Insira a sua imagem aqui
          </p>
        )}

        <div
          className={cn(
            "overlay absolute w-full h-full bg-black/20",
            "opacity-0 transition-opacity duration-100 ease-in-out",
          )}
        />

        {value && <ImageInput.DeleteButton clearValue={() => setValue(null)} />}
      </div>

      <input
        type="file"
        placeholder="Imagem de capa"
        id="cover-image"
        name="coverImage"
        accept={ACCEPTED_IMAGE_TYPES.join(",")}
        className="hidden"
        onChange={handleImageChange}
        ref={imageRef}
      />
    </>
  );
}

interface ImageInputDeleteButtonProps {
  clearValue: () => void;
}

ImageInput.DeleteButton = ({ clearValue }: ImageInputDeleteButtonProps) => {
  return (
    <Button
      variant="default"
      size="sm"
      className="absolute right-4 top-4"
      onClick={(e) => {
        e.stopPropagation();
        clearValue();
      }}
    >
      <Trash2 />
      Excluir imagem
    </Button>
  );
};
