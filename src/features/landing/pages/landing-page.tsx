import type { Metadata } from "next";
import { LandingView } from "../components/landing-view";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

function resolveGuestName(params: {
  [key: string]: string | string[] | undefined;
}): string {
  if (params.to) return String(params.to);
  if (params.guest) return String(params.guest);
  if (params.code) {
    // When code is provided like D3EC9693640 in Invitato template, default guest display is "Invitato"
    return "Invitato";
  }
  return "Invitato";
}

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const guestName = resolveGuestName(resolvedParams);

  return {
    title: `The Wedding of Ricky & Fellycia ${guestName ? `- Undangan untuk ${guestName}` : ""}`,
    description: `Yth. ${guestName || "Bapak/Ibu/Saudara/i"}, dengan segala kerendahan hati, mewakili keluarga pengantin, kami ingin menyampaikan undangan pernikahan Ricky & Fellycia.`,
    openGraph: {
      title: `The Wedding of Ricky & Fellycia - Undangan untuk ${guestName}`,
      description: `Yth. ${guestName || "Bapak/Ibu/Saudara/i"}, dengan segala kerendahan hati, mewakili keluarga pengantin, kami ingin menyampaikan undangan pernikahan Ricky & Fellycia.`,
    },
  };
}

export default async function LandingPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const guestName = resolveGuestName(resolvedParams);

  return <LandingView guestName={guestName} />;
}
