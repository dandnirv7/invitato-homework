"use client";

import Image from "next/image";
import QRCode from "qrcode";
import { useEffect, useState } from "react";

export function EntranceQrCode({ value }: { value: string }) {
  const [dataUrl, setDataUrl] = useState<string>("");

  useEffect(() => {
    let active = true;
    QRCode.toDataURL(value, {
      margin: 1,
      width: 256,
      errorCorrectionLevel: "M",
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
    })
      .then((url) => {
        if (active) setDataUrl(url);
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, [value]);

  if (!dataUrl) {
    return (
      <div
        className="flex h-full w-full animate-pulse items-center justify-center bg-neutral-100"
        aria-hidden
      />
    );
  }

  return (
    <Image
      src={dataUrl}
      alt="QR Code"
      width={120}
      height={120}
      className="h-full w-full object-contain"
    />
  );
}
