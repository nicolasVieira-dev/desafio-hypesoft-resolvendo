"use client";

import { useMemo } from "react";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductsByCategoryChart } from "@/components/charts/products-by-category-chart";

function formatBRL(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export default function DashboardPage() {
  const { data: products = [], isLoading: loadingProducts } = useProducts();
  const { data: categories = [], isLoading: loadingCategories } = useCategories();

  const totalProducts = products.length;

  const totalStockValue = useMemo(() => {
    return products.reduce((acc, p) => acc + p.price * p.stockQuantity, 0);
  }, [products]);

  const lowStock = useMemo(() => {
    return products
      .filter((p) => p.stockQuantity < 10)
      .sort((a, b) => a.stockQuantity - b.stockQuantity);
  }, [products]);

  const categoryMap = useMemo(() => {
    const map = new Map<string, string>();
    categories.forEach((c) => map.set(c.id, c.name));
    return map;
  }, [categories]);

  const chartData = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach((p) => {
      const name = categoryMap.get(String(p.categoryId)) ?? String(p.categoryId) ?? "Sem categoria";
      counts[name] = (counts[name] ?? 0) + 1;
    });

    return Object.entries(counts)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count);
  }, [products, categoryMap]);

  const isLoading = loadingProducts || loadingCategories;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Visão geral do catálogo e estoque
        </p>
      </div>

      {/* Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Total de produtos
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            {isLoading ? "—" : totalProducts}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Valor total do estoque
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            {isLoading ? "—" : formatBRL(totalStockValue)}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Produtos com estoque baixo
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            {isLoading ? "—" : lowStock.length}
          </CardContent>
        </Card>
      </div>

      {/* Chart + Low stock list */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Produtos por categoria</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-sm text-muted-foreground">Carregando...</div>
            ) : chartData.length === 0 ? (
              <div className="text-sm text-muted-foreground">
                Sem dados para exibir
              </div>
            ) : (
              <ProductsByCategoryChart data={chartData} />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Estoque baixo (&lt; 10)</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-sm text-muted-foreground">Carregando...</div>
            ) : lowStock.length === 0 ? (
              <div className="text-sm text-muted-foreground">
                Nenhum produto com estoque baixo 🎉
              </div>
            ) : (
              <div className="border rounded-xl bg-background">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Produto</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead className="text-right">Estoque</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {lowStock.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell className="font-medium">{p.name}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {categoryMap.get(String(p.categoryId)) ?? p.categoryId}
                        </TableCell>
                        <TableCell className="text-right text-red-500 font-semibold">
                          {p.stockQuantity}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}