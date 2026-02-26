"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ProductFormData } from "@/schemas/product.schema";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
  updateProductStock,
} from "@/services/product.service";

export function useProducts(params: {
  page: number;
  pageSize: number;
  search?: string;
  categoryId?: string;
}) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
    staleTime: 30_000,
  });
}

export function useCreateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: ProductFormData) => createProduct(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useUpdateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Omit<ProductFormData, "stockQuantity">;
    }) => updateProduct(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useUpdateProductStock() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      stockQuantity,
    }: {
      id: string;
      stockQuantity: number;
    }) => updateProductStock(id, stockQuantity),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useDeleteProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}
