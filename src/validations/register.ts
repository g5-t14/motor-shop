import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().max(127).nonempty("Nome Obrigatório"),
  email: z.string().email().max(127).nonempty("Email Obrigatório"),
  password: z
    .string()
    .max(60)
    .regex(/.*[A-Z].*/, { message: "Precisa ter uma letra maiúscula*" })
    .regex(/.*[a-z].*/, { message: "Precisa ter uma letra minúscula*" })
    .regex(/.*\d.*/, { message: "Precisa conter um número*" }),
  cpf: z.string().max(11).nonempty("Cpf obrigatório"),
  phone: z.string().max(11).nonempty("Telefone obrigatório"),
  birthdate: z.string().max(8).nonempty("Data de nascimento obrigatório"),
  description: z.string().nonempty("Cpf obrigatório"),
  is_seller: z.boolean().default(false),
  cep: z.string().max(8).nonempty("Cep obrigatório"),
  state: z.string().max(127).nonempty("Estado obrigatório"),
  city: z.string().max(127).nonempty("Cidade obrigatória"),
  street: z.string().max(127).nonempty("Rua obrigatória"),
  number: z.string().max(127).nonempty("Numero obrigatório"),
  complement: z.string().max(127).nonempty("Complemento obrigatório"),
});

export type RegisterData = z.infer<typeof registerSchema>;
