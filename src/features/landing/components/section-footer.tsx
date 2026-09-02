import Image from "next/image";
import { useInvitation } from "../i18n/invitation-provider";
import { wedding } from "../lib/wedding-data";
import { Reveal } from "./reveal";

const creditClass =
  "w-[452px] max-w-full font-body text-[14px] leading-[21px] font-medium text-text-alt";

/**
 * Section 10. Measured on the live reference: h 954.5 desktop / 904.1 mobile.
 * A 500 x 810 portrait sits at the top of the section, `curve.svg` (500 x 331.8)
 * overlays it from y=587.5 and carries the light-on-dark credit block below it:
 * wordmark 140 x 45.5 at y=822, then three 14px Cormorant lines.
 */
export function SectionFooter() {
  const { t } = useInvitation();

  return (
    <footer className="relative flex flex-col items-center overflow-hidden text-center">
      <div className="absolute inset-x-0 top-0 h-[810px]">
        <Image
          src={wedding.footer.photo}
          alt=""
          fill
          sizes="(min-width: 768px) 500px, 100vw"
          className="object-cover object-top"
        />
      </div>

      <Image
        src={wedding.footer.curve}
        alt=""
        width={500}
        height={331.8}
        aria-hidden
        className="pointer-events-none absolute top-[587.5px] left-1/2 h-auto w-[500px] max-w-full -translate-x-1/2"
      />

      <Reveal className="relative z-10 flex w-full flex-col items-center text-center">
        <p className="mt-8 w-full pt-[50px] pb-[25px] font-heading text-[24px] leading-[24px] text-text-alt uppercase">
          {t.footer.thankYou}
        </p>

        <p className="mt-2 flex flex-wrap items-start justify-center font-heading text-h2 leading-[39px] text-text-alt normal-case">
          {t.groomShort}
          <span className="mx-2 -mt-3 font-script text-[66px] leading-[79.2px] font-normal normal-case">
            and
          </span>
          {t.brideShort}
        </p>

        <p className="mt-2 w-full font-body text-[20px] leading-[24px] font-medium text-text-alt">
          {wedding.hashtag}
        </p>

        <a
          href={wedding.footer.creditUrl}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Invitato"
          className="mt-[572px] block"
        >
          <Image
            src={wedding.footer.logo}
            alt="Invitato"
            width={140}
            height={45.5}
            className="h-auto w-[140px]"
          />
        </a>

        <p className={creditClass}>{t.footer.credit}</p>
        <a
          href={wedding.footer.songUrl}
          target="_blank"
          rel="noreferrer noopener"
          className={`${creditClass} mt-3 transition-opacity duration-200 hover:opacity-75`}
        >
          {t.footer.song}
        </a>
        <p className={creditClass}>{t.footer.copyright}</p>
      </Reveal>
    </footer>
  );
}
