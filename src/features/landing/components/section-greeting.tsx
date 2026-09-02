import Image from "next/image";
import { useInvitation } from "../i18n/invitation-provider";
import { Reveal } from "./reveal";

export function SectionGreeting() {
  const { t, guestName } = useInvitation();

  return (
    <section
      id="greeting"
      className="bg-bg-primary h-[889px] pt-[54px] md:h-[900px]"
    >
      <Reveal className="flex h-full flex-col items-center px-6 text-center">
        <p className="font-body text-body text-text-main w-full leading-[28.5px] font-medium">
          {`${t.salutation},`}
        </p>
        <p className="font-body text-body text-text-main w-full leading-[28.5px] font-medium">
          {guestName || t.guestFallback}
        </p>

        <div className="mt-2 flex items-center">
          <span className="font-heading text-h2 text-text-muted leading-[30px] uppercase">
            {t.groomShort}
          </span>
          <span className="font-script text-and text-text-muted mr-[20px] ml-[14px] leading-[87.78px] font-light md:leading-[79.2px]">
            and
          </span>
          <span className="font-heading text-h2 text-text-muted leading-[30px] uppercase">
            {t.brideShort}
          </span>
        </div>

        <p className="font-body text-body text-text-main mt-2 w-full max-w-[290px] leading-[28.5px] font-medium md:max-w-[384px]">
          &ldquo;{t.verse}&rdquo;
        </p>

        <p className="font-body text-body text-text-main mt-5 w-full max-w-[290px] leading-[28.5px] font-bold uppercase md:max-w-[384px]">
          &mdash; {t.verseSource}
        </p>

        <div className="relative mt-[41px] flex w-full justify-center">
          <div className="pointer-events-none absolute -inset-x-6 top-12 bottom-0 z-0 opacity-70">
            <Image
              src="/assets/welcoming-background.jpg"
              alt=""
              fill
              className="object-cover object-center"
              aria-hidden
            />
          </div>

          <div className="relative z-10 h-[420px] w-[273px] md:h-[495px] md:w-[330px]">
            <Image
              src="/assets/welcoming-portrait.jpg"
              alt="Ricky and Fellycia"
              fill
              priority
              sizes="330px"
              className="object-cover"
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
