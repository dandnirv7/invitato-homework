import type { Metadata } from "next";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const guestName = resolvedParams.to ? String(resolvedParams.to) : "";

  if (!guestName) {
    return {};
  }

  return {
    title: `Undangan untuk ${guestName}`,
    description: `Yth. ${guestName}, dengan segala kerendahan hati, mewakili keluarga pengantin, kami ingin menyampaikan undangan pernikahan Ricky & Fellycia.`,
    openGraph: {
      title: `The Wedding of Ricky & Fellycia - Undangan untuk ${guestName}`,
      description: `Yth. ${guestName}, dengan segala kerendahan hati, mewakili keluarga pengantin, kami ingin menyampaikan undangan pernikahan Ricky & Fellycia.`,
    },
  };
}

export default async function LandingPage() {
  return (
    <main className="bg-bg-primary text-text-main flex min-h-screen flex-col items-center justify-center">
      <h1 className="font-heading text-4xl">The Wedding of Ricky & Fellycia</h1>
      <p className="font-body text-text-muted mt-4">Sedang dibangun...</p>
    </main>
  );
}
