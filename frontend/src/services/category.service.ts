import { Category } from "@/types/category";
import path from "path";

let categoriesDb: Category[] = [
    {
      id: "tech", name: "Tecnologia",
    },
    {
      id: "home", name: "Casa",
    },
    {
      id: "fashion", name: "Moda",
    },
];

export async function getCategories(): Promise<Category[]> {
    await new Promise((resolve) => setTimeout(resolve, 250));

    return categoriesDb;
    
}

export async function createCategory(name: string): Promise<Category> {
    await new Promise((resolve) => setTimeout(resolve, 250));

    const category: Category = {
       id: name.toLowerCase().replace(/\s+/g, "-"), name
    };
    categoriesDb = [category, ...categoriesDb];
    return category;
}  
