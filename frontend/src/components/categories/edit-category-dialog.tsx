"use client";

import { useEffect, useState } from "react";
import { Category } from "@/types/category";
import { useUpdateCategory } from "@/hooks/useCategories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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

  useEffect(() => {
    setName(category.name);
  }, [category]);

  async function onSave() {
    if (!name.trim()) return;
    await mutateAsync({ id: category.id, name: name.trim() });
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
            ID: <span className="font-medium text-foreground">{category.id}</span>
          </div>

          <Input value={name} onChange={(e) => setName(e.target.value)} />

          <Button className="w-full" onClick={onSave} disabled={isPending}>
            {isPending ? "Salvando..." : "Salvar alterações"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}