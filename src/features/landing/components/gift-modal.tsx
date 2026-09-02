"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Copy, Check, ChevronDown, Gift, CreditCard } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { WEDDING_CONFIG } from "../lib/constants";
import { cn } from "@/lib/utils";

interface GiftModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GiftModal({ open, onOpenChange }: GiftModalProps) {
  const [activeTab, setActiveTab] = useState<"bank" | "address">("bank");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = async (text: string, key: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      toast.success(`${label} berhasil disalin!`);
      setTimeout(() => setCopiedKey(null), 2500);
    } catch {
      toast.error("Gagal menyalin. Silakan salin secara manual.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        open={open}
        onOpenChange={onOpenChange}
        className="bg-[#f0f3f5] text-text-main max-w-md p-6 sm:p-8"
      >
        <p className="font-body text-text-muted mx-auto max-w-xs text-center text-[15px] leading-relaxed">
          Bagi yang ingin memberikan tanda kasih, dapat mengirimkan melalui
          fitur di bawah ini:
        </p>

        <div className="mt-6 space-y-4">
          {/* Bank Transfer Panel */}
          <div className="overflow-hidden rounded-md border border-black/10 bg-white shadow-xs">
            <Button
              type="button"
              variant="ghost"
              onClick={() =>
                setActiveTab(activeTab === "bank" ? "address" : "bank")
              }
              className="bg-[#d5dade] text-text-main font-heading hover:bg-[#c5cad0] flex h-auto w-full items-center justify-between rounded-none px-5 py-3.5 text-base tracking-wide uppercase transition-colors"
            >
              <span className="flex items-center gap-2.5">
                <CreditCard className="size-4 opacity-75" />
                Bank Transfer
              </span>
              <ChevronDown
                className={cn(
                  "size-4 transition-transform duration-300",
                  activeTab === "bank" && "rotate-180"
                )}
              />
            </Button>

            {activeTab === "bank" && (
              <div className="divide-y divide-black/5 p-5 space-y-6">
                {WEDDING_CONFIG.bankAccounts.map((account) => (
                  <div
                    key={account.accountNumber}
                    className="flex flex-col items-center pt-2 text-center first:pt-0"
                  >
                    <div className="relative mb-2 h-7 w-20">
                      <Image
                        src={account.logo}
                        alt={`Logo ${account.bank}`}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="font-heading text-text-main text-xl tracking-wider">
                      {account.accountNumber}
                    </span>
                    <span className="font-body text-text-muted mt-0.5 text-sm">
                      a.n {account.accountName}
                    </span>
                    <Button
                      type="button"
                      onClick={() =>
                        copyToClipboard(
                          account.accountNumber,
                          account.accountNumber,
                          "Nomor rekening"
                        )
                      }
                      className="bg-[#6c7278] text-text-alt font-body hover:bg-[#5a6066] mt-3 inline-flex h-8 items-center gap-1.5 rounded-[4px] px-4 text-xs shadow-xs transition-colors"
                    >
                      {copiedKey === account.accountNumber ? (
                        <>
                          <Check className="size-3.5" />
                          Tersalin
                        </>
                      ) : (
                        <>
                          <Copy className="size-3.5" />
                          Salin Nomor Rekening
                        </>
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Kirim Hadiah Fisik Panel */}
          <div className="overflow-hidden rounded-md border border-black/10 bg-white shadow-xs">
            <Button
              type="button"
              variant="ghost"
              onClick={() =>
                setActiveTab(activeTab === "address" ? "bank" : "address")
              }
              className="bg-[#d5dade] text-text-main font-heading hover:bg-[#c5cad0] flex h-auto w-full items-center justify-between rounded-none px-5 py-3.5 text-base tracking-wide uppercase transition-colors"
            >
              <span className="flex items-center gap-2.5">
                <Gift className="size-4 opacity-75" />
                Kirim Hadiah
              </span>
              <ChevronDown
                className={cn(
                  "size-4 transition-transform duration-300",
                  activeTab === "address" && "rotate-180"
                )}
              />
            </Button>

            {activeTab === "address" && (
              <div className="p-5 text-center">
                <p className="font-heading text-text-main text-base">
                  {WEDDING_CONFIG.giftAddress.recipient}
                </p>
                <p className="font-body text-text-muted mt-1 text-sm">
                  {WEDDING_CONFIG.giftAddress.phone}
                </p>
                <p className="font-body text-text-main/90 mx-auto mt-2 max-w-xs text-sm leading-relaxed">
                  {WEDDING_CONFIG.giftAddress.address}
                </p>
                <Button
                  type="button"
                  onClick={() =>
                    copyToClipboard(
                      WEDDING_CONFIG.giftAddress.address,
                      "address",
                      "Alamat pengiriman"
                    )
                  }
                  className="bg-[#6c7278] text-text-alt font-body hover:bg-[#5a6066] mt-4 inline-flex h-8 items-center gap-1.5 rounded-[4px] px-4 text-xs shadow-xs transition-colors"
                >
                  {copiedKey === "address" ? (
                    <>
                      <Check className="size-3.5" />
                      Tersalin
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5" />
                      Salin Alamat
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>

        <p className="font-heading text-text-muted mt-8 text-center text-sm tracking-widest uppercase">
          Ricky &amp; Fellycia
        </p>
      </DialogContent>
    </Dialog>
  );
}
