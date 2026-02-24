"use client";

import { useMemo, useState } from "react";
import { ProductTable } from "@/components/products/product-table";
import { CreateProductDialog } from "@/components/products/create-product-dialog";
import { ProductFilters } from "@/components/products/product-filters";
import { useProducts } from "@/hooks/useProducts";

export default function ProductsPage() {
  const { data, isLoading } = useProducts();

  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("all");

  const filtered = useMemo(() => {
    const list = data ?? [];
    return list.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryId === "all" ? true : p.categoryId === categoryId;
      return matchesSearch && matchesCategory;
    });
  }, [data, search, categoryId]);

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