import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const services = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/services" }),
  schema: z
    .object({
      name: z.string().min(1),
      type: z.enum(["psychologist", "psychiatrist", "counseling", "community", "hotline"]),
      city: z.string().min(1),
      district: z.string().optional(),
      address: z.string().optional(),
      phone: z.string().optional(),
      whatsapp: z.string().optional(),
      website: z.httpUrl().optional(),
      instagram: z
        .string()
        .regex(/^[^@\s][\w.]*$/, "instagram handle without @")
        .optional(),
      price_min: z.number().int().min(0),
      price_max: z.number().int().min(0).optional(),
      pricing: z.enum(["free", "bpjs", "sliding-scale", "fixed-rate"]),
      online: z.boolean(),
      in_person: z.boolean(),
      needs_referral: z.boolean(),
      needs_appointment: z.boolean(),
      hours: z.string().optional(),
      notes: z.string().max(200).optional(),
      status: z.enum(["active", "closed"]).default("active"),
      last_verified: z.coerce.date().refine((d) => d.getTime() <= Date.now(), {
        message: "last_verified cannot be in the future",
      }),
      verified_by: z.string().min(1),
      source: z.union([z.httpUrl(), z.string().min(1)]),
    })
    .superRefine((entry, ctx) => {
      if (entry.pricing === "free" && entry.price_min !== 0) {
        ctx.addIssue({
          code: "custom",
          path: ["price_min"],
          message: "free entries must have price_min 0",
        });
      }
      const hasContact = Boolean(
        entry.phone?.trim() ||
          entry.whatsapp?.trim() ||
          entry.website?.trim() ||
          entry.instagram?.trim(),
      );
      if (!hasContact) {
        ctx.addIssue({
          code: "custom",
          path: ["phone"],
          message: "at least one contact (phone, whatsapp, website, instagram) is required",
        });
      }
      if (!entry.online && !entry.in_person) {
        ctx.addIssue({
          code: "custom",
          path: ["online"],
          message: "at least one of online or in_person must be true",
        });
      }
    }),
});

export const collections = { services };
