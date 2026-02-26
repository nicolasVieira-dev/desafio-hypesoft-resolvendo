"use client";

import { Product } from "@/types/product";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EditProductDialog } from "./edit-product-dialog";
import { UpdateStockDialog } from "./update-stock-dialog";
import { DeleteProductAlert } from "./delete-product-alert";

interface Props {
  products: Product[];
}

function Actions({ product }: { product: Product }) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openStock, setOpenStock] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal size={18} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setOpenEdit(true)}>
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenStock(true)}>
            Atualizar estoque
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenDelete(true)}>
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditProductDialog product={product} open={openEdit} onOpenChange={setOpenEdit} />
      <UpdateStockDialog product={product} open={openStock} onOpenChange={setOpenStock} />
      <DeleteProductAlert product={product} open={openDelete} onOpenChange={setOpenDelete} />
    </>
  );
}

export function ProductTable({ products }: Props) {
  return (
    <div className="bg-background border rounded-xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead>Quantidade em Estoque</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>R$ {product.price.toFixed(2)}</TableCell>
              <TableCell
                className={
                  product.stockQuantity < 10 ? "text-red-500 font-medium" : ""
                }
              >
                {product.stockQuantity}
              </TableCell>
              <TableHead className="text-right">Ações</TableHead>
              <TableCell className="text-right">
                <Actions product={product} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

