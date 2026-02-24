"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProduct, getProducts } from "@/services/product.service";
import { ProductFormData } from "@/schemas/product.schema";

export function useProducts() {
    return useQuery({
        queryKey: ["products"],
        queryFn: getProducts,
    });
}

export function useCreateProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        }
    });
}

