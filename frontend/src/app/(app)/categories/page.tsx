"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCategories, useCreateCategory } from "@/hooks/useCategories";

export default function CategoriesPage() {
  const { data = [], isLoading } = useCategories();
  const { mutateAsync, isPending } = useCreateCategory();
  const [name, setName] = useState("");

  async function onCreate() {
    if (!name.trim()) return;
    await mutateAsync(name.trim());
    setName("");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Categorias</h1>

      <Card>
        <CardHeader>
          <CardTitle>Nova categoria</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Input
            placeholder="Ex: Eletrônicos"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button onClick={onCreate} disabled={isPending}>
            {isPending ? "Salvando..." : "Adicionar"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lista</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {isLoading ? (
            <div className="text-sm text-muted-foreground">Carregando...</div>
          ) : (
            data.map((c) => (
              <div key={c.id} className="flex items-center justify-between border-b py-2">
                <span>{c.name}</span>
                <span className="text-xs text-muted-foreground">{c.id}</span>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}