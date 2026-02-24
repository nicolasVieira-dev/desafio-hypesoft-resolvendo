import { getProducts } from "@/services/product.service";
import { ProductTable } from "@/components/products/product-table";

export default async function ProductsPage() {
    const products = await getProducts();
    
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold">
                Produtos
            </h1>

            <ProductTable products={products} />
        </div>
    );
}