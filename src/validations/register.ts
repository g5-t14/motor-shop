import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(10, "Nome mínimo de 10 caracteres")
    .max(50, "Nome máximo de 60 caracteres")
    .nonempty("Nome obrigatório"),
  email: z
    .string()
    .email("Email inválido")
    .nonempty()
    .max(100, "Tamanho máximo de 100 caracteres"),
  password: z
    .string()
    .regex(/.*[A-Z].*/, { message: "Precisa conter uma letra maiúscula" })
    .regex(/.*[a-z].*/, { message: "Precisa conter uma letra minúscula" })
    .regex(/.*\d.*/, { message: "Precisa conter um número" })
    .regex(/.*[#?!@$%^&*-].*/, {
      message: "Precisa conter um caractere especial",
    })
    .min(8, "Tamanho mínimo de 8 caracteres")
    .max(30, "Tamanho máximo de 30 caracteres")
    .nonempty("Senhar obrigatória"),
  cpf: z
    .string()
    .max(11, "Tamanho máximo de 11 caracteres")
    .nonempty("CPF obrigatório"),
  phone: z
    .string()
    .max(11, "Tamanho máximo de 11 caracteres")
    .nonempty("Telefone obrigatório"),
  birthdate: z
    .string()
    .max(8, "Tamanho máximo de 8 caracteres")
    .nonempty("Data de nascimento obrigatório"),
  description: z.string().nonempty("Descrição obrigatória"),
  is_seller: z.boolean().default(false),
  cep: z
    .string()
    .max(8, "Tamanho máximo de 8 caracteres")
    .nonempty("CEP obrigatório"),
  state: z
    .string()
    .max(50, "Tamanho máximo de 50 caracteres")
    .nonempty("Estado obrigatório"),
  city: z
    .string()
    .max(50, "Tamanho máximo de 50 caracteres")
    .nonempty("Cidade obrigatória"),
  street: z
    .string()
    .max(50, "Tamanho máximo de 50 caracteres")
    .nonempty("Rua obrigatória"),
  number: z
    .string()
    .max(50, "Tamanho máximo de 50 caracteres")
    .nonempty("Numero obrigatório"),
  complement: z
    .string()
    .max(50, "Tamanho máximo de 50 caracteres")
    .nonempty("Complemento obrigatório"),
});

export type RegisterData = z.infer<typeof registerSchema>;
