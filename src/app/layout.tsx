import type { Metadata, Viewport } from "next";
import { Marcellus, Cormorant_Upright, Great_Vibes } from "next/font/google";
import "./globals.css";
import { weddingEventSchema } from "@/lib/seo/schemas";

const fontHeading = Marcellus({
  weight: "400",
  variable: "--font-heading-loaded",
  subsets: ["latin"],
});

const fontBody = Cormorant_Upright({
  weight: ["400", "500", "700"],
  variable: "--font-body-loaded",
  subsets: ["latin"],
});

const fontScript = Great_Vibes({
  weight: "400",
  variable: "--font-script-loaded",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "The Wedding of Ricky & Fellycia by Invitato",
    template: "%s | Ricky & Fellycia",
  },
  description:
    "Menjadi sebuah kebahagiaan bagi kami untuk mengumumkan awal dari babak baru. Kami mengundang Bapak/Ibu/Saudara/i untuk hadir di pernikahan kami.",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName: "The Wedding of Ricky & Fellycia by Invitato",
    title: "The Wedding of Ricky & Fellycia by Invitato",
    description:
      "Menjadi sebuah kebahagiaan bagi kami untuk mengumumkan awal dari babak baru. Kami mengundang Bapak/Ibu/Saudara/i untuk hadir di pernikahan kami.",
    images: [
      {
        url: "/assets/cover-portrait.png",
        width: 1080,
        height: 1920,
        alt: "Ricky & Fellycia Cover",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Wedding of Ricky & Fellycia by Invitato",
    description:
      "Menjadi sebuah kebahagiaan bagi kami untuk mengumumkan awal dari babak baru.",
    images: ["/assets/cover-portrait.png"],
  },
  authors: [{ name: "Invitato" }],
  keywords: ["wedding", "invitation", "ricky fellycia", "invitato"],
};

export const viewport: Viewport = {
  themeColor: "#D5DADE",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${fontHeading.variable} ${fontBody.variable} ${fontScript.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(weddingEventSchema),
          }}
        />
        {children}
      </body>
    </html>
  );
}
