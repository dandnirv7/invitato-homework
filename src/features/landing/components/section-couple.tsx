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

/**
 * Section 1. Measured on the live reference (sections-deep.json), desktop 1440 / mobile 390.
 * The per-person block carries NO horizontal padding on purpose: every `w-[76%]` below
 * must resolve against the 500px column (380px) / 390px viewport (296.4px), exactly as
 * the reference measures. Adding px-6 here makes 76% resolve against 452px instead and
 * shifts the whole block up by 26.8px.
 *   title   y=46    Marcellus 28px/400 lh28 #737373 UPPERCASE, letter-spacing 1px
 *   photos  y=124   3:2 at 76% wide, duplicate copy offset +5% x / +10% y
 *                   => stack aspect 15/11 (278.7px desktop / 217.4px mobile)
 *   name    +26px   Marcellus 30px/400 lh39 #737373, NOT uppercase, 76% wide
 *   parents +14px   Cormorant 19px lh24.7 #2C3F4E, 4 lines => 98.8px:
 *                   bold relation / parent / "&" / parent
 *   IG btn  +24px   h32, 18px/500 #FEFEFE on #2C3F4E, radius 5px
 *   next block +106px, section padding-bottom 56px
 */
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
        <h2 className="mt-[46px] font-heading text-h3 leading-[28px] text-text-muted uppercase">
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
          <div className="relative w-[76%] aspect-[15/11]">
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

          <h3 className="mt-[26px] w-[76%] font-heading text-h2 leading-[39px] text-text-muted normal-case">
            {person.full}
          </h3>

          <p className="mt-[14px] w-[76%] font-body text-body leading-[24.7px] font-medium text-text-main">
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
        </Reveal>
      ))}
    </section>
  );
}
