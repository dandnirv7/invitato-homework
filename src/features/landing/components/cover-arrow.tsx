import { ChevronDown } from "lucide-react";

type Props = {
  onClick: () => void;
  label: string;
};

/**
 * The reference has no labelled "open invitation" button — the bouncing scroll arrow
 * IS the call to action. Measured ~32x48px, horizontally centered, about 200px above
 * the bottom edge (desktop x1174,y695 of 1440x900; mobile x179,y653 of 390x844),
 * animated with `MoveUpDown 3s ease-in-out infinite`.
 */
export function CoverArrow({ onClick, label }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="absolute bottom-[200px] left-1/2 z-20 flex h-12 w-8 -translate-x-1/2 cursor-pointer items-center justify-center rounded-full border border-text-alt/70 text-text-alt transition-opacity duration-200 hover:opacity-70 animate-cover-arrow"
    >
      <ChevronDown className="size-5" strokeWidth={1.5} aria-hidden />
    </button>
  );
}
