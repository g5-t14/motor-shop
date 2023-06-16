import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  name: z.string().max(127),
  email: z.string().email().max(127),
  password: z
    .string()
    .max(60)
    .regex(/.*[A-Z].*/, { message: "Precisa ter uma letra maiúscula*" })
    .regex(/.*[a-z].*/, { message: "Precisa ter uma letra minúscula*" })
    .regex(/.*\d.*/, { message: "Precisa conter um número*" }),
  cpf: z.string().max(11),
  phone: z.string().max(11),
  birthdate: z.string().max(8),
  description: z.string(),
  is_seller: z.boolean().default(false),
  cep: z.string().max(10),
  state: z.string().max(127),
  city: z.string().max(127),
  street: z.string().max(127),
  number: z.string().max(127),
  complement: z.string().max(127),
  user_color: z.string(),
});

export type UserData = z.infer<typeof userSchema>;
