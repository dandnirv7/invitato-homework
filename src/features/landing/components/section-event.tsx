import Image from "next/image";
import { useInvitation } from "../i18n/invitation-provider";
import { wedding } from "../lib/wedding-data";
import { Reveal } from "./reveal";
import { templateButtonClass } from "./template-button";

const labelClass =
  "font-body text-[17px] leading-[25.5px] font-bold text-text-muted";
const timeClass =
  "font-body text-[32px] leading-[48px] font-medium text-text-main";
const venueClass =
  "font-body text-[19px] leading-[28.5px] font-bold text-text-main";
const addressClass = "font-body text-[19px] leading-[28.5px] font-medium text-text-main";

function EventBlock({
  label,
  time,
  venue,
  address,
  className,
}: {
  label: string;
  time: string;
  venue: string;
  address: string;
  className?: string;
}) {
  return (
    <div className={`w-full text-center ${className ?? ""}`}>
      <p className={labelClass}>{label}</p>
      <p className={`${timeClass} mb-4`}>{time}</p>
      <p className={`${venueClass} mb-1`}>{venue}</p>
      <p className={addressClass}>{address}</p>
    </div>
  );
}

/**
 * Section 4. Measured on the live reference (docs/CLONE-AUDIT-S4-S10.md):
 * h 1919.6 desktop / 1999.1 mobile, text column 425px (85% of the 500px column).
 * The two large element-free gaps (176px after the date block, 203px between the
 * two events) contain no element at all on the reference and are reproduced as
 * plain vertical spacing.
 *
 * The ticket renders Invitato's wordmark (`qr-code.png`), not a QR code: the
 * reference has no QR element anywhere in this section, which is what its own
 * footnote says.
 */
export function SectionEvent() {
  const { t, guestName } = useInvitation();
  const card = wedding.accessCard;
  const guest = guestName || t.guestFallback;
  const downloadHref = `${card.downloadBase}?to=${encodeURIComponent(guest)}&code=${card.code}`;

  return (
    <section
      id="wedding-details"
      className="flex flex-col items-center bg-bg-primary pb-16 text-center"
    >
      <Reveal className="flex w-[85%] flex-col items-center text-center">
        <p className="mt-[46px] w-full font-body text-body leading-[28.5px] font-medium text-text-main">
          {t.event.intro}
        </p>

        <p className={`${labelClass} mt-[120px] w-full font-medium`}>
          {t.event.dateLabel}
        </p>
        <p className="w-full font-body text-[33px] leading-[49.5px] font-bold text-text-main">
          {t.event.dateDay}
          <br />
          {t.weddingDate.slice(t.event.dateDay.length).trim()}
        </p>

        <Image
          src="/assets/wine.svg"
          alt=""
          width={40}
          height={40}
          aria-hidden
          className="mx-auto mt-[68px] h-10 w-10"
        />
        <EventBlock
          className="mt-[68px]"
          label={t.event.akadLabel}
          time={wedding.events.akad.time}
          venue={wedding.events.akad.venue}
          address={wedding.events.akad.address}
        />

        <Image
          src="/assets/love-story-ornament.svg"
          alt=""
          width={24}
          height={24}
          aria-hidden
          className="mx-auto mt-[89px] h-6 w-6"
        />
        <EventBlock
          className="mt-[90px]"
          label={t.event.receptionLabel}
          time={wedding.events.resepsi.time}
          venue={wedding.events.resepsi.venue}
          address={wedding.events.resepsi.address}
        />

        <a
          href={wedding.events.resepsi.maps}
          target="_blank"
          rel="noreferrer noopener"
          className={`${templateButtonClass} mt-8`}
        >
          {t.event.seeLocation}
        </a>
      </Reveal>

      <Reveal className="mt-[102px] flex w-[321.3px] flex-col overflow-hidden rounded-[8px] bg-bg-alt shadow-lg">
        <div className="relative h-[220px] w-full">
          <Image
            src={card.cover}
            alt=""
            fill
            sizes="322px"
            className="object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 px-4 pb-9 text-left">
            <p className="font-micro text-[10px] leading-[15px] font-bold tracking-wide text-white uppercase">
              {t.event.cardTitle}
            </p>
            <p className="mt-3 font-micro text-[16px] leading-[24px] font-bold text-white">
              {`${wedding.groom.short} & ${wedding.bride.short}`}
            </p>
            <p className="mt-px font-micro text-[10px] leading-[15px] font-medium text-white">
              {wedding.events.resepsi.venue}
            </p>
            <p className="mt-px font-micro text-[10px] leading-[15px] font-medium text-white">
              {t.weddingDate}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 px-4 pt-3 pb-5 text-right text-black">
          <Image
            src="/assets/qr-code.png"
            alt=""
            width={110}
            height={110}
            className="h-[110px] w-[110px] shrink-0"
          />
          <div className="flex flex-1 flex-col">
          <p className="font-micro text-[10px] leading-[15px] font-normal">
            {t.event.cardSalutation}
          </p>
          <p className="font-micro text-[14px] leading-[21px] font-bold">
            {guest}
          </p>
          <p className="mt-2 font-micro text-[10px] leading-[15px] font-normal">
            {t.event.cardInformation}
          </p>
          <p className="font-micro text-[12px] leading-[18px] font-bold">
            {card.information}
          </p>
          <p className="font-micro text-[12px] leading-[18px] font-bold">
            {t.event.cardValidFor}{" "}
            <span className="text-[#A1425C]">{`(${card.seats})`}</span>{" "}
            {t.event.cardPersons}
          </p>
          </div>
        </div>
      </Reveal>

      <Reveal className="flex w-[85%] flex-col items-center text-center">
        <p className="mt-4 w-[289.3px] font-micro text-[10px] leading-[15px] font-normal text-black">
          {t.event.cardShowQr}
        </p>

        <Image
          src={card.logo}
          alt="Invitato"
          width={85}
          height={27.6}
          className="mt-[18px] h-auto w-[85px]"
        />

        <p className="mt-7 w-full font-body text-[17px] leading-[25.5px] font-medium text-text-main">
          {t.event.downloadTop}{" "}
          <b className="font-bold">{t.event.downloadBold}</b>{" "}
          {t.event.downloadBottom}
        </p>

        <a
          href={downloadHref}
          target="_blank"
          rel="noreferrer noopener"
          className={`${templateButtonClass} mt-6 px-6 py-1.5`}
        >
          {t.event.downloadCta}
        </a>

        <p className="w-full pt-3 font-body text-[17px] leading-[25.5px] font-bold text-text-main">
          {t.event.qrNote}
        </p>
            <Image
        src="/assets/love-story-ornament.svg"
        alt=""
        width={24}
        height={24}
        aria-hidden
        className="pointer-events-none absolute bottom-2 left-1/2 h-6 w-6 -translate-x-1/2"
      />
</Reveal>
    </section>
  );
}
