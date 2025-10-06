import * as z from "zod";

export const UserSchema = z.object({
  id: z.number().int().positive().optional(),
  name: z.string().min(2).max(50),
  email: z.email(),
  password: z.string().min(6).max(30),
  role: z.enum(["ADMIN", "CUSTOMER"]).default("CUSTOMER").optional(),
  cpf: z.string().refine((cpf) => {
    // Remove tudo que não é número
    const digits = cpf.replace(/\D/g, "");
    return digits.length === 11;
  }, {
    message: "CPF deve conter 11 dígitos válidos",
  }),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(6).max(30),
});

export const ProductSchema = z.object({
  id: z.number().int().positive().optional(),
  name: z.string().min(2),
  photo: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  price: z.number().positive(),
  categoryId: z.number().int().positive(),
  brandId: z.number().int().positive(),
  quantity: z.number().int()
});
