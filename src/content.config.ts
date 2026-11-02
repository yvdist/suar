import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const layanan = defineCollection({
  type: "data",
  loader: glob({ pattern: "**/*.json", base: "./src/content/layanan" }),
  schema: z
    .object({
      nama: z.string().min(1),
      jenis: z.enum(["psikolog", "psikiater", "konseling", "komunitas", "hotline"]),
      kota: z.string().min(1),
      kecamatan: z.string().optional(),
      alamat: z.string().optional(),
      telepon: z.string().optional(),
      whatsapp: z.string().optional(),
      situs: z.httpUrl().optional(),
      instagram: z
        .string()
        .regex(/^[^@\s][\w.]*$/, "instagram handle without @")
        .optional(),
      harga_min: z.number().int().min(0),
      harga_max: z.number().int().min(0).optional(),
      skema_biaya: z.enum(["gratis", "bpjs", "sliding-scale", "tarif-tetap"]),
      online: z.boolean(),
      tatap_muka: z.boolean(),
      perlu_rujukan: z.boolean(),
      perlu_janji: z.boolean(),
      jam_layanan: z.string().optional(),
      catatan: z.string().max(200).optional(),
      last_verified: z.coerce.date().refine((d) => d.getTime() <= Date.now(), {
        message: "last_verified cannot be in the future",
      }),
      verified_by: z.string().min(1),
      sumber: z.union([z.httpUrl(), z.string().min(1)]),
    })
    .superRefine((entry, ctx) => {
      if (entry.skema_biaya === "gratis" && entry.harga_min !== 0) {
        ctx.addIssue({
          code: "custom",
          path: ["harga_min"],
          message: "gratis entries must have harga_min 0",
        });
      }
      const hasContact = Boolean(
        entry.telepon?.trim() ||
          entry.whatsapp?.trim() ||
          entry.situs?.trim() ||
          entry.instagram?.trim(),
      );
      if (!hasContact) {
        ctx.addIssue({
          code: "custom",
          path: ["telepon"],
          message: "at least one contact (telepon, whatsapp, situs, instagram) is required",
        });
      }
      if (!entry.online && !entry.tatap_muka) {
        ctx.addIssue({
          code: "custom",
          path: ["online"],
          message: "at least one of online or tatap_muka must be true",
        });
      }
    }),
});

export const collections = { layanan };
