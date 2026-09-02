import { Toaster } from "@/components/ui/sonner";
import { AccessPassSection } from "./access-pass-section";
import { AudioPlayer } from "./audio-player";
import { CountdownSection } from "./countdown-section";
import { CoupleSection } from "./couple-section";
import { CoverSection } from "./cover-section";
import { EventInfoSection } from "./event-info-section";
import { FooterSection } from "./footer-section";
import { GallerySection } from "./gallery-section";
import { GiftSection } from "./gift-section";
import { LocationSection } from "./location-section";
import { LoveStorySection } from "./love-story-section";
import { NavigationControls } from "./navigation-controls";
import { QuoteSection } from "./quote-section";
import { RsvpSection } from "./rsvp-section";
import { WishesSection } from "./wishes-section";
import { VideoSection } from "./video-section";

interface LandingViewProps {
  guestName?: string;
}

export function LandingView({ guestName = "Invitato" }: LandingViewProps) {
  return (
    <div className="bg-bg-primary relative min-h-screen overflow-x-clip">
      {/* Cover Screen Overlay */}
      <CoverSection guestName={guestName} />

      {/* Floating Audio Toggle & Menu Controls */}
      <AudioPlayer />
      <NavigationControls />

      {/* Main Right Scroll Container on Desktop (40vw), Full Width on Mobile */}
      <main className="bg-bg-primary relative min-h-screen w-full shadow-2xl lg:ml-[60vw] lg:w-[min(40vw,48rem)]">
        <QuoteSection guestName={guestName} />
        <CoupleSection />
        <LoveStorySection />
        <CountdownSection />
        <EventInfoSection />
        <AccessPassSection guestName={guestName} />
        <GallerySection />
        <VideoSection
          id="prewedding"
          title="Pre Wedding"
          embedUrl="https://www.youtube.com/embed/dt25SFw8H4Y"
          watchUrl="https://www.youtube.com/watch?v=dt25SFw8H4Y"
        />
        <VideoSection
          id="livestreaming"
          title="Live Streaming"
          embedUrl="https://www.youtube.com/embed/y3MLiFHAf4w"
          watchUrl="https://www.youtube.com/watch?v=y3MLiFHAf4w"
        />
        <RsvpSection guestName={guestName} />
        <GiftSection />
        <WishesSection guestName={guestName} />
        <LocationSection />
        <FooterSection />
      </main>

      <Toaster position="top-center" />
    </div>
  );
}
