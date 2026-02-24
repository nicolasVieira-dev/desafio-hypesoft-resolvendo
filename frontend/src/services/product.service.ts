import { Product } from "@/types/product";
import { ProductFormData } from "@/schemas/product.schema";

let productsDb: Product[] = [
    {
        id: "1",
        name: "Camiseta Hypesoft",
        description: "Camiseta de alta qualidade com estampa exclusiva da Hypesoft.",
        price: 79.90,
        categoryId: "1",
        stockQuantity: 15,
    },
    {
        id: "2",
        name: "Caneca Hypesoft",
        description: "Caneca de cerâmica com design moderno e logo da Hypesoft.",
        price: 39.90,
        categoryId: "2",
        stockQuantity: 8,
    },
];

export async function getProducts(): Promise<Product[]> {
    await new Promise((resolve) => setTimeout(resolve, 250));
    
    return productsDb;
}

export async function createProduct(data: ProductFormData): Promise<Product> {
    await new Promise((resolve) => setTimeout(resolve, 250));

    const newProduct: Product = {
        id: crypto.randomUUID(),
        ...data,
    };

    productsDb = [newProduct, ...productsDb];
    return newProduct;
}