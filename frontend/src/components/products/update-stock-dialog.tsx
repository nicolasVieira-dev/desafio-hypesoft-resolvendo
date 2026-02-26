"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { useUpdateProductStock } from "@/hooks/useProducts";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function UpdateStockDialog({
  product,
  open,
  onOpenChange,
}: {
  product: Product;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { mutateAsync, isPending } = useUpdateProductStock();


  const [value, setValue] = useState<string>("");


  useEffect(() => {
    if (open) setValue(String(product.stockQuantity));
  }, [open, product.id]);

  async function onSave() {
    const n = Number(value);
    if (!Number.isFinite(n) || n < 0) return;

    await mutateAsync({ id: product.id, stockQuantity: n });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Atualizar estoque</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Produto: <span className="font-medium text-foreground">{product.name}</span>
          </div>

          <Input
            type="number"
            min={0}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <Button onClick={onSave} className="w-full" disabled={isPending}>
            {isPending ? "Salvando..." : "Salvar estoque"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}