"use client";

import { ProductTable } from "@/components/products/product-table";
import { CreateProductDialog } from "@/components/products/create-product-dialog";
import { useProducts } from "@/hooks/useProducts";

export default function ProductsPage() {
  const { data, isLoading } = useProducts();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Produtos</h1>
        <CreateProductDialog />
      </div>

      {isLoading ? (
        <div className="text-sm text-muted-foreground">Carregando...</div>
      ) : (
        <ProductTable products={data || []}></ProductTable>
      )}
    </div>
  );
}
