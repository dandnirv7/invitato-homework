import { ArrowDown } from "lucide-react";

type Props = {
  onClick: () => void;
  label: string;
};
export function CoverArrow({ onClick, label }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="border-text-alt/70 text-text-alt animate-cover-arrow absolute bottom-[200px] left-1/2 z-20 flex h-12 w-8 -translate-x-1/2 cursor-pointer items-center justify-center rounded-full border transition-opacity duration-200 hover:opacity-70"
    >
      <ArrowDown className="size-4" strokeWidth={1.5} aria-hidden />
    </button>
  );
}
