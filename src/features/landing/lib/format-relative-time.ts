export function formatRelativeTime(iso: string): string {
  const date = new Date(iso);
  const diffMs = date.getTime() - Date.now();

  const minute = 60_000;
  const hour = 3_600_000;
  const day = 86_400_000;

  if (diffMs > -minute) {
    return "baru saja";
  }

  const rtf = new Intl.RelativeTimeFormat("id", { numeric: "always" });

  if (diffMs > -hour) {
    return rtf.format(Math.round(diffMs / minute), "minute");
  }

  if (diffMs > -day) {
    return rtf.format(Math.round(diffMs / hour), "hour");
  }

  if (diffMs > -7 * day) {
    return rtf.format(Math.round(diffMs / day), "day");
  }

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
