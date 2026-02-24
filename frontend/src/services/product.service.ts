import { Product } from "@/types/product";
import { ProductFormData } from "@/schemas/product.schema";

let productsDb: Product[] = [
  {
    id: "1",
    name: "Caneca Hypesoft",
    description: "Caneca oficial",
    price: 35,
    categoryId: "home",
    stockQuantity: 8,
  },
  {
    id: "2",
    name: "Camiseta Dev",
    description: "Algodão",
    price: 80,
    categoryId: "fashion",
    stockQuantity: 15,
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