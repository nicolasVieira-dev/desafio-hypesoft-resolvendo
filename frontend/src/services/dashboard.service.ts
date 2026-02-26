import { api } from "@/services/api";

export type DashboardSummary = {
  totalProducts: number;
  totalStockValue: number;
  lowStock: { id: string; name: string; categoryId: string; stockQuantity: number }[];
  productsByCategory: { categoryId: string; count: number }[];
};

export async function getDashboardSummary(): Promise<DashboardSummary> {
  const res = await api.get<DashboardSummary>("/api/dashboard/summary");
  return res.data;
}