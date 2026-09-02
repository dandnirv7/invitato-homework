"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Music2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const INVITATION_OPENED_EVENT = "invitation-opened";

export function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleOpen = () => play();
    window.addEventListener(INVITATION_OPENED_EVENT, handleOpen);

    return () => {
      window.removeEventListener(INVITATION_OPENED_EVENT, handleOpen);
    };
  }, [play]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      play();
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/assets/bg-sound.mp3"
        loop
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onCanPlay={() => setIsAvailable(true)}
        onError={() => setIsAvailable(false)}
      />
      {isAvailable && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={toggle}
          aria-label={isPlaying ? "Matikan musik" : "Putar musik"}
          className="bg-bg-alt text-text-main hover:bg-bg-alt/90 focus-visible:ring-text-main fixed bottom-5 left-[4.75rem] z-40 flex size-11 items-center justify-center rounded-full shadow-md transition-transform duration-500 ease-out hover:scale-105 focus-visible:ring-2 focus-visible:ring-offset-2 lg:left-[5rem]"
        >
          <span
            className={cn(
              "flex",
              isPlaying &&
                "animate-[spin_8s_linear_infinite] motion-reduce:animate-none",
            )}
          >
            {isPlaying ? (
              <Music2 className="size-5" />
            ) : (
              <VolumeX className="size-5" />
            )}
          </span>
          <span className="sr-only">
            {isPlaying ? "Musik sedang diputar" : "Musik dijeda"}
          </span>
        </Button>
      )}
    </>
  );
}
