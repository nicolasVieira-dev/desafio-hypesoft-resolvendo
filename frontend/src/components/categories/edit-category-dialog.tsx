"use client";

import { useEffect, useState } from "react";
import { Category } from "@/types/category";
import { useUpdateCategory } from "@/hooks/useCategories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

function slugify(v: string) {
  return v.toLowerCase().trim().replace(/\s+/g, "-");
}

export function EditCategoryDialog({
  category,
  open,
  onOpenChange,
}: {
  category: Category;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { mutateAsync, isPending } = useUpdateCategory();

  const [name, setName] = useState(category.name);
  const [newId, setNewId] = useState(category.id);

  useEffect(() => {
    setName(category.name);
    setNewId(category.id);
  }, [category]);

  async function onSave() {
    const finalName = name.trim();
    const finalId = slugify(newId);

    if (!finalName || !finalId) return;

    await mutateAsync({ id: category.id, newId: finalId, name: finalName });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar categoria</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            ID atual: <span className="font-medium text-foreground">{category.id}</span>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">Novo ID</div>
            <Input value={newId} onChange={(e) => setNewId(e.target.value)} placeholder="Ex: tech" />
            <div className="text-xs text-muted-foreground">
              Alterar o ID migra os produtos da categoria antiga para a nova.
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">Nome</div>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <Button className="w-full" onClick={onSave} disabled={isPending}>
            {isPending ? "Salvando..." : "Salvar alterações"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}