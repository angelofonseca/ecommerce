import * as z from "zod";

const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_MAX_LENGTH = 30;
const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 50;
const CPF_DIGITS_LENGTH = 11;

const VALIDATION_MESSAGES = {
  CPF_INVALID: "CPF deve conter 11 dígitos válidos",
  NAME_TOO_SHORT: `Nome deve ter pelo menos ${NAME_MIN_LENGTH} caracteres`,
  NAME_TOO_LONG: `Nome deve ter no máximo ${NAME_MAX_LENGTH} caracteres`,
  PASSWORD_TOO_SHORT: `Senha deve ter pelo menos ${PASSWORD_MIN_LENGTH} caracteres`,
  PASSWORD_TOO_LONG: `Senha deve ter no máximo ${PASSWORD_MAX_LENGTH} caracteres`,
  EMAIL_INVALID: "Email deve ter um formato válido",
  PRICE_POSITIVE: "Preço deve ser um valor positivo",
  QUANTITY_POSITIVE: "Quantidade deve ser um número inteiro positivo"
} as const;

const validateCPF = (cpf: string): boolean => {
  const digits = cpf.replace(/\D/g, "");
  return digits.length === CPF_DIGITS_LENGTH;
};

export const UserSchema = z.object({
  id: z.number().int().positive().optional(),
  name: z.string()
    .min(NAME_MIN_LENGTH, VALIDATION_MESSAGES.NAME_TOO_SHORT)
    .max(NAME_MAX_LENGTH, VALIDATION_MESSAGES.NAME_TOO_LONG),
  email: z.string().email(VALIDATION_MESSAGES.EMAIL_INVALID),
  password: z.string()
    .min(PASSWORD_MIN_LENGTH, VALIDATION_MESSAGES.PASSWORD_TOO_SHORT)
    .max(PASSWORD_MAX_LENGTH, VALIDATION_MESSAGES.PASSWORD_TOO_LONG),
  role: z.enum(["ADMIN", "CUSTOMER"]).default("CUSTOMER").optional(),
  cpf: z.string().refine(validateCPF, {
    message: VALIDATION_MESSAGES.CPF_INVALID,
  }),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export const LoginSchema = z.object({
  email: z.string().email(VALIDATION_MESSAGES.EMAIL_INVALID),
  password: z.string()
    .min(PASSWORD_MIN_LENGTH, VALIDATION_MESSAGES.PASSWORD_TOO_SHORT)
    .max(PASSWORD_MAX_LENGTH, VALIDATION_MESSAGES.PASSWORD_TOO_LONG),
});

export const ProductSchema = z.object({
  id: z.number().int().positive().optional(),
  name: z.string()
    .min(NAME_MIN_LENGTH, VALIDATION_MESSAGES.NAME_TOO_SHORT),
  photo: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  price: z.number().positive(VALIDATION_MESSAGES.PRICE_POSITIVE),
  categoryId: z.number().int().positive(),
  brandId: z.number().int().positive(),
  quantity: z.number().int().positive(VALIDATION_MESSAGES.QUANTITY_POSITIVE)
});
