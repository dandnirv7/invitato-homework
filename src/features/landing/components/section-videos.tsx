import { useInvitation } from "../i18n/invitation-provider";
import { wedding } from "../lib/wedding-data";
import { Reveal } from "./reveal";
import { templateButtonClass } from "./template-button";

function VideoBlock({
  id,
  title,
  videoId,
  href,
  className,
}: {
  id: string;
  title: string;
  videoId: string;
  href: string;
  className?: string;
}) {
  const { t } = useInvitation();

  return (
    <Reveal
      className={`flex w-[80%] max-w-[400px] flex-col items-center text-center ${className ?? ""}`}
    >
      <h2
        id={`${id}-title`}
        className="w-full font-heading text-h1 leading-[32px] text-text-muted uppercase"
      >
        {title}
      </h2>

      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="mt-8 aspect-video w-full rounded-[8px] border-0 bg-black"
      />

      <p className="mt-4 w-full px-3 pt-2 font-body text-body leading-[28.5px] font-medium text-text-main">
        {t.videos.fallback}
      </p>

      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className={`${templateButtonClass} mt-4`}
      >
        {t.videos.openYoutube}
      </a>
    </Reveal>
  );
}

/**
 * Section 7. Measured on the live reference: h 1020 desktop / 978 mobile,
 * bg #D5DADE, padding 32px 0 64px. Two identical blocks of
 * title -> 400x225 iframe (radius 8) -> fallback copy -> CTA, 56px apart.
 */
export function SectionVideos() {
  const { t } = useInvitation();

  return (
    <section className="flex flex-col items-center bg-bg-primary pt-8 pb-20">
      <VideoBlock
        id="pre-wedding"
        title={t.videos.prewedding}
        videoId={wedding.videos.preweddingId}
        href={wedding.videos.prewedding}
        className="mt-4"
      />
      <VideoBlock
        id="live-streaming"
        title={t.videos.liveStreaming}
        videoId={wedding.videos.liveId}
        href={wedding.videos.live}
        className="mt-[56px]"
      />
    </section>
  );
}
