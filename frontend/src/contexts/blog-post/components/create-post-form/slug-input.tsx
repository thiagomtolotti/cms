import { useState } from "react";
import { useDebounce } from "use-debounce";
import useValidateSlug from "../../hooks/useValidateSlug";

import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function SlugInput() {
  const [slug, setSlug] = useState("");
  const [debouncedSlug] = useDebounce(slug, 500);

  const { data: isValidSlug } = useValidateSlug(debouncedSlug);

  return (
    <Field data-invalid={isValidSlug === false}>
      <FieldLabel htmlFor="slug">Slug</FieldLabel>

      <Input
        type="text"
        placeholder="slug"
        name="slug"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        required
        className="[data-invalid]:text-gray-50!"
      />

      {!isValidSlug && slug && (
        <FieldDescription>Slug inválido ou já em uso</FieldDescription>
      )}
    </Field>
  );
}
