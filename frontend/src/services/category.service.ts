import { api } from "@/services/api";
import { Category } from "@/types/category";

export async function getCategories(): Promise<Category[]> {
  const res = await api.get<Category[]>("/api/categories");
  return res.data;
}

export async function createCategory(payload: { id: string; name: string }): Promise<{ id: string }> {
  const res = await api.post<{ id: string }>("/api/categories", payload);
  return res.data;
}