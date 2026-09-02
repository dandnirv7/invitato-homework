import { z } from "zod";

export const rsvpSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Nama wajib diisi")
    .max(100, "Nama maksimal 100 karakter"),
  attendance: z.enum(["attending", "not_attending"], {
    message: "Pilih status kehadiran",
  }),
  partySize: z
    .number()
    .int()
    .min(1, "Jumlah orang minimal 1")
    .max(10, "Jumlah orang maksimal 10")
    .optional(),
  countryCode: z.string().trim().max(8).optional(),
  phoneNumber: z.string().trim().max(24).optional(),
  address: z.string().trim().max(200).optional(),
  email: z.union([z.literal(""), z.email().max(100)]).optional(),
});

export const wishSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Nama wajib diisi")
    .max(100, "Nama maksimal 100 karakter"),
  message: z
    .string()
    .trim()
    .min(1, "Pesan wajib diisi")
    .max(500, "Pesan maksimal 500 karakter"),
});

export type RsvpInput = z.infer<typeof rsvpSchema>;
export type WishInput = z.infer<typeof wishSchema>;
