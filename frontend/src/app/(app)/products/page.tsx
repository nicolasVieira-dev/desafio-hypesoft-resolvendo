"use client";

import { useMemo, useState } from "react";
import { ProductTable } from "@/components/products/product-table";
import { CreateProductDialog } from "@/components/products/create-product-dialog";
import { ProductFilters } from "@/components/products/product-filters";
import { useProducts } from "@/hooks/useProducts";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("all");

  const { data, isLoading } = useProducts({
    page: 1,
    pageSize: 50,
    search: search || undefined,
    categoryId: categoryId === "all" ? undefined : categoryId,
  });

  const items = data?.items ?? [];

  // (Opcional) ainda filtra localmente, mas já está filtrando no backend.
  const filtered = useMemo(() => items, [items]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Produtos</h1>
        <CreateProductDialog />
      </div>

      <ProductFilters
        search={search}
        onSearchChange={setSearch}
        categoryId={categoryId}
        onCategoryChange={setCategoryId}
      />

      {isLoading ? (
        <div className="text-sm text-muted-foreground">Carregando...</div>
      ) : (
        <ProductTable products={filtered} />
      )}
    </div>
  );
}