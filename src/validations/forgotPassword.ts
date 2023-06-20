import { z } from "zod"

export const recoverPasswordSchema = z.object(
  {
    email: z.string().email("Email inválido"),
    password: z
    .string()
    .nonempty("Senha obrigatória*")
    .min(8, "Tamanho mínimo de 8 caracteres*"),
  }
)

export const forgotPasswordSchema = recoverPasswordSchema.omit({
  password: true
})

export const resetPasswordSchema = recoverPasswordSchema.omit({
  email: true
})

export const newPasswordSchema = resetPasswordSchema.extend({
  confirmPassword: z.string().min(1, "A confirmação de senha é obrigatória")
})
.refine(({ password, confirmPassword }) => password === confirmPassword, {
  message: "As senhas precisam corresponderem",
  path: ["confirmPassword"]
});

export type RecoverPasswordData = z.infer<typeof forgotPasswordSchema>

export type UpdatePasswordData = z.infer<typeof newPasswordSchema>