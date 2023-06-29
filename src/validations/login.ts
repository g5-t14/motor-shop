import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z
    .string()
    .nonempty("Senha obrigatória")
    .min(8, "Tamanho mínimo de 8 caracteres"),
});

export type LoginData = z.infer<typeof loginSchema>;
