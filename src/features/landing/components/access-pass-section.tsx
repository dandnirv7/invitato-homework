"use client";

import Image from "next/image";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { SectionReveal } from "./section-reveal";
import { WEDDING_CONFIG } from "../lib/constants";

interface AccessPassSectionProps {
  guestName?: string;
}

export function AccessPassSection({ guestName = "Invitato" }: AccessPassSectionProps) {
  const handleDownload = () => {
    toast.success("Kartu Akses siap diunduh!");
    // Create an anchor or print/save action
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head><title>Kartu Akses - ${guestName}</title></head>
          <body style="font-family: sans-serif; text-align: center; padding: 40px;">
            <h2>KARTU AKSES MASUK</h2>
            <h3>The Wedding of Ricky & Fellycia</h3>
            <p><strong>Nama:</strong> ${guestName}</p>
            <p><strong>Venue:</strong> ${WEDDING_CONFIG.reception.venueName}</p>
            <p><strong>Tanggal:</strong> ${WEDDING_CONFIG.dateDisplay}</p>
            <p><strong>Berlaku untuk:</strong> (5) orang</p>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  };

  return (
    <section id="access-card" className="px-6 py-16">
      <SectionReveal className="flex flex-col items-center">
        {/* Pass Card Container */}
        <div className="w-full max-w-sm overflow-hidden rounded-xl bg-white shadow-xl ring-1 ring-black/10">
          {/* Card Top Banner */}
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <Image
              src="/assets/1.jpg"
              alt="Ricky & Fellycia"
              fill
              className="object-cover"
            />
            <div className="bg-bg-overlay/55 absolute inset-0" aria-hidden />
            <div className="text-text-alt relative z-10 flex h-full flex-col justify-end p-4 text-left">
              <span className="font-body text-[10px] tracking-[0.25em] uppercase opacity-90">
                KARTU AKSES MASUK
              </span>
              <h3 className="font-heading text-xl leading-tight">
                {WEDDING_CONFIG.groomName} &amp; {WEDDING_CONFIG.brideName}
              </h3>
              <p className="font-body text-xs opacity-90">
                {WEDDING_CONFIG.reception.venueName}
              </p>
              <p className="font-body text-[11px] opacity-75">
                {WEDDING_CONFIG.dateDisplay}
              </p>
            </div>
          </div>

          {/* Card Middle Info with QR */}
          <div className="p-5">
            <div className="flex items-center gap-4">
              {/* QR Code Container */}
              <div className="relative size-28 shrink-0 overflow-hidden rounded-lg border border-black/10 p-1.5 shadow-2xs">
                <Image
                  src="/assets/icons/qr-code.svg"
                  alt="QR Code Akses Masuk"
                  fill
                  className="object-contain p-1"
                />
              </div>

              {/* Guest Details */}
              <div className="flex flex-col text-left">
                <span className="font-body text-text-muted text-xs">
                  Yth. Bapak/Ibu/Saudara/i,
                </span>
                <span className="font-heading text-text-main text-lg leading-tight font-semibold">
                  {guestName}
                </span>

                <span className="font-body text-text-muted mt-2 text-xs">
                  Informasi
                </span>
                <span className="font-heading text-text-main text-sm font-medium">
                  Vendor
                </span>
                <span className="font-body text-text-main text-xs font-semibold">
                  Berlaku untuk <span className="text-[#8e2424]">(5)</span> orang
                </span>
              </div>
            </div>

            <p className="font-body text-text-muted mt-4 text-center text-xs italic">
              Silakan tunjukkan QR Code di atas kepada petugas
            </p>
          </div>

          {/* Card Bottom Bar */}
          <div className="bg-[#60656a] flex items-center justify-center py-2.5">
            <div className="relative h-4 w-20">
              <Image
                src="/assets/invitato.png"
                alt="Invitato"
                fill
                className="object-contain brightness-0 invert"
              />
            </div>
          </div>
        </div>

        {/* Action button & notes below card */}
        <p className="font-body text-text-main mx-auto mt-6 max-w-xs text-center text-sm leading-relaxed">
          Silakan download <strong>Kartu Akses Masuk</strong> diatas, untuk
          mempermudah proses scanning di lokasi acara:
        </p>

        <Button
          type="button"
          onClick={handleDownload}
          className="bg-[#6c7278] text-text-alt font-body hover:bg-[#5a6066] mt-4 inline-flex h-10 items-center gap-2 rounded-[4px] px-6 text-[14px] shadow-sm transition-all duration-300 hover:shadow-md active:scale-[0.98]"
        >
          <Download className="size-4" />
          Unduh Kartu Akses
        </Button>

        <p className="font-body text-text-muted mt-3 text-center text-xs italic">
          *) QR Code hanya tersedia pada paket Digital Guestbook
        </p>
      </SectionReveal>
    </section>
  );
}
