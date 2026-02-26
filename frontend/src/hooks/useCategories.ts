"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCategory, getCategories } from "@/services/category.service";

function slugify(name: string) {
  return name.toLowerCase().trim().replace(/\s+/g, "-");
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 60_000,
  });
}

export function useCreateCategory() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (name: string) => createCategory({ id: slugify(name), name }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["categories"] }),
  });
}