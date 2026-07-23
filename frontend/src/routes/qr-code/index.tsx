import QRCode from "qrcode";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

export const Route = createFileRoute("/qr-code/")({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: "QR Code" }],
  }),
});

function RouteComponent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const generateQRCode = useGenerateQRCode(containerRef);

  useEffect(() => {
    generateQRCode("Hello, World!");

    return () => {
      if (!containerRef.current) return;

      containerRef.current.innerHTML = "";
    };
  }, [generateQRCode]);

  return (
    <main className="mx-auto w-full max-w-sm flex flex-col items-center justify-center gap-4 p-4">
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
