"use client";

import { useState } from "react";
import { useInvitation } from "../i18n/invitation-provider";
import { CoverGate } from "./cover-gate";
import { FloatingControls } from "./floating-controls";
import { InvitationShell } from "./invitation-shell";
import { LanguageSwitcher } from "./language-switcher";
import { SectionCountdown } from "./section-countdown";
import { SectionCouple } from "./section-couple";
import { SectionEvent } from "./section-event";
import { SectionFooter } from "./section-footer";
import { SectionGallery } from "./section-gallery";
import { SectionGift } from "./section-gift";
import { SectionGreeting } from "./section-greeting";
import { SectionLoveStory } from "./section-love-story";
import { SectionRsvp } from "./section-rsvp";
import { SectionVideos } from "./section-videos";
import { SectionWishes } from "./section-wishes";

export function Invitation() {
  const { opened } = useInvitation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      
      <LanguageSwitcher />
      {opened ? (
        <FloatingControls menuOpen={menuOpen} onMenuOpenChange={setMenuOpen} />
      ) : null}
<InvitationShell>
        {opened ? (
          <>
            <SectionGreeting />
            <SectionCouple />
            <SectionLoveStory />
            <SectionCountdown />
            <SectionEvent />
            <SectionRsvp />
            <SectionGallery />
            <SectionVideos />
            <SectionGift />
            <SectionWishes />
            <SectionFooter />
          </>
        ) : (
          <CoverGate />
        )}
      </InvitationShell>
    </>
  );
}
