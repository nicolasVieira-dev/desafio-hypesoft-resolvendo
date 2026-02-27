"use client";

import { useState } from "react";
import { useCategories } from "@/hooks/useCategories";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreateCategoryDialog } from "@/components/categories/create-category-dialog";
import { EditCategoryDialog } from "@/components/categories/edit-category-dialog";
import { DeleteCategoryAlert } from "@/components/categories/delete-category-alert";
import { Category } from "@/types/category";

export default function CategoriesPage() {
  const { data = [], isLoading } = useCategories();

  const [selected, setSelected] = useState<Category | null>(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  function onEdit(c: Category) {
    setSelected(c);
    setOpenEdit(true);
  }

  function onDelete(c: Category) {
    setSelected(c);
    setOpenDelete(true);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibol m-4">Categorias</h1>
        <CreateCategoryDialog />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {isLoading ? (
            <div className="text-sm text-muted-foreground">Carregando...</div>
          ) : data.length === 0 ? (
            <div className="text-sm text-muted-foreground">
              Nenhuma categoria cadastrada.
            </div>
          ) : (
            data.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between border-b py-3"
              >
                <div>
                  <div className="font-medium">{c.name}</div>
                  <div className="text-xs text-muted-foreground">{c.id}</div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => onEdit(c)}>
                    Editar
                  </Button>
                  <Button variant="destructive" onClick={() => onDelete(c)}>
                    Excluir
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {selected && (
        <>
          <EditCategoryDialog
            category={selected}
            open={openEdit}
            onOpenChange={setOpenEdit}
          />
          <DeleteCategoryAlert
            category={selected}
            open={openDelete}
            onOpenChange={setOpenDelete}
          />
        </>
      )}
    </div>
  );
}