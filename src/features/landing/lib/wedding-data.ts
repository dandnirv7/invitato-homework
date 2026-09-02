/**
 * Language-invariant wedding data, transcribed from the reference template
 * (scrape/data.json, confirmed against the live DOM in
 * scrape/live/audit/sections-deep.json and reference-copy.json).
 */
export const wedding = {
  groom: {
    full: "Ricky Ravanelli, S.E.",
    short: "Ricky",
    ig: "groomricky",
    photo: "/assets/groom-portrait.jpg",
  },
  bride: {
    full: "Fellycia Indriyani Pratama, S.I.Kom.",
    short: "Fellycia",
    ig: "bridefelly",
    photo: "/assets/bride-portrait.jpg",
  },

  // The honourific is language-dependent ("Mr."/"Mrs." vs "Bapak"/"Ibu") and
  // lives in the dictionary; only the names are stored here.
  parents: { father: "Parent Man", mother: "Parent Lady" },

  hashtag: "#RickyFellinlove",

  // The reference counts down to this epoch (≈2026-12-24) even though its printed
  // date text still reads 2024. Both are reproduced as-is so the numbers match.
  akadEpoch: 1798160400,
  receptionEpoch: 1798167600,

  date: {
    en: "Thursday, 26 December 2024",
    id: "Kamis, 26 Desember 2024",
  },

  events: {
    akad: {
      time: "11.00 WIB",
      venue: "GBT Kristus Alfa Omega Puri Anjasmoro",
      address: "Jalan Puri Anjasmoro No 10 Blok J1, Semarang",
      maps: "",
    },
    resepsi: {
      time: "18.00 WIB",
      venue: "MAC Ballroom",
      address:
        "Jalan Majapahit No 168, Gayamsari, Kec. Gayamsari, Kota Semarang",
      maps: "https://maps.app.goo.gl/ujwonyWq93rBS6CX9",
    },
  },

  /**
   * Section 4's entrance card. `logo` is Invitato's wordmark (`qrinvitato-*.png`),
   * NOT a QR code — the reference renders no QR element at all, matching its own
   * footnote about the Digital Guestbook package.
   */
  accessCard: {
    cover: "/assets/qr-cover.jpg",
    logo: "/assets/qr-code.png",
    information: "Vendor",
    seats: 5,
    // This project has no e-ticket route; the reference's own endpoint is used so
    // the button resolves instead of 404ing. See docs/CLONE-AUDIT.md deviations.
    downloadBase: "https://invitato.net/template-rickyfelly/e-ticket/",
    code: "D3EC9693640",
  },

  gift: {
    banks: [
      { name: "Bank BCA", account: "11223344", holder: "Ricky Ravanelli, S.E." },
      {
        name: "Bank BRI",
        account: "44332211",
        holder: "Fellycia Indriyani Pratama, S.I.Kom.",
      },
    ],
    address: "Jl. Gatot Subroto, No.1, Daerah Khusus Ibukota Jakarta",
  },

  videos: {
    prewedding: "https://www.youtube.com/watch?v=dt25SFw8H4Y",
    preweddingId: "dt25SFw8H4Y",
    live: "https://www.youtube.com/watch?v=y3MLiFHAf4w",
    liveId: "y3MLiFHAf4w",
  },

  /** Countdown-section backdrop. */
  gallery: [
    "/assets/gallery-main.jpg",
    "/assets/gallery-1.jpg",
    "/assets/gallery-2.jpg",
    "/assets/gallery-3.jpg",
    "/assets/gallery-4.jpg",
    "/assets/gallery-5.jpg",
  ],

  /** Section 6 carousel: one main slide plus five thumbnails, as on the reference. */
  portraits: [
    "/assets/gallery-1.jpg",
    "/assets/gallery-2.jpg",
    "/assets/gallery-3.jpg",
    "/assets/gallery-4.jpg",
    "/assets/gallery-5.jpg",
  ],

  footer: {
    photo: "/assets/footer-portrait.jpg",
    logo: "/assets/qr-code.png",
    curve: "/assets/curve.svg",
    creditUrl: "https://invitato.id",
    songUrl: "https://youtu.be/tfg_jftGPYc?si=KxpCzz8vz8AhNsuz",
  },

  /** Option list of the reference's country-code `<select>`, in its own order. */
  countryCodes: [
    { name: "Australia", code: "61" },
    { name: "Brunei Darussalam", code: "673" },
    { name: "Cambodia", code: "855" },
    { name: "Canada", code: "1" },
    { name: "China", code: "86" },
    { name: "Croatia", code: "385" },
    { name: "Denmark", code: "45" },
    { name: "Egypt", code: "20" },
    { name: "Finland", code: "358" },
    { name: "France", code: "33" },
    { name: "Germany", code: "49" },
    { name: "Hong Kong", code: "852" },
    { name: "Hungary", code: "36" },
    { name: "India", code: "91" },
    { name: "Indonesia", code: "62" },
    { name: "Ireland", code: "353" },
    { name: "Italy", code: "39" },
    { name: "Japan", code: "81" },
    { name: "Kazakhstan", code: "77" },
    { name: "Korea, South Korea", code: "82" },
    { name: "Kuwait", code: "965" },
    { name: "Laos", code: "856" },
    { name: "Luxembourg", code: "352" },
    { name: "Malaysia", code: "60" },
    { name: "Myanmar", code: "95" },
    { name: "Netherlands", code: "31" },
    { name: "New Zealand", code: "64" },
    { name: "Norway", code: "47" },
    { name: "Philippines", code: "63" },
    { name: "Poland", code: "48" },
    { name: "Qatar", code: "974" },
    { name: "Russia", code: "7" },
    { name: "Saudi Arabia", code: "966" },
    { name: "Singapore", code: "65" },
    { name: "Sweden", code: "46" },
    { name: "Switzerland", code: "41" },
    { name: "Taiwan", code: "886" },
    { name: "Thailand", code: "66" },
    { name: "Turkey", code: "90" },
    { name: "Ukraine", code: "380" },
    { name: "United Arab Emirates", code: "971" },
    { name: "United Kingdom", code: "44" },
    { name: "United States", code: "1" },
    { name: "Vietnam", code: "84" },
  ],
} as const;
