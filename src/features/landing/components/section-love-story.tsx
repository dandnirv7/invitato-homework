import Image from "next/image";
import { useInvitation } from "../i18n/invitation-provider";
import { Reveal } from "./reveal";
import { templateButtonClass } from "./template-button";

/**
 * Section 2. Height is 345px at BOTH viewports on the reference; only the text block
 * width changes (436px desktop / 326px mobile = column minus 32px each side), so the
 * text elements are full width with centered content rather than shrink-wrapped.
 *   title  y=106  Marcellus 32px/400 lh32 #737373 UPPERCASE
 *   body   y=154  Cormorant 19px/500 lh28.5 #2C3F4E, margin 16px 0
 *   button y=235  h32, 18px/500 #FEFEFE on #2C3F4E, radius 5px, margin-top 8px
 */
export function SectionLoveStory() {
  const { t } = useInvitation();

  return (
    <section id="love-story" className="relative h-[345px]">
      <Reveal className="flex h-full flex-col items-center px-8 text-center">
        <h2 className="mt-[82px] w-full font-heading text-h1 leading-[32px] text-text-muted uppercase">
          {t.loveStory.title}
        </h2>

        {/* The reference carries an explicit line break here in both languages, giving a
            two-line block (measured h=57 = 2 x 28.5) that places the button at y=235. */}
        <p className="mt-4 mb-4 w-full font-body text-body leading-[28.5px] font-medium text-text-main">
          {t.loveStory.bodyTop}
          <br />
          {t.loveStory.bodyBottom}
        </p>

        <button type="button" className={`${templateButtonClass} mt-2`}>
          {t.loveStory.cta}
        </button>
      </Reveal>
      <Image
        src="/assets/love-story-ornament.svg"
        alt=""
        width={24}
        height={24}
        aria-hidden
        className="pointer-events-none absolute bottom-7 left-1/2 h-6 w-6 -translate-x-1/2"
      />
    </section>
  );
}
