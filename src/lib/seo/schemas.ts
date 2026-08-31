const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const weddingEventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "The Wedding of Ricky & Fellycia",
  description:
    "We invite you to celebrate our special wedding day. Explore our story, schedule, RSVP, and share your warm wishes.",
  startDate: "2026-12-12T09:00:00+07:00",
  endDate: "2026-12-12T21:00:00+07:00",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "Grand Ballroom Hotel Mulia",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jl. Asia Afrika, Gelora, Tanah Abang",
      addressLocality: "Jakarta Pusat",
      addressRegion: "DKI Jakarta",
      postalCode: "10270",
      addressCountry: "ID",
    },
  },
  image: [`${BASE_URL}/assets/cover-portrait.png`],
  organizer: {
    "@type": "Person",
    name: "Ricky & Fellycia",
    url: BASE_URL,
  },
};
