import { z } from "zod";

export const adSchema = z.object({
  brand: z.string(),
  model: z.string(),
  year: z.string(),
  fuel: z.string(),
  mileage: z.string(),
  color: z.enum([
    "Preto",
    "Cinza",
    "Marrom",
    "Vermelho",
    "Laranja",
    "Amarelo",
    "VerdeClaro",
    "VerdeEscuro",
    "AzulClaro",
    "AzulEscuro",
    "Roxo",
    "Rosa",
    "Branco",
  ]),
  pictures: z.object({
    picture_1: z.string(),
    picture_2: z.string(),
    picture_3: z.string().nullish(),
    picture_4: z.string().nullish(),
    picture_5: z.string().nullish(),
    picture_6: z.string().nullish(),
  }),
  fipe_table: z.number(),
  price: z.number(),
  description: z.string(),
  cover_img: z.string(),
});

export const editSchema = z.object({
  pictures: z.object({
    picture_1: z.string(),
    picture_2: z.string(),
    picture_3: z.string().nullish(),
    picture_4: z.string().nullish(),
    picture_5: z.string().nullish(),
    picture_6: z.string().nullish(),
  }),
  mileage: z.string(),
  price: z.number(),
  description: z.string(),
  cover_img: z.string(),
});
export type adData = z.infer<typeof adSchema>;
