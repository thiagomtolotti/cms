import QRCode from "qrcode";

import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";

import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/qr-code/")({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: "QR Code" }],
  }),
});

function RouteComponent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const generateQRCode = useGenerateQRCode(containerRef);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = "";
    generateQRCode(e.target.value);
  }

  return (
    <main className="mx-auto w-full max-w-sm flex flex-col items-center justify-center gap-4 p-4">
      <Input
        type="text"
        placeholder="Enter text to generate QR code"
        onChange={handleInputChange}
      />

      <div ref={containerRef} />
    </main>
  );
}

function useGenerateQRCode(container: React.RefObject<HTMLDivElement | null>) {
  return async function generateQRCode(text: string) {
    QRCode.toCanvas(text, { errorCorrectionLevel: "H" }, (err, canvas) => {
      if (err) {
        console.error(err);
        return;
      }

      if (!container.current) return;

      container.current.appendChild(canvas);
    });
  };
}
