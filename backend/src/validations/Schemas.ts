import * as z from "zod";

export const UserSchema = z.object({
  id: z.number().int().positive().optional(),
  name: z.string().min(2).max(50),
  email: z.email(),
  cpf: z.string().min(11).max(11),
  password: z.string().min(6).max(30),
  role: z.enum(["USER", "ADMIN"]).default("USER"),
});

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(6).max(30),
});

export const ProductSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(2),
  photo: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  price: z.number().positive(),
  categoryId: z.number().int().positive(),
  brandId: z.number().int().positive(),
  quantity: z.number().int()
});
