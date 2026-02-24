import { z } from "zod";

const numberFromInput = z.preprocess((val) => {
  if (val === "" || val === null || val === undefined) return undefined;
  const n = typeof val === "string" ? Number(val) : val;
  return Number.isNaN(n) ? undefined : n;
}, z.number());

export const productSchema = z.object({
  name: z.string().min(3, "Nome obrigatório"),
  description: z.string().min(3, "Descrição obrigatória"),
  price: z.number().positive("Preço deve ser maior que 0"),
  categoryId: z.string().min(1, "Categoria obrigatória"),
  stockQuantity: z.number().min(0, "Estoque não pode ser negativo"),
});

// 👇 IMPORTANTÍSSIMO: tipos de entrada e saída
export type ProductFormInput = z.input<typeof productSchema>;
export type ProductFormData = z.output<typeof productSchema>;