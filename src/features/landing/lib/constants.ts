export const WEDDING_CONFIG = {
  groomName: "Ricky",
  groomFullName: "Ricky Ravanelli, S.E.",
  groomParents: "Putra dari Bapak Parent Man & Ibu Parent Lady",
  groomIg: "https://instagram.com/groomricky",
  groomIgHandle: "@groomricky",

  brideName: "Fellycia",
  brideFullName: "Fellycia Indriyani Pratama, S.I.Kom.",
  brideParents: "Putri dari Bapak Parent Man & Ibu Parent Lady",
  brideIg: "https://instagram.com/bridefelly",
  brideIgHandle: "@bridefelly",

  dateISO: "2026-12-26T11:00:00+07:00",
  dateDisplay: "Kamis, 26 Desember 2024",
  hashtag: "#RickyFellinlove",

  bibleVerseId: {
    quote:
      "Demikianlah mereka bukan lagi dua, melainkan satu. Karena itu, apa yang telah dipersatukan Allah, tidak boleh diceraikan manusia.",
    source: "Matius 19:6",
  },
  bibleVerseEn: {
    quote:
      "I was sound asleep, but in my dreams I was wide awake. Oh, listen! It's the sound of my lover knocking, calling!",
    source: "Song of Songs 5:2 MSG",
  },

  ceremony: {
    title: "Pemberkatan",
    dateDisplay: "Kamis, 26 Desember 2024",
    timeDisplay: "11.00 WIB",
    venueName: "GBT Kristus Alfa Omega Puri Anjasmoro",
    venueAddress: "Jalan Puri Anjasmoro No 10 Blok J1, Semarang",
  },
  reception: {
    title: "Resepsi Pernikahan",
    dateDisplay: "Kamis, 26 Desember 2024",
    timeDisplay: "18.00 WIB",
    venueName: "MAC Ballroom",
    venueAddress:
      "Jalan Majapahit No 168, Gayamsari, Kec. Gayamsari, Kota Semarang",
  },

  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.198393529322!2d110.4414619!3d-6.9859187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708c90967dae47%3A0xad52bb7a8a1eb3d1!2sMAC%20Ballroom!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid",
  mapsUrl:
    "https://maps.google.com/?q=MAC+Ballroom+Jalan+Majapahit+Semarang",

  bankAccounts: [
    {
      bank: "BCA",
      accountNumber: "11223344",
      accountName: "Ricky Ravanelli, S.E.",
      logo: "/assets/icons/bca.svg",
    },
    {
      bank: "BCA",
      accountNumber: "44332211",
      accountName: "Fellycia Indriyani Pratama, S.I.Kom.",
      logo: "/assets/icons/bca.svg",
    },
  ],

  giftAddress: {
    recipient: "Ricky & Fellycia",
    phone: "0812-3456-7890",
    address:
      "Jalan Puri Anjasmoro No 10 Blok J1, Semarang, Jawa Tengah, Indonesia 50144",
  },

  loveStoryMilestones: [
    {
      year: "2018",
      title: "First Met",
      description:
        "Lorem ipsum dercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
    {
      year: "2019",
      title: "In a Relationship",
      description:
        "Ldipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
    },
    {
      year: "2020",
      title: "The Proposal",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      year: "2021",
      title: "The Next Chapter",
      description:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.",
    },
  ],
} as const;

export const WEDDING_DATE = new Date(WEDDING_CONFIG.dateISO);
