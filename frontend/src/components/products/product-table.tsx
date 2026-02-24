"use client"

import { Product } from "@/types/product";

import { 
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface Props {
    products: Product[];
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
                            <TableCell>
                                R$ {product.price.toFixed(2)}
                            </TableCell>
                            <TableCell
                                className={
                                    product.stockQuantity < 10
                                    ? "text-red-500 font-medium"
                                    : ""
                                }
                            >
                                {product.stockQuantity}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}