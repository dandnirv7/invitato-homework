import Image from "next/image";
import { SectionReveal } from "./section-reveal";

export function FooterSection() {
  return (
    <section className="relative overflow-hidden">
      <Image
        src="/assets/footer-portrait.png"
        alt=""
        fill
        sizes="(max-width: 640px) 100vw, 448px"
        className="object-cover"
      />
      <div className="bg-bg-overlay/70 absolute inset-0" aria-hidden />
      <div className="text-text-alt relative flex flex-col items-center px-6 py-24 text-center">
        <SectionReveal>
          <p className="font-body mx-auto max-w-sm text-lg leading-relaxed">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
            Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada
            kedua mempelai.
          </p>
          <p className="font-heading mt-10 text-2xl">
            Ricky <span className="font-script">&amp;</span> Fellycia
          </p>
          <p className="font-body text-text-alt/70 mt-10 text-sm tracking-wide">
            Undangan digital ini dibuat dengan penuh cinta.
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
