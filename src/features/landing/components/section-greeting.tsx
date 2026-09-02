import Image from "next/image";
import { useInvitation } from "../i18n/invitation-provider";
import { Reveal } from "./reveal";

/**
 * Section 0 post-open. Offsets measured from the live reference
 * (scrape/live/audit/section0-probe.json), desktop 1440 / mobile 390:
 *   salutation      y=54.0   19px/500 lh28.5 #2C3F4E, trailing comma
 *   guest name      y=82.5   (no gap)
 *   names row       y=119.0  Marcellus 30px #737373 uppercase, inline;
 *                            "and" = Boheme Floral 66px/300 ml14 mr20,
 *                            lh 87.78px mobile / 79.2px desktop
 *   verse           y=206.2  w=384 desktop / 290 mobile, 19px/500 lh28.5
 *   verse source    y=311.7  margin-top 20px, 19px/700 UPPERCASE, "— " prefix
 *   portrait        y=381.0  330x495 desktop / 273x420 mobile
 *   section height  900 desktop / 889 mobile
 */
export function SectionGreeting() {
  const { t, guestName } = useInvitation();

  return (
    <section
      id="greeting"
      className="h-[889px] bg-bg-primary pt-[54px] md:h-[900px]"
    >
      <Reveal className="flex h-full flex-col items-center px-6 text-center">
        <p className="w-full font-body text-body leading-[28.5px] font-medium text-text-main">
          {`${t.salutation},`}
        </p>
        <p className="w-full font-body text-body leading-[28.5px] font-medium text-text-main">
          {guestName || t.guestFallback}
        </p>

        <div className="mt-2 flex items-center">
          <span className="font-heading text-h2 leading-[30px] text-text-muted uppercase">
            {t.groomShort}
          </span>
          <span className="ml-[14px] mr-[20px] font-script text-and leading-[87.78px] font-light text-text-muted md:leading-[79.2px]">
            and
          </span>
          <span className="font-heading text-h2 leading-[30px] text-text-muted uppercase">
            {t.brideShort}
          </span>
        </div>

        <p className="mt-2 w-full max-w-[290px] font-body text-body leading-[28.5px] font-medium text-text-main md:max-w-[384px]">
          &ldquo;{t.verse}&rdquo;
        </p>

        <p className="mt-5 w-full max-w-[290px] font-body text-body leading-[28.5px] font-bold text-text-main uppercase md:max-w-[384px]">
          &mdash; {t.verseSource}
        </p>

        <div className="relative mt-[41px] h-[420px] w-[273px] md:h-[495px] md:w-[330px]">
          <Image
            src="/assets/welcoming-portrait.jpg"
            alt="Ricky and Fellycia"
            fill
            priority
            sizes="330px"
            className="object-cover"
          />
        </div>
      </Reveal>
    </section>
  );
}
