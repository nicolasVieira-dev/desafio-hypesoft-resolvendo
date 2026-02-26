import { api } from "@/services/api";
import { Product } from "@/types/product";
import { ProductFormData } from "@/schemas/product.schema";

export type PagedResult<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
};

export async function getProducts(params: {
  page: number;
  pageSize: number;
  search?: string;
  categoryId?: string;
}): Promise<PagedResult<Product>> {
  const res = await api.get<PagedResult<Product>>("/api/products", { params });
  return res.data;
}

export async function createProduct(data: ProductFormData): Promise<{ id: string }> {
  const res = await api.post<{ id: string }>("/api/products", data);
  return res.data;
}

export async function updateProduct(id: string, data: Omit<ProductFormData, "stockQuantity">) {
  await api.put(`/api/products/${id}`, { id: "00000000-0000-0000-0000-000000000000", ...data });
}

export async function updateProductStock(id: string, stockQuantity: number) {
  await api.patch(`/api/products/${id}/stock`, {
    id: "00000000-0000-0000-0000-000000000000",
    stockQuantity,
  });
}

export async function deleteProduct(id: string) {
  await api.delete(`/api/products/${id}`);
}