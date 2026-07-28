export default function MultiPartFormDataSerializer(
  body: Record<any, any>,
): FormData {
  const formData = new FormData();

  for (const [key, value] of Object.entries(body)) {
    if (!value) continue;

    if (value instanceof File || value instanceof Blob) {
      formData.append(key, value);
    } else if (typeof value === "object") {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, String(value));
    }
  }

  return formData;
}
