"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { dictionary, type Dictionary, type Lang } from "./dictionary";

type InvitationValue = {
  lang: Lang;
  t: Dictionary;
  setLang: (next: Lang) => void;
  guestName: string;
  opened: boolean;
  open: () => void;
  playing: boolean;
  toggleMusic: () => void;
  audioRef: RefObject<HTMLAudioElement | null>;
};

const InvitationContext = createContext<InvitationValue | null>(null);

type Props = {
  initialLang: Lang;
  guestName: string;
  children: ReactNode;
};

export function InvitationProvider({ initialLang, guestName, children }: Props) {
  const [lang, setLangState] = useState<Lang>(initialLang);
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // The reference rewrites ?lang= through the History API with no reload and keeps
  // no language key in localStorage, so the server-rendered default stays authoritative
  // on a fresh load.
  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", next);
    window.history.replaceState(null, "", url.toString());
  }, []);

  const startAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    // Rejects only when the browser blocks playback; the call sits inside the
    // cover's click handler, so a gesture is always present.
    audio.play().catch(() => setPlaying(false));
  }, []);

  const open = useCallback(() => {
    setOpened(true);
    startAudio();
  }, [startAudio]);

  const toggleMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) startAudio();
    else audio.pause();
  }, [startAudio]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const sync = () => setPlaying(!audio.paused);
    audio.addEventListener("play", sync);
    audio.addEventListener("pause", sync);
    return () => {
      audio.removeEventListener("play", sync);
      audio.removeEventListener("pause", sync);
    };
  }, []);

  const value = useMemo<InvitationValue>(
    () => ({
      lang,
      t: dictionary[lang],
      setLang,
      guestName,
      opened,
      open,
      playing,
      toggleMusic,
      audioRef,
    }),
    [lang, setLang, guestName, opened, open, playing, toggleMusic],
  );

  return (
    <InvitationContext.Provider value={value}>
      <audio ref={audioRef} src="/assets/bg-sound.mp3" loop preload="none" />
      {children}
    </InvitationContext.Provider>
  );
}

export function useInvitation(): InvitationValue {
  const ctx = useContext(InvitationContext);
  if (!ctx) {
    throw new Error("useInvitation must be used inside an InvitationProvider");
  }
  return ctx;
}
