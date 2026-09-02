import Image from "next/image";
import { useInvitation } from "../i18n/invitation-provider";
import { wedding } from "../lib/wedding-data";
import { EntranceQrCode } from "./entrance-qr-code";
import { Reveal } from "./reveal";
import { templateButtonClass } from "./template-button";

const labelClass =
  "font-body text-[17px] leading-[25.5px] font-bold text-text-muted";
const timeClass =
  "font-body text-[32px] leading-[48px] font-medium text-text-main";
const venueClass =
  "font-body text-[19px] leading-[28.5px] font-bold text-text-main";
const addressClass =
  "font-body text-[19px] leading-[28.5px] font-medium text-text-main";

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

export function SectionEvent() {
  const { t, guestName } = useInvitation();
  const card = wedding.accessCard;
  const guest = guestName || t.guestFallback;
  const downloadHref = `${card.downloadBase}?to=${encodeURIComponent(guest)}&code=${card.code}`;

  return (
    <section
      id="wedding-details"
      className="bg-bg-primary flex flex-col items-center pb-16 text-center"
    >
      <Reveal className="flex w-[85%] flex-col items-center text-center">
        <p className="font-body text-body text-text-main mt-[46px] w-full leading-[28.5px] font-medium">
          {t.event.intro}
        </p>

        <p className={`${labelClass} mt-[120px] w-full font-medium`}>
          {t.event.dateLabel}
        </p>
        <p className="font-body text-text-main w-full text-[33px] leading-[49.5px] font-bold">
          {t.event.dateDay}
          <br />
          {t.weddingDate.slice(t.event.dateDay.length).trim()}
        </p>

        <div className="bg-text-main/60 mx-auto mt-10 h-8 w-px" aria-hidden />

        <Image
          src="/assets/ring.svg"
          alt=""
          width={40}
          height={40}
          aria-hidden
          className="mx-auto mt-6 h-10 w-10"
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

      <Reveal className="mt-[90px] flex w-[335px] max-w-[92vw] flex-col overflow-hidden rounded-[16px] bg-white shadow-xl">
        <div className="relative h-[225px] w-full">
          <Image
            src={card.cover}
            alt="Entrance Access Card Header"
            fill
            sizes="335px"
            className="object-cover"
            priority
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 p-5 text-left text-white">
            <p className="font-micro text-[11px] leading-[15px] font-bold tracking-[1.5px] uppercase">
              {t.event.cardTitle}
            </p>
            <p className="font-micro mt-2 text-[22px] leading-[26px] font-bold">
              {`${wedding.groom.short} & ${wedding.bride.short}`}
            </p>
            <p className="font-micro mt-1 text-[13px] leading-[18px] font-medium text-white/95">
              {wedding.events.resepsi.venue}
            </p>
            <p className="font-micro text-[13px] leading-[18px] font-medium text-white/95 italic">
              {t.weddingDate}
            </p>
          </div>
        </div>

        <div className="flex flex-col bg-white px-5 pt-5 pb-4">
          <div className="flex items-center gap-4">
            <div className="flex size-[124px] shrink-0 items-center justify-center rounded-[18px] border-2 border-neutral-900 bg-white p-2.5 shadow-xs">
              <EntranceQrCode value={downloadHref} />
            </div>

            <div className="flex flex-1 flex-col justify-center text-left">
              <p className="font-micro text-[11px] leading-[15px] font-normal text-neutral-600">
                {t.event.cardSalutation}
              </p>
              <p className="font-micro mt-0.5 text-[18px] leading-[22px] font-bold text-neutral-950">
                {guest}
              </p>
              <p className="font-micro mt-2.5 text-[11px] leading-[15px] font-normal text-neutral-600">
                {t.event.cardInformation}
              </p>
              <p className="font-micro text-[14px] leading-[18px] font-bold text-neutral-950">
                {card.information}
              </p>
              <p className="font-micro mt-0.5 text-[13px] leading-[18px] font-bold text-neutral-950">
                {t.event.cardValidFor}{" "}
                <span className="text-[#9D3E5B]">{`(${card.seats})`}</span>{" "}
                {t.event.cardPersons}
              </p>
            </div>
          </div>

          <p className="font-micro mt-4 text-center text-[11.5px] leading-[16px] text-neutral-600 italic">
            {t.event.cardShowQr}
          </p>
        </div>

        <div className="flex h-[48px] w-full items-center justify-center bg-[#63686D]">
          <Image
            src={card.logo}
            alt="Invitato"
            width={85}
            height={28}
            className="h-6 w-auto object-contain brightness-100"
          />
        </div>
      </Reveal>

      <Reveal className="flex w-[85%] flex-col items-center text-center">
        <p className="font-body text-text-main mt-7 w-full max-w-[340px] text-[17px] leading-[25.5px] font-medium">
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

        <p className="font-body text-text-main w-full pt-3 text-[17px] leading-[25.5px] font-bold">
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
