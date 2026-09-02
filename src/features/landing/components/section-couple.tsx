import Image from "next/image";
import { useInvitation } from "../i18n/invitation-provider";
import { wedding } from "../lib/wedding-data";
import { Reveal } from "./reveal";
import { templateButtonClass } from "./template-button";

type Person = {
  full: string;
  ig: string;
  photo: string;
  relation: string;
};

export function SectionCouple() {
  const { t } = useInvitation();
  const { father, mother } = wedding.parents;
  const honorifics = t.couple.honorifics;

  const people: Person[] = [
    {
      full: wedding.groom.full,
      ig: wedding.groom.ig,
      photo: wedding.groom.photo,
      relation: t.couple.sonOf,
    },
    {
      full: wedding.bride.full,
      ig: wedding.bride.ig,
      photo: wedding.bride.photo,
      relation: t.couple.daughterOf,
    },
  ];

  return (
    <section id="groom-bride" className="bg-bg-primary pb-14">
      <Reveal className="flex flex-col items-center px-6 text-center">
        <h2 className="font-heading text-h3 text-text-muted mt-[46px] leading-[28px] uppercase">
          {t.couple.title}
        </h2>
      </Reveal>

      {people.map((person, index) => (
        <Reveal
          key={person.ig}
          className={`flex flex-col items-center text-center ${
            index === 0 ? "mt-[50px]" : "mt-[106px]"
          }`}
        >
          <div className="relative aspect-[15/11] w-[76%]">
            <div className="absolute inset-x-0 top-0 aspect-3/2 w-full">
              <Image
                src={person.photo}
                alt={person.full}
                fill
                sizes="(min-width: 768px) 380px, 76vw"
                className="object-cover"
              />
            </div>
            <div className="absolute top-[10%] left-[5%] aspect-3/2 w-full">
              <Image
                src={person.photo}
                alt=""
                fill
                sizes="(min-width: 768px) 380px, 76vw"
                className="object-cover"
              />
            </div>
          </div>

          <h3 className="font-heading text-h2 text-text-muted mt-[26px] w-[76%] leading-[39px] normal-case">
            {person.full}
          </h3>

          <p className="font-body text-body text-text-main mt-[14px] w-[76%] leading-[24.7px] font-medium">
            <span className="font-bold">{person.relation}</span>
            <br />
            {`${honorifics.father} ${father}`}
            <br />
            &amp;
            <br />
            {`${honorifics.mother} ${mother}`}
          </p>

          <a
            href={`https://www.instagram.com/${person.ig}`}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${t.a11y.instagram} @${person.ig}`}
            className={`${templateButtonClass} mt-6`}
          >
            {`@${person.ig}`}
          </a>

          <Image
            src="/assets/love-story-ornament.svg"
            alt=""
            width={24}
            height={24}
            aria-hidden
            className="pointer-events-none mt-6 h-6 w-6"
          />
        </Reveal>
      ))}
    </section>
  );
}
