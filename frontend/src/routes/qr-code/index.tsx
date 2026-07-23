import QRCode from "qrcode";

import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/qr-code/")({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: "QR Code" }],
  }),
});

function RouteComponent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const generateQRCode = useGenerateQRCode(containerRef);

  function handleCreateQRCode(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const text = formData.get("text") as string;

    if (!containerRef.current) return;

    generateQRCode(text);
  }

  return (
    <main className="mx-auto w-full max-w-sm flex flex-col items-center justify-center gap-10 p-4 min-h-dvh">
      <div className="w-full p-8 bg-black/80 rounded-xl">
        <div ref={containerRef} className="w-full " />
      </div>

      <form
        onSubmit={handleCreateQRCode}
        className="flex flex-col gap-8 w-full"
      >
        <Input
          type="text"
          name="text"
          placeholder="Digite o texto que deseja gerar o QR Code"
        />

        <Button type="submit">Gerar QR Code</Button>
      </form>
    </main>
  );
}

function useGenerateQRCode(container: React.RefObject<HTMLDivElement | null>) {
  return async function generateQRCode(text: string) {
    const width = container.current?.offsetWidth || undefined;

    QRCode.toCanvas(
      text,
      {
        errorCorrectionLevel: "H",
        width,
      },
      (err, canvas) => {
        if (err) {
          console.error(err);
          return;
        }

        if (!container.current) return;

        container.current.innerHTML = "";
        container.current.appendChild(canvas);
      },
    );
  };
}
