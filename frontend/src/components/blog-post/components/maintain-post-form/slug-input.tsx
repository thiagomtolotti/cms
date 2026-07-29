import { useState } from "react";
import { useDebounce } from "use-debounce";
import useValidateSlug from "../../hooks/useValidateSlug";

import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface SlugInputProps {
  defaultValue?: string;
}

export default function SlugInput({ defaultValue }: SlugInputProps) {
  const [slug, setSlug] = useState(defaultValue || "");
  const [debouncedSlug] = useDebounce(slug, 500);

  const { data: isValidSlug } = useValidateSlug(debouncedSlug, !defaultValue);

  const isSlugDisabled = Boolean(defaultValue);
  const shouldShowError = !isSlugDisabled && isValidSlug === false;

  return (
    <Field data-invalid={shouldShowError}>
      <FieldLabel htmlFor="slug">Slug</FieldLabel>

      <Input
        type="text"
        placeholder="slug"
        name="slug"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        required
        disabled={isSlugDisabled}
        className="[data-invalid]:text-gray-50!"
      />

      {shouldShowError && slug && (
        <FieldDescription>Slug inválido ou já em uso</FieldDescription>
      )}
    </Field>
  );
}
