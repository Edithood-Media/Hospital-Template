import { z } from "zod";

const dateLike = z
  .string()
  .min(1, "Preferred date is required")
  .refine((value) => !Number.isNaN(Date.parse(value)), "Enter a valid date");

export const appointmentSchema = z.object({
  patientName: z.string().trim().min(2, "Name is required").max(120),
  phone: z.string().trim().min(8, "Phone number is required").max(30),
  email: z.union([z.string().trim().email(), z.literal("")]).optional(),
  department: z.string().trim().min(2, "Select a department").max(120),
  preferredDate: dateLike,
  preferredTime: z.string().trim().max(40).optional(),
  message: z.string().trim().max(1000).optional(),
  consent: z.literal("on", {
    error: "Please allow the hospital to contact you about this request",
  }),
});

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export const blogSchema = z.object({
  title: z.string().trim().min(3, "Title is required").max(180),
  slug: z
    .string()
    .trim()
    .min(3, "Slug is required")
    .max(180)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase words separated by hyphens"),
  excerpt: z.string().trim().min(10, "Excerpt is required").max(320),
  content: z.string().trim().min(20, "Content is required"),
  category: z.string().trim().min(2, "Category is required").max(80),
  featuredImage: z.union([z.string().trim().url(), z.literal("")]).optional(),
  seoTitle: z.string().trim().max(180).optional(),
  seoDescription: z.string().trim().max(320).optional(),
  authorDisplayName: z.string().trim().max(120).optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]),
});

export const appointmentStatusSchema = z.object({
  status: z.enum(["NEW", "CONTACTED", "CONFIRMED", "COMPLETED", "CANCELLED"]),
  internalNotes: z.string().trim().max(1000).optional(),
});

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}
