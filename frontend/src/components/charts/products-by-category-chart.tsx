"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function ProductsByCategoryChart({
  data,
}: {
  data: { category: string; count: number }[];
}) {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="category" />
          <YAxis allowDecimals={false} />
          <Tooltip
            formatter={(value) => {
              const n = typeof value === "number" ? value : Number(value ?? 0);
              return [`${n} produto(s)`, "Quantidade"];
            }}
            labelFormatter={(label) => `Categoria: ${String(label)}`}
          />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
