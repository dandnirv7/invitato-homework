import Image from "next/image";
import { useInvitation } from "../i18n/invitation-provider";
import { Reveal } from "./reveal";
import { templateButtonClass } from "./template-button";

export function SectionLoveStory() {
  const { t } = useInvitation();

  return (
    <section id="love-story" className="relative h-[345px] overflow-hidden">
      <div
        className="bg-brand pointer-events-none absolute top-[40%] -left-4 h-16 w-8 -translate-y-1/2 rounded-r-full"
        aria-hidden
      />
      <div
        className="bg-brand pointer-events-none absolute top-[40%] -right-4 h-16 w-8 -translate-y-1/2 rounded-l-full"
        aria-hidden
      />

      <Reveal className="flex h-full flex-col items-center px-8 text-center">
        <h2 className="font-heading text-h1 text-text-muted mt-[82px] w-full leading-[32px] uppercase">
          {t.loveStory.title}
        </h2>

        <p className="font-body text-body text-text-main mt-4 mb-4 w-full leading-[28.5px] font-medium">
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
