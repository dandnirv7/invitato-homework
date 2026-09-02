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
        className="font-heading text-h1 text-text-muted w-full leading-[32px] uppercase"
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

      <p className="font-body text-body text-text-main mt-4 w-full px-3 pt-2 leading-[28.5px] font-medium">
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

export function SectionVideos() {
  const { t } = useInvitation();

  return (
    <section className="bg-bg-primary flex flex-col items-center pt-8 pb-20">
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
