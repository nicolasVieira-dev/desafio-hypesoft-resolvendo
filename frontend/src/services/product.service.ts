import { Product } from "@/types/product";

export async function getProducts(): Promise<Product[]> {

    return[
        {
            id: "1",
            name: "Produto 1",
            description: "Descrição do Produto 1",
            price: 100,
            categoryId: "1",
            stockQuantity: 10
        },
        {
            id: "2",
            name: "Produto 2",
            description: "Descrição do Produto 2",
            price: 200,
            categoryId: "2",
            stockQuantity: 20
        }
    ]
    
}