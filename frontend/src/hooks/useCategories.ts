"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategories, createCategory } from "@/services/category.service";
import { use } from "react";

export function useCategories() {
    return useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });
}

export function useCreateCategory() {
   const qc = useQueryClient();

   return useMutation({
    mutationFn: (name: string) => createCategory(name),
    onSuccess: () => {
        qc.invalidateQueries({ queryKey: ["categories"] });
    }
   });
}