import type { Metadata } from "next";
import { Invitation } from "@/features/landing/components/invitation";
import { resolveLang } from "@/features/landing/i18n/dictionary";
import { InvitationProvider } from "@/features/landing/i18n/invitation-provider";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const guestName =
    typeof resolvedParams.to === "string" && resolvedParams.to
      ? resolvedParams.to
      : resolvedParams.code
        ? "Invitato"
        : "";

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

export default async function LandingPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const guestName =
    typeof resolvedParams.to === "string" && resolvedParams.to
      ? resolvedParams.to
      : resolvedParams.code
        ? "Invitato"
        : "";
  const lang = resolveLang(resolvedParams.lang);

  return (
    <InvitationProvider initialLang={lang} guestName={guestName}>
      <Invitation />
    </InvitationProvider>
  );
}
